const { handleAddIdentifier, handleRemoveIdentifier, handleViewIdentifiers } = require('./adminButtonHandlers');
const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = async function handleButton(interaction) {
  const { customId } = interaction;

  if (customId === 'add_identifier') {
    await handleAddIdentifier(interaction);
  } else if (customId === 'remove_identifier') {
    await handleRemoveIdentifier(interaction);
  } else if (customId === 'view_identifier') {
    await handleViewIdentifiers(interaction);
  } else if (customId === 'setup_identifier' || customId === 'setup_ticket') {
    const modal = new ModalBuilder()
      .setCustomId('setupChannelModal')
      .setTitle('Setup Channel');

    const channelIdInput = new TextInputBuilder()
      .setCustomId('channelIdInput')
      .setLabel('Channel ID')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const actionRow = new ActionRowBuilder().addComponents(channelIdInput);
    modal.addComponents(actionRow);
    await interaction.showModal(modal);
  }
};
