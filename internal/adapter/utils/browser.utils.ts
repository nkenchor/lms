import { exec } from "child_process";

// Opens the browser window as the server starts
export function openUrl(url: string) {
    switch (process.platform) {
      case 'darwin': // macOS
        exec(`open ${url}`);
        break;
      case 'win32': // Windows
        exec(`start ${url}`);
        break;
      case 'linux': // Linux
        exec(`xdg-open ${url}`);
        break;
      default:
        console.error('Platform not supported for URL opening');
        break;
    }
  }