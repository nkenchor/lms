import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

interface LogData {
  timestamp: string;
  level: string;
  appName: string;
  message: string | Record<string, any>;
  ip: string;
  computerName: string;
  requestMethod: string;
  requestUrl: string;
  requestProtocol: string;
  requestHeaders: Record<string, string>;
  requestQuery: Record<string, string>;
  requestCookies: Record<string, string>;
  requestBody: Record<string, any>;
  responseHeaders: Record<string, string>;
  responseCookies: Record<string, string>;
  responseBody: Record<string, any>;
  requestDuration: number;
  correlationId: string;
  logId: string;
}

const logDir = path.join(__dirname, '../../../../logs');

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function logReqandRes(req: Request, res: Response, level: string, message: string | Record<string, any>): void {
  const timestamp = new Date().toISOString();
  const logData: LogData = {
    timestamp,
    level,
    appName: 'lms',
    message,
    ip: req.ip || 'unknown',
    computerName: os.hostname(),
    requestMethod: req.method,
    requestUrl: req.originalUrl,
    requestProtocol: req.protocol,
    requestHeaders: Object.entries(req.headers).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            acc[key] = value;
        } else if (Array.isArray(value) && value.length > 0) {
            acc[key] = value.join(',');
        }
        return acc;
    }, {} as Record<string, string>),
    requestQuery: Object.entries(req.query).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            acc[key] = value;
        } else if (Array.isArray(value) && value.length > 0) {
            acc[key] = value.join(',');
        }
        return acc;
    }, {} as Record<string, string>),
    
    requestCookies: req.cookies,
    requestBody: req.body,
    responseHeaders: Object.entries(res.getHeaders()).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            acc[key] = value;
        } else if (Array.isArray(value) && value.length > 0) {
            acc[key] = value.join(',');
        }
        return acc;
    }, {} as Record<string, string>),
    
    responseCookies: {}, // Set this if you're using cookie-parser middleware
    responseBody: res.locals.body, // Assuming you store response data in res.locals
    requestDuration: Date.now() - (res.locals.startTime || Date.now()), // Handle case when startTime is not set
    correlationId: Array.isArray(req.headers['x-correlation-id']) ? req.headers['x-correlation-id'][0] : (req.headers['x-correlation-id'] as string) || uuidv4(),
 // You can set this header in your requests to correlate logs
    logId: uuidv4(),
  };

  
  const logLine = JSON.stringify(logData);

  const logFilePath = `./logs/${logData.timestamp.split('T')[0]}.log`;
  fs.appendFileSync(logFilePath, `${logLine}\n`);
}

function logEvent(level: string, message: any): void {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      appName: 'lms',
      message,
     
    };
  
    const logLine = JSON.stringify(logData);

    const logFilePath = `./logs/${logData.timestamp.split('T')[0]}.log`;
    fs.appendFileSync(logFilePath, `${logLine}\n`);
}

function LogRequestMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.locals.startTime = Date.now(); // Start measuring request duration
  logReqandRes(req, res, 'INFO', 'Incoming request');
  next();
}

function LogResponseMiddleware(req: Request, res: Response, next: NextFunction): void {
    const originalSend = res.send;
  
    res.send = function (body?: any): any {
      const responseData = {
        statusCode: res.statusCode,
        body,
      };
  
      logReqandRes(req, res, 'INFO', responseData); // Logging response data
      return originalSend.call(res, body);
    };
  
    next();
}
  

function LogErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  const errorData = {
    statusCode: res.statusCode || 500,
    message: err.message,
    stack: err.stack,
  };

  logReqandRes(req, res, 'ERROR', errorData);
  next(err);
}

export { LogRequestMiddleware, LogResponseMiddleware , LogErrorMiddleware,  logEvent };
