const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType } = require('../utils/constants');
const IdentifierService = require('../services/identifierService');

module.exports = async function handleModal(interaction) {
  const { customId } = interaction;

  if (customId === 'setupChannelModal') {
    const channelId = interaction.fields.getTextInputValue('channelIdInput');
    const channel = await interaction.guild.channels.fetch(channelId);

    if (channel && channel.type === ChannelType.GuildText) {
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Identifiers Management!')
        .setDescription('Select an action to proceed.');

      const addButton = new ButtonBuilder()
        .setCustomId('add_identifier')
        .setLabel('Add')
        .setStyle(ButtonStyle.Success);

      const removeButton = new ButtonBuilder()
        .setCustomId('remove_identifier')
        .setLabel('Remove')
        .setStyle(ButtonStyle.Danger);

      const viewButton = new ButtonBuilder()
        .setCustomId('view_identifier')
        .setLabel('View')
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(addButton, removeButton, viewButton);
      await channel.send({ embeds: [embed], components: [row] });
      await interaction.reply({ content: 'Setup complete. Embed sent to the specified channel.', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Channel not found or is not a text channel.', ephemeral: true });
    }
  } else if (customId.startsWith('identifierAction')) {
    const [_, action, type] = customId.split('_');
    const value = interaction.fields.getTextInputValue('idInput');

    let response;
    if (action === 'add') {
      response = await IdentifierService.addIdentifier(type, value);
    } else if (action === 'remove') {
      response = await IdentifierService.removeIdentifier(type, value);
    }

    await interaction.reply({ content: response || 'Operation completed successfully.', ephemeral: true });
  } else if (customId === 'identifierAction_view') {
    const type = interaction.fields.getTextInputValue('typeInput');
    const identifiers = await IdentifierService.viewIdentifiers(type);

    const embed = new EmbedBuilder()
      .setTitle(`Displaying ${type} identifiers`)
      .setDescription(`List of ${type} identifiers`)
      .setColor(0x0099FF);

    identifiers.forEach(id => embed.addFields({ name: 'Identifier', value: id }));
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
