const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const IdentifierService = require('../services/identifierService');
const paginationEmbed = require('../utils/pagination');
const { handleBuyId, handleBuyRole, handleRequestInquiry } = require('./ticketHandlers');

module.exports = async function handleSelectMenu(interaction) {
  const { customId, values } = interaction;
  const selectedOption = values[0];

  if (customId === 'ticket_setup_menu') {
    if (selectedOption === 'buy_id') {
      await handleBuyId(interaction);
    } else if (selectedOption === 'buy_role') {
      await handleBuyRole(interaction);
    } else if (selectedOption === 'request_inquiry') {
      await handleRequestInquiry(interaction);
    }
  } else if (customId === 'view') {
    const identifiers = await IdentifierService.viewIdentifiers(selectedOption);
    if (!identifiers || identifiers.length === 0) {
      return interaction.reply({ content: 'No identifiers found.', ephemeral: true });
    }

    const itemsPerPage = 5;
    const pages = [];
    const totalPages = Math.ceil(identifiers.length / itemsPerPage);

    for (let i = 0; i < identifiers.length; i += itemsPerPage) {
      const currentIdentifiers = identifiers.slice(i, i + itemsPerPage);
      const embed = new EmbedBuilder()
        .setTitle(`Displaying ${selectedOption} identifiers`)
        .setDescription(currentIdentifiers.map(id => `• ${id}`).join('\n'))
        .setColor(0x0099FF)
        .setFooter({ text: `Page ${Math.floor(i / itemsPerPage) + 1} / ${totalPages}` });
      pages.push(embed);
    }

    paginationEmbed(interaction, pages);
  } else {
    const modal = new ModalBuilder()
      .setCustomId(`identifierAction_${customId}_${selectedOption}`)
      .setTitle(`${customId.charAt(0).toUpperCase() + customId.slice(1)} Identifier`);

    const idInput = new TextInputBuilder()
      .setCustomId('idInput')
      .setLabel('Identifier')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const actionRow = new ActionRowBuilder().addComponents(idInput);
    modal.addComponents(actionRow);
    await interaction.showModal(modal);
  }
};
