const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

async function handleAddIdentifier(interaction) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('add')
    .setPlaceholder('Select Type')
    .addOptions([
      { label: 'Binary', value: 'binary' },
      { label: 'Triple', value: 'triple' },
    ]);

  const actionRow = new ActionRowBuilder().addComponents(selectMenu);

  await interaction.reply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
}

async function handleRemoveIdentifier(interaction) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('remove')
    .setPlaceholder('Select Type')
    .addOptions([
      { label: 'Binary', value: 'binary' },
      { label: 'Triple', value: 'triple' },
    ]);

  const actionRow = new ActionRowBuilder().addComponents(selectMenu);

  await interaction.reply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
}

async function handleViewIdentifiers(interaction) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('view')
    .setPlaceholder('Select Type')
    .addOptions([
      { label: 'Binary', value: 'binary' },
      { label: 'Triple', value: 'triple' },
    ]);

  const actionRow = new ActionRowBuilder().addComponents(selectMenu);

  await interaction.reply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
}

module.exports = {
  handleAddIdentifier,
  handleRemoveIdentifier,
  handleViewIdentifiers,
};
