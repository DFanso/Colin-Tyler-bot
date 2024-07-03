const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const IdentifierService = require('../services/identifierService');

async function handleAddIdentifier(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('addIdentifierModal')
    .setTitle('Add Identifier');

  const typeInput = new TextInputBuilder()
    .setCustomId('typeInput')
    .setLabel('Type (binary/triple)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const idInput = new TextInputBuilder()
    .setCustomId('idInput')
    .setLabel('Identifier')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const actionRow1 = new ActionRowBuilder().addComponents(typeInput);
  const actionRow2 = new ActionRowBuilder().addComponents(idInput);

  modal.addComponents(actionRow1, actionRow2);
  await interaction.showModal(modal);
}

async function handleRemoveIdentifier(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('removeIdentifierModal')
    .setTitle('Remove Identifier');

  const typeInput = new TextInputBuilder()
    .setCustomId('typeInput')
    .setLabel('Type (binary/triple)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const idInput = new TextInputBuilder()
    .setCustomId('idInput')
    .setLabel('Identifier')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const actionRow1 = new ActionRowBuilder().addComponents(typeInput);
  const actionRow2 = new ActionRowBuilder().addComponents(idInput);

  modal.addComponents(actionRow1, actionRow2);
  await interaction.showModal(modal);
}

async function handleViewIdentifiers(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('viewIdentifierModal')
    .setTitle('View Identifiers');

  const typeInput = new TextInputBuilder()
    .setCustomId('typeInput')
    .setLabel('Type (binary/triple)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(typeInput);
  
  modal.addComponents(actionRow);
  await interaction.showModal(modal);
}

module.exports = {
  handleAddIdentifier,
  handleRemoveIdentifier,
  handleViewIdentifiers,
};
