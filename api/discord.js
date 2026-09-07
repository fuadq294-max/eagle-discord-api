export default async function handler(req, res) {
  const GUILD_ID = "1507082977295994942";
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!BOT_TOKEN) {
    return res.status(500).json({ error: "Missing bot token" });
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}?with_counts=true`,
      {
        headers: {
          Authorization: `Bot ${BOT_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Discord API error"
      });
    }

    const data = await response.json();

    res.status(200).json({
      members: data.approximate_member_count,
      online: data.approximate_presence_count
    });
  } catch (error) {
    res.status(500).json({
      error: "Request failed"
    });
  }
}
