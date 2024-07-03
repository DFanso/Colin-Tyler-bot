const { InteractionType } = require('../utils/constants');
const handleCommand = require('../handlers/commandHandler');
const handleButton = require('../handlers/buttonHandler');
const handleModal = require('../handlers/modalHandler');
const handleSelectMenu = require('../handlers/selectMenuHandler');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isCommand()) {
      await handleCommand(interaction);
    } else if (interaction.isButton()) {
      await handleButton(interaction);
    } else if (interaction.type === InteractionType.ModalSubmit) {
      await handleModal(interaction);
    } else if (interaction.isStringSelectMenu()) {
      await handleSelectMenu(interaction);
    }
  },
};