import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Borra una cantidad de mensajes")
  .addIntegerOption(option =>
    option
      .setName("cantidad")
      .setDescription("Número de mensajes a borrar (1–100)")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction) {
  const amount = interaction.options.getInteger("cantidad");

  if (amount < 1 || amount > 100) {
    return interaction.reply({
      content: "Debes elegir un número entre 1 y 100.",
      ephemeral: true
    });
  }

  const messages = await interaction.channel.bulkDelete(amount, true);

  await interaction.reply({
    content: `🧹 ${messages.size} mensajes eliminados.`,
    ephemeral: true
  });
}
