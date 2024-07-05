const { StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

async function handleAddIdentifier(interaction) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('add')
    .setPlaceholder('Select Type')
    .addOptions([
      { label: 'Binary', value: 'binary' },
      { label: 'Triple', value: 'triple' },
    ]);

  const actionRow = new ActionRowBuilder().addComponents(selectMenu);

  if (!interaction.replied && !interaction.deferred) {
    await interaction.reply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
  } else {
    await interaction.editReply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
  }

  setTimeout(async () => {
    const disabledRow = new ActionRowBuilder().addComponents(
      selectMenu.setDisabled(true)
    );
    await interaction.editReply({ content: 'The selection has timed out.', components: [disabledRow], ephemeral: true });
  }, 2 * 60 * 1000); // 2 minutes
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

  if (!interaction.replied && !interaction.deferred) {
    await interaction.reply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
  } else {
    await interaction.editReply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
  }

  setTimeout(async () => {
    const disabledRow = new ActionRowBuilder().addComponents(
      selectMenu.setDisabled(true)
    );
    await interaction.editReply({ content: 'The selection has timed out.', components: [disabledRow], ephemeral: true });
  }, 2 * 60 * 1000); // 2 minutes
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

  if (!interaction.replied && !interaction.deferred) {
    await interaction.reply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
  } else {
    await interaction.editReply({ content: 'Please select the type of identifier:', components: [actionRow], ephemeral: true });
  }

  setTimeout(async () => {
    const disabledRow = new ActionRowBuilder().addComponents(
      selectMenu.setDisabled(true)
    );
    await interaction.editReply({ content: 'The selection has timed out.', components: [disabledRow], ephemeral: true });
  }, 2 * 60 * 1000); // 2 minutes
}

module.exports = {
  handleAddIdentifier,
  handleRemoveIdentifier,
  handleViewIdentifiers,
};
