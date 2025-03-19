import { Router } from "express";
import { sendDiscordWebhook } from "../utils/discord";
import session from "express-session";

const router = Router();

export default router.post("/", async (req, res) => {
  const {
    email,
    message,
    captcha,
  }: { email: string; message: string; captcha: string } = req.body;

  const session = structuredClone(req.session);
  const captchaAnswer = session.captchaAnswer?.toLowerCase();
  const captchaRecieve = captcha?.toLowerCase();

  //Remove captcha - one captcha per one form
  delete req.session.captchaAnswer;

  if (!captchaAnswer) {
    res.status(400).json("Please reload the page!");
    return;
  }

  if (captchaRecieve !== captchaAnswer) {
    res.status(400).send("Wrong captcha!");
    return;
  }

  if (!message || message.length < 5) {
    res.status(400).send("Please enter a message!");
    return;
  }

  const discordWebhook = process.env.DISCORD_WEBHOOK;

  if (!discordWebhook) {
    throw new Error("Please enter a discord webhook!");
  }

  await sendDiscordWebhook(discordWebhook, message, session);
  res.status(200).send("Successfully sent message!");
});
