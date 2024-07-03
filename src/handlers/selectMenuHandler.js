const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('../utils/constants');
const IdentifierService = require('../services/identifierService');

module.exports = async function handleSelectMenu(interaction) {
  const { customId, values } = interaction;
  const selectedType = values[0];

  if (customId === 'view') {
    const identifiers = await IdentifierService.viewIdentifiers(selectedType);

    if (identifiers === null) {
      await interaction.reply({ content: 'No identifiers are found.', ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`Displaying ${selectedType} identifiers`)
      .setDescription(`List of ${selectedType} identifiers`)
      .setColor(0x0099FF);

    identifiers.forEach(id => embed.addFields({ name: 'Identifier', value: id }));
    await interaction.reply({ embeds: [embed], ephemeral: true });
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
