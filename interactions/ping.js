export default {
    name: 'ping',
    description: 'Ping',
    global: true,
    guilds: ['661203506434146304'],
    run: (interaction) => {
        interaction.reply({ content: 'Pong!', ephemeral: true });
    },
};
