require('dotenv').config();

const config = {
    // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
    ownerID: '458368236799655947',

    // Bot Admins, level 9 by default. Array of user ID strings.
    admins: ['597086689524973580A'],

    // Bot Support, level 8 by default. Array of user ID strings
    support: [],

    // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
    token: process.env.DISCORD_TOKEN,

    version: '1.0',

    defaultSettings: {
        prefix: '$',
        logs: 'false',
        modLogChannel: '📋-logs-📋',
        moderationLogChannel: '📇-logs-moderation-📇',
        modRole: 'Modo',
        muteRole: 'Muted',
        adminRole: 'Admin',
        systemNotice: 'true', // This gives a notice when a user tries to run a command that they do not have permission to use.
        welcomeChannel: '🚪-accueil',
        welcomeMessage: 'Bienvenue {{user}} ! Heureux de te voir :D',
        welcomeEnabled: 'false',
        byeMessage: '{{user}} est parti, dommage.',
        byeEnabled: 'false',
        byeChannel: '🚪-accueil',
        xp: 'false',
        xpChannel: 'xp',
    },

    permLevels: [
        // This is the lowest permisison level, this is for non-roled users.
        {
            level: 0,
            name: 'User',
            // Don't bother checking, just return true which allows them to execute any command their
            // level allows them to.
            check: () => true,
        },

        // This is your permission level, the staff levels should always be above the rest of the roles.
        {
            level: 5,
            // This is the name of the role.
            name: 'Moderator',
            // The following lines check the guild the message came from for the roles.
            // Then it checks if the member that authored the message has the role.
            // If they do return true, which will allow them to execute the command in question.
            // If they don't then return false, which will prevent them from executing the command.
            check: (member, message) => {
                try {
                    const modRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if (modRole && member.roles.cache.has(modRole.id)) return true;
                } catch (e) {
                    return false;
                }
            },
        },

        {
            level: 6,
            name: 'Administrator',
            check: (member, message) => {
                try {
                    const adminRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    return adminRole && member.roles.cache.has(adminRole.id);
                } catch (e) {
                    return false;
                }
            },
        },
        // This is the server owner.
        {
            level: 7,
            name: 'Server Owner',
            // Simple check, if the guild owner id matches the message author's ID, then it will return true.
            // Otherwise it will return false.
            check: (member, message) => (message.channel.type === 'text' ? (message.guild.ownerId === member.user.id ? true : false) : false),
        },

        // Bot Support is a special inbetween level that has the equivalent of server owner access
        // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
        {
            level: 8,
            name: 'Bot Support',
            // The check is by reading if an ID is part of this array. Yes, this means you need to
            // change this and reboot the bot to add a support user. Make it better yourself!
            check: (member, message) => config.support.includes(member.user.id),
        },

        // Bot Admin has some limited access like rebooting the bot or reloading commands.
        {
            level: 9,
            name: 'Bot Admin',
            check: (member, message) => config.admins.includes(member.user.id),
        },

        // This is the bot owner, this should be the highest permission level available.
        // The reason this should be the highest level is because of dangerous commands such as eval
        // or exec (if the owner has that).
        {
            level: 10,
            name: 'Bot Owner',
            // Another simple check, compares the message author id to the one stored in the config file.
            check: (member, message) => message.client.config.ownerID === member.user.id,
        },
    ],

    catEmotes: {
        Basique: '📰',
        Game: '🎲',
        Modération: '🛡️',
        Organisation: '🗃️',
        Système: '🛠️',
        Tests: '🔐',
        Cercle: '⭕',
        Okami: '🐺',
    },

    points: {
        cooldown: 60000,
        min: 4,
        max: 10,
        cat: {
            60: { color: '#4ae6c7', name: '🗡️ Confrérie des Assassins 🗡️' },
            20: { color: '#4ae6c7', name: '⚔️ Cercle de la Chevalerie ⚔️' },
            1: { color: '#4ae6c7', name: '🧙 Cercle des Mages 🧙' },
        },
        roles: {
            95: { color: '#2693eb', name: 'Dieu de la Mort' },
            90: { color: '#2693eb', name: 'Seigneur des Enfers' },
            85: { color: '#2693eb', name: 'Maître de la Confrérie' },
            80: { color: '#2693eb', name: 'Assassin Royal' },
            75: { color: '#2693eb', name: 'Assassin' },
            70: { color: '#2693eb', name: 'Disciple de la Confrérie' },
            65: { color: '#2693eb', name: 'Tueur à Gages' },
            61: { color: '#2693eb', name: 'Meurtrier' },
            55: { color: '#2693eb', name: 'Guerrier Divin' },
            50: { color: '#2693eb', name: 'Maître du Combat' },
            45: { color: '#2693eb', name: 'Champion' },
            40: { color: '#2693eb', name: 'Paladin' },
            35: { color: '#2693eb', name: 'Chevalier' },
            30: { color: '#2693eb', name: 'Ecuyer' },
            25: { color: '#2693eb', name: 'Mercenaire' },
            21: { color: '#2693eb', name: 'Apprenti' },
            15: { color: '#2693eb', name: 'Mage Divin' },
            12: { color: '#2693eb', name: 'Maître de la Magie' },
            9: { color: '#2693eb', name: 'Archimage' },
            6: { color: '#2693eb', name: 'Shaman' },
            5: { color: '#2693eb', name: 'Mage' },
            4: { color: '#2693eb', name: 'Guérisseur' },
            3: { color: '#2693eb', name: 'Herboriste' },
            2: { color: '#2693eb', name: 'Villageois' },
        },
    },

    ascii: '\n  _____________                          _________   ________      _____ \n  ___  __ \\__(_)_______________________________  /   ___  __ )_______  /_\n  __  / / /_  /__  ___/  ___/  __ \\_  ___/  __  /    __  __  |  __ \\  __/\n  _  /_/ /_  / _(__  )/ /__ / /_/ /  /   / /_/ /     _  /_/ // /_/ / /_  \n  /_____/ /_/  /____/ \\___/ \\____//_/    \\__,_/      /_____/ \\____/\\__/  ',
};

module.exports = config;
