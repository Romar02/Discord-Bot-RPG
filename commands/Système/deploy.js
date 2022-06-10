export default {
    options: {
        name: ['deploy', 'd'],
        description: "Deploiement d'une ou plusieurs commandes slash",
        usage: [],
        enabled: true,
        permissionLevel: 10,
    },
    async execute(client, message, commandName) {
        if (!client.application?.owner) await client.application?.fetch();

        const cercleTravailCommands = [];

        const testCommands = [
            {
                name: 'test',
                description: "Test d'interaction",
            },
        ];

        // client.application?.commands.set(globalCommands);
        client.application.commands.set(testCommands, '537640510647566347');
    },
};
