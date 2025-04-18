import { Router } from "express";
import { generateCaptcha } from "../utils/captcha";
import { Captcha } from "../utils/captcha";

const router = Router();

declare module "express-session" {
  interface SessionData {
    captchaAnswer?: string;
  }
}

export default router.get("/", async (req, res, next) => {
  const { data, answer }: Captcha = await generateCaptcha();
  req.session.captchaAnswer = answer;
  res.send(`<img src="${data}" alt="captcha-image" />`);
});
