import { v4 as uuidv4 } from 'uuid';



export enum ErrorType {
  ValidationError = 'VALIDATION_ERROR',
  RedisSetupError = 'REDIS_SETUP_ERROR',
  NoRecordError = 'NO_RECORD_FOUND_ERROR',
  NotFound = 'NOT_FOUND_ERROR',
  CreateError = 'CREATE_ERROR',
  UpdateError = 'UPDATE_ERROR',
  LogError = 'LOG_ERROR',
  MongoDBError = 'MONGO_DB_ERROR',
  InvalidResource = 'INVALID_RESOURCE_ERROR',
  InvalidKey = 'INVALID_KEY_ERROR',
  InvalidUser = 'INVALID_User_ERROR',
  RedisError = 'REDIS_ERROR',
  BadRequestError = 'BAD_REQUEST_ERROR',
  ServerError = 'SERVER_ERROR',
  ConflictError = 'CONFLICT_ERROR',
  UnAuthorized = 'UN_AUTHORIZED_ERROR',
  ForbiddenError = 'FORBIDDEN_ERROR',
  RateLimitExceeded = 'RATE_LIMIT_EXCEEDED',
  PayloadTooLarge = 'PAYLOAD_TOO_LARGE',
  MethodNotAllowed = 'METHOD_NOT_ALLOWED',
  NotAcceptable = 'NOT_ACCEPTABLE',
  Timeout = 'TIMEOUT',
  UnsupportedMediaType = 'UNSUPPORTED_MEDIA_TYPE',
  PreconditionFailed = 'PRECONDITION_FAILED',
  TooManyRequests = 'TOO_MANY_REQUESTS',
  RequestHeaderFieldsTooLarge = 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  InternalError = 'INTERNAL_ERROR',
  PaymentError = 'PAYMENT_ERROR',
  Prohibited = 'PROHIBITED_ERROR',
}



const CustomError: Record<ErrorType, number> = {
  [ErrorType.ValidationError]: 400,
  [ErrorType.RedisSetupError]: 500,
  [ErrorType.NoRecordError]: 204,
  [ErrorType.InvalidResource]: 422,
  [ErrorType.CreateError]: 500,
  [ErrorType.UpdateError]: 500,
  [ErrorType.LogError]: 500,
  [ErrorType.MongoDBError]: 500,
  [ErrorType.NotFound]: 404,
  [ErrorType.InvalidKey]: 400,
  [ErrorType.InvalidUser]: 400,
  [ErrorType.RedisError]: 500,
  [ErrorType.BadRequestError]: 400,
  [ErrorType.ServerError]: 500,
  [ErrorType.ConflictError]: 409,
  [ErrorType.UnAuthorized]: 401,
  [ErrorType.ForbiddenError]: 403,
  [ErrorType.RateLimitExceeded]: 429,
  [ErrorType.PayloadTooLarge]: 413,
  [ErrorType.MethodNotAllowed]: 405,
  [ErrorType.NotAcceptable]: 406,
  [ErrorType.Timeout]: 408,
  [ErrorType.UnsupportedMediaType]: 415,
  [ErrorType.PreconditionFailed]: 412,
  [ErrorType.TooManyRequests]: 429, 
  [ErrorType.RequestHeaderFieldsTooLarge]: 431,
  [ErrorType.InternalError]: 500,
  [ErrorType.PaymentError]: 402,
  [ErrorType.Prohibited]: 451,
}

export interface ErrorResponse {
  errorReference: string;
  errorType: ErrorType;
  timeStamp: string;
  code: number;
  errors: string[];
}


export function ErrorMessage(errorType: ErrorType, message: string): ErrorResponse {
  const errorResponse: ErrorResponse = {
    errorReference: uuidv4(),
    errorType: errorType,
    timeStamp: new Date().toISOString(),
    code: CustomError[errorType],
    errors: [message],
  };
  return errorResponse;
}



