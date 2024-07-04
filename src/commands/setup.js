const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup the bot for Identifier Management or Ticket Management'),
  
  async execute(interaction) {
    // Check if the user has the admin role
    const member = interaction.member;
    if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    // Create an embed to ask the user what they want to set up
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Setup Options')
      .setDescription('Choose what you want to set up:\n\n**Identifier Management**\nSetup the bot for managing identifiers.\n\n**Ticket Management**\nSetup the bot for managing tickets.');

    const identifierButton = new ButtonBuilder()
      .setCustomId('setup_identifier')
      .setLabel('Identifier Management')
      .setStyle(ButtonStyle.Primary);

    const ticketButton = new ButtonBuilder()
      .setCustomId('setup_ticket')
      .setLabel('Ticket Management')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(identifierButton, ticketButton);

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};
