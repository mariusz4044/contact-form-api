import { Router } from "express";
import parser from "ua-parser-js";

const router = Router();

declare module "express-session" {
  export interface SessionData {
    userIP?: string;
    userVisit?: number;
    userAgent?: string;
  }
}

function parseIp(ipString: string): string {
  return ipString.replace("::ffff:", "");
}

declare module "express-session" {
  interface SessionData {
    userIP?: string;
    userVisit?: number;
    userAgent?: string;
    browser?: string;
    browserVersion?: string;
    os?: string;
    device?: string;
    language?: string;
    referrer?: string;
    screenSize?: string;
    timestamp?: Date;
    country?: string;
    city?: string;
  }
}

export default router.use((req, res, next): void => {
  // Parse IP address
  req.session.userIP = parseIp(req.ip as string);

  // User visits
  req.session.userVisit = req.session.userVisit
    ? (req.session.userVisit += 1)
    : 1;

  req.session.timestamp = new Date();

  // @ts-ignore
  const ua = parser(req.headers["user-agent"]);

  // User browser info
  req.session.userAgent = req.headers["user-agent"] as string;
  req.session.browser = ua.browser.name;
  req.session.browserVersion = ua.browser.version;
  req.session.os = `${ua.os.name} ${ua.os.version}`;
  req.session.device = ua.device.type || "desktop";
  req.session.language = req.headers["accept-language"] as string;
  req.session.referrer = req.headers.referer as string;

  res.json(req.session);
  next();
});
