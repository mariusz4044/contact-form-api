import fetch from "node-fetch";
import { Session } from "express-session";

export async function sendDiscordWebhook(
  webhookUrl: string,
  message: string,
  session: Session,
): Promise<void> {
  try {
    const userInfo = "```js\n" + JSON.stringify(session, null, 2) + "```";
    const userMessage = "```\n" + message + "```";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Someone send message!",
            description: `${userMessage}\n**Send user data:**\n${userInfo}`,
            color: 2326507,
            fields: [],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Failed to send Discord webhook:", error);
  }
}
