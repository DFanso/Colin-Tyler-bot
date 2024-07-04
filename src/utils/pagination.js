const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

async function paginationEmbed(interaction, pages, timeout = 120000) {
  if (!interaction || !pages) throw new Error('interaction and pages are required.');
  if (!Array.isArray(pages)) throw new Error('pages must be an array.');

  let page = 0;

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('first')
        .setLabel('First')
        .setStyle('Secondary'),
      new ButtonBuilder()
        .setCustomId('previous')
        .setLabel('Previous')
        .setStyle('Secondary'),
      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('Next')
        .setStyle('Secondary'),
      new ButtonBuilder()
        .setCustomId('last')
        .setLabel('Last')
        .setStyle('Secondary'),
    );

  await interaction.reply({ embeds: [pages[page]], components: [row], ephemeral: true });

  const filter = i => ['first', 'previous', 'next', 'last'].includes(i.customId) && i.user.id === interaction.user.id;

  const collector = interaction.channel.createMessageComponentCollector({ filter, time: timeout });

  collector.on('collect', async i => {
    switch (i.customId) {
      case 'first':
        page = 0;
        break;
      case 'previous':
        page = page > 0 ? --page : 0;
        break;
      case 'next':
        page = page + 1 < pages.length ? ++page : pages.length - 1;
        break;
      case 'last':
        page = pages.length - 1;
        break;
    }
    await i.deferUpdate();
    await interaction.editReply({ embeds: [pages[page]], components: [row] });
    collector.resetTimer();
  });

  collector.on('end', async (_, reason) => {
    if (reason !== 'messageDelete') {
      const disabledRow = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('first')
            .setLabel('First')
            .setStyle('Secondary')
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('previous')
            .setLabel('Previous')
            .setStyle('Secondary')
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle('Secondary')
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('last')
            .setLabel('Last')
            .setStyle('Secondary')
            .setDisabled(true),
        );
      try {
        await interaction.editReply({ embeds: [pages[page]], components: [disabledRow] });
      } catch (error) {
        if (error.code !== 10008) {
          console.error('Error editing final disabled message:', error);
        }
      }
    }
  });
}

module.exports = paginationEmbed;
