const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function handleBuyId(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Buy ID')
    .setDescription('Choose the type of ID you want to buy.');

  const twoWayButton = new ButtonBuilder()
    .setCustomId('two_way_id')
    .setLabel('Two-Way ID')
    .setStyle(ButtonStyle.Primary);

  const threeWayButton = new ButtonBuilder()
    .setCustomId('three_way_id')
    .setLabel('Three-Way ID')
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder().addComponents(twoWayButton, threeWayButton);

  await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}

async function handleBuyRole(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('buy_role_modal')
    .setTitle('Buy Role');

  const orderNumberInput = new TextInputBuilder()
    .setCustomId('orderNumberInput')
    .setLabel('Enter Order Number')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(orderNumberInput);
  modal.addComponents(actionRow);

  await interaction.showModal(modal);
}

async function handleRequestInquiry(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('request_inquiry_modal')
    .setTitle('Request an Inquiry');

  const inquiryInput = new TextInputBuilder()
    .setCustomId('inquiryInput')
    .setLabel('Enter your inquiry')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

  const actionRow = new ActionRowBuilder().addComponents(inquiryInput);
  modal.addComponents(actionRow);

  await interaction.showModal(modal);
}

module.exports = {
  handleBuyId,
  handleBuyRole,
  handleRequestInquiry,
};
