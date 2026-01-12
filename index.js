import { Client, GatewayIntentBits, ActivityType, REST, Routes } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";

/* ===============================
   CONFIG
================================= */

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const COUNT_API = "https://api.countapi.xyz/get/fwmedot.github.io/fwme";

/* ===============================
   CLIENT
================================= */

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

/* ===============================
   SLASH COMMAND
================================= */

const commands = [
  {
    name: "visitas",
    description: "Muestra las visitas de fwme"
  }
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log("Comando /visitas registrado");
  } catch (error) {
    console.error(error);
  }
})();

/* ===============================
   READY
================================= */

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);

  setInterval(async () => {
    const res = await fetch(COUNT_API);
    const data = await res.json();

    client.user.setActivity(
      `fwme — ${data.value} visits`,
      { type: ActivityType.Watching }
    );
  }, 60_000);
});

/* ===============================
   COMMAND HANDLER
================================= */

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "visitas") {
    const res = await fetch(COUNT_API);
    const data = await res.json();

    await interaction.reply(
      `👀 Visitas totales de fwme: **${data.value}**`
    );
  }
});

/* ===============================
   LOGIN
================================= */

client.login(TOKEN);
