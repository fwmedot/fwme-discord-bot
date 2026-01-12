import { Client, GatewayIntentBits, ActivityType } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);

  client.user.setActivity("do u (F)Wme?", {
    type: ActivityType.Listening
  });
});

client.login(process.env.TOKEN);
