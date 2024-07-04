const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const { handleAddIdentifier, handleRemoveIdentifier, handleViewIdentifiers } = require('./adminButtonHandlers');
const { handleBuyId, handleBuyRole, handleRequestInquiry } = require('./ticketHandlers');

module.exports = async function handleButton(interaction) {
  const { customId } = interaction;

  if (customId === 'setup_identifier') {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Identifier Management')
      .setDescription('Choose an action:\n\n**Add Identifier**\n**Remove Identifier**\n**View Identifiers**');

    const addButton = new ButtonBuilder()
      .setCustomId('add_identifier')
      .setLabel('Add Identifier')
      .setStyle(ButtonStyle.Success);

    const removeButton = new ButtonBuilder()
      .setCustomId('remove_identifier')
      .setLabel('Remove Identifier')
      .setStyle(ButtonStyle.Danger);

    const viewButton = new ButtonBuilder()
      .setCustomId('view_identifier')
      .setLabel('View Identifiers')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(addButton, removeButton, viewButton);

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  } else if (customId === 'setup_ticket') {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Ticket Management')
      .setDescription('Choose an option:\n\n**Buy ID**\n**Buy Role**\n**Request an Inquiry**');

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('ticket_setup_menu')
      .setPlaceholder('Choose an option')
      .addOptions([
        { label: 'Buy ID', value: 'buy_id' },
        { label: 'Buy Role', value: 'buy_role' },
        { label: 'Request an Inquiry', value: 'request_inquiry' },
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  } else if (customId === 'add_identifier') {
    await handleAddIdentifier(interaction);
  } else if (customId === 'remove_identifier') {
    await handleRemoveIdentifier(interaction);
  } else if (customId === 'view_identifier') {
    await handleViewIdentifiers(interaction);
  }
};
