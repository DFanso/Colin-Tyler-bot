const { InteractionType, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, ModalBuilder, StringSelectMenuBuilder } = require('discord.js');
const { handleAddIdentifier, handleRemoveIdentifier, handleViewIdentifiers } = require('../handlers/adminButtonHandlers');
const IdentifierService = require('../services/identifierService');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    } else if (interaction.isButton()) {
      const { customId } = interaction;
      if (customId === 'add_identifier') {
        await handleAddIdentifier(interaction);
      } else if (customId === 'remove_identifier') {
        await handleRemoveIdentifier(interaction);
      } else if (customId === 'view_identifier') {
        await handleViewIdentifiers(interaction);
      } else if (customId === 'setup_identifier' || customId === 'setup_ticket') {
        const modal = new ModalBuilder()
          .setCustomId('setupChannelModal')
          .setTitle('Setup Channel');

        const channelIdInput = new TextInputBuilder()
          .setCustomId('channelIdInput')
          .setLabel('Channel ID')
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(channelIdInput);

        modal.addComponents(actionRow);

        await interaction.showModal(modal);
      }
    } else if (interaction.type === InteractionType.ModalSubmit) {
      const { customId } = interaction;

      if (customId === 'setupChannelModal') {
        const channelId = interaction.fields.getTextInputValue('channelIdInput');
        const channel = await interaction.guild.channels.fetch(channelId);

        if (channel && channel.type === ChannelType.GuildText) {
          const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Update Identifiers')
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
    } else if (interaction.isStringSelectMenu()) {
      const { customId, values } = interaction;
      const selectedType = values[0];

      if (customId === 'view') {
        const identifiers = await IdentifierService.viewIdentifiers(selectedType);

        if(identifiers === 'null'){
          await interaction.reply({ content: 'No identifiers are found.', ephemeral: true });
          return 0;
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
    }
  },
};
