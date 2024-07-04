const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

function paginationEmbed(interaction, pages, emojiList = ['First', 'Last'], timeout = 120000) {
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

  interaction.reply({ embeds: [pages[page]], components: [row], fetchReply: true ,ephemeral: true}).then(curPage => {
    const filter = i => i.customId === 'first' || i.customId === 'previous' || i.customId === 'next' || i.customId === 'last';

    const collector = curPage.createMessageComponentCollector({ filter, time: timeout });

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
      await i.editReply({ embeds: [pages[page]], components: [row] , ephemeral: true});
      collector.resetTimer();
    });

    collector.on('end', (_, reason) => {
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
        curPage.edit({ embeds: [pages[page]], components: [disabledRow] , ephemeral: true});
      }
    });
  });
}

module.exports = paginationEmbed;
