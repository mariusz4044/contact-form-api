import svgCaptcha from "svg-captcha";
import sharp from "sharp";
import { Buffer } from "buffer";

export interface Captcha {
  data: string;
  answer: string;
}

export async function generateCaptcha(): Promise<Captcha> {
  const captcha: svgCaptcha.CaptchaObj = svgCaptcha.create({
    width: 220,
    height: 80,
    background: `transparent`,
    noise: 5,
  });

  const pngImage = await sharp(Buffer.from(captcha.data)).png().toBuffer();

  return {
    data: `data:image/png;base64,${pngImage.toString("base64")}`,
    answer: captcha.text,
  };
}
