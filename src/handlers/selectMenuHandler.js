const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('../utils/constants');
const IdentifierService = require('../services/identifierService');
const paginationEmbed = require('../utils/pagination');

module.exports = async function handleSelectMenu(interaction) {
  const { customId, values } = interaction;
  const selectedType = values[0];

  if (customId === 'view') {
    const identifiers = await IdentifierService.viewIdentifiers(selectedType);
    if (!identifiers || identifiers.length === 0) {
      return interaction.reply({ content: 'No identifiers found.', ephemeral: true });
    }

    const itemsPerPage = 5;
    const pages = [];
    const totalPages = Math.ceil(identifiers.length / itemsPerPage);

    for (let i = 0; i < identifiers.length; i += itemsPerPage) {
      const currentIdentifiers = identifiers.slice(i, i + itemsPerPage);
      const embed = new EmbedBuilder()
        .setTitle(`Displaying ${selectedType} identifiers`)
        .setDescription(currentIdentifiers.map(id => `• ${id}`).join('\n'))
        .setColor(0x0099FF)
        .setFooter({ text: `Page ${Math.floor(i / itemsPerPage) + 1} / ${totalPages}` });
      pages.push(embed);
    }

    paginationEmbed(interaction, pages);
  } else {
    const modal = new ModalBuilder()
      .setCustomId(`identifierAction_${customId}_${selectedType}`)
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
