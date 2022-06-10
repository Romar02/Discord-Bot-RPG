//Chargement de dépendences
import fs from 'fs';
import Sequelize from 'sequelize';
import discordModals from 'discord-modals';
import { Client, Intents, Collection } from 'discord.js';
import dotenv from 'dotenv';
import config from './config.cjs';
import logger from './modules/Logger.js';
import functions from './modules/functions.js';
import mysql from 'mysql';
import util from 'util';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
discordModals(client);

client.config = config;
client.logger = logger;

functions(client);
dotenv.config();

client.commands = new Collection();
client.alt = new Collection();
client.commandsSlash = new Collection();

const init = async () => {
    // Add the credentials to access your database
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'rpg',
    });

    client.connection = connection;
    client.query = util.promisify(client.connection.query).bind(client.connection);

    process.env.TZ = 'Europe/Paris';

    // Chargement des Events & Commandes & Fonctions
    const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js') || file.endsWith('.cjs'));
    const commandFolders = fs.readdirSync('./commands').filter((folder) => !folder.includes('.'));
    const interactionsFiles = fs.readdirSync('./interactions').filter((file) => file.endsWith('.js') || file.endsWith('.cjs'));

    console.log(`=========================================================================`);

    // Chargement des Commandes
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync('./commands/' + folder).filter((file) => file.endsWith('.js') || file.endsWith('.cjs'));
        console.log('Chargement de la catégorie => ' + folder);
        for (const file of commandFiles) {
            const command = (await import(`./commands/${folder}/${file}`)).default;
            console.log('   Chargement de la commande => ' + command.options.name[0] + '');

            command.options.cat = folder;
            var name = command.options.name[0];
            var alts = command.options.name.slice(1);

            client.commands.set(name, command);
            for (const alternative of alts) {
                client.alt.set(alternative, name);
            }
        }
    }

    console.log(`=========================================================================`);
    console.log(`=========================================================================`);

    //#region  Chargement des Commandes Slash
    for (const file of interactionsFiles) {
        const cmd = (await import(`./interactions/${file}`)).default;

        if (!cmd.name) return console.log(`-----\nCommande non chargée : Pas de nom         [${file}]`);

        client.commandsSlash.set(cmd.name, cmd);

        console.log('Chargement de la commande slash => ' + cmd.name);
    }
    //#endregion

    console.log(`=========================================================================`);
    console.log(`=========================================================================`);

    // Chargement des Events
    for (const file of eventFiles) {
        const event = (await import(`./events/${file}`)).default;
        const eventName = file.split('.')[0];
        if (event.once) {
            client.once(eventName, (...args) => event.execute(...args, client));
        } else {
            client.on(eventName, (...args) => {
                event.execute(...args, client);
            });
        }
        console.log("Chargement de l'event => " + eventName);
    }

    console.log(`=========================================================================`);

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
};

console.log(client.config.ascii);
init();
