import { Modal, TextInputComponent, showModal } from 'discord-modals';
import discord from 'discord.js';
import fs from 'fs';

export default {
    async execute(interaction) {
        const client = interaction.client;

        const emotes = {
            xp: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'XP'),
            florinium: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Florinium'),
            bag: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Bag'),
            armure: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Armure'),
            casque: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Casque'),
            shield: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Shield'),
            arme: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Arme'),
            monture: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Monture'),
            trinité: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Trinit'),
            'Bave de Slime': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'BavedeSlime'),
            'Bave SuperGluante': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'BaveSuperGluante'),
            'Viande Putrifiée': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'ViandePutrifiee'),
            'Oreille de Gobelin': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'OreilledeGobelin'),
            Aura: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Aura'),
            "Crocs d'Araignée": client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'CrocsdAraignees'),
            'Corne Noire': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Corne'),
            "Sang d'Immortel": client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'SangdImmortel'),
            "Peau de l'Hybride": client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'PeaudelHybride'),
            'Bandages Anciens': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'BandagesAnciens'),
            Crâne: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Crane'),
            "Os d'Hippogriffe": client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'OsdHyppogriffe'),
            'Bec de Griffon': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'BecdeGriffon'),
            'Œil de Cyclope': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'OeilduCyclope'),
            'Esprit Vengeur': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'EspritVengeur'),
            'Plume de Harpie': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'PlumedeHarpie'),
            Venin: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Venin'),
            'Dent de Basilic': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'DentdeBasilic'),
            "Ailes de l'Énigme": client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'AilesdelEnigme'),
            'Cri de Mandragore': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'CrideMandragore'),
            Tibia: client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Tibia'),
            'Dents de Loup': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'DentsdeLoup'),
            'Face de Troll': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'FacedeTroll'),
            'Terreur Nocturne': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'TerreurNocturne'),
            'Épée Rouillée': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'EpeeRouillee'),
            "Queue d'Homme Lézard": client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'QueuedHommeLezard'),
            "Corne d'Égipan": client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'CornedEgipan'),
            'Poils de Centaure': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'PoilsdeCentaure'),
            'Sang Végétal': client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'SangVegetal'),
        };

        //#region Commands Slash
        if (interaction.isCommand()) {
            const cmd = client.commandsSlash.get(interaction.commandName);
            if (cmd) {
                cmd.run(interaction, emotes);
            }
        }
        //#endregion

        //#region Select Menus
        if (interaction.isSelectMenu()) {
        }
        //#endregion

        //#region Boutons
        if (interaction.isButton()) {
            if (interaction.customId.startsWith('avancement_')) {
                const action = interaction.customId.match(/avancement_(.*)/)[1];
                if (!action) return;

                const seriesData = JSON.parse(fs.readFileSync('./datas/avancement_serie.json'));

                seriesData[interaction.message.embeds[0].title].avancement.vf[action] += 1;
                const serieData = seriesData[interaction.message.embeds[0].title];

                fs.writeFileSync('./datas/avancement_serie.json', JSON.stringify(seriesData, null, 2));

                //#region Send notification

                const notification = `${discord.Formatters.channelMention(serieData.salon)} Chapitre ${('0' + seriesData[interaction.message.embeds[0].title].avancement.vf[action]).slice(-2)} ${
                    action[0].toUpperCase() + action.slice(1).toLowerCase()
                }`;
                const channel = interaction.guild.channels.cache.get('788525129797337088');

                channel.send({ content: notification });

                //#endregion

                //#region Edit Message in #avancement

                const serieAvancementEmbed = interaction.message.embeds[0];
                const serieAvancementComponents = new discord.MessageActionRow().addComponents(
                    new discord.MessageButton()
                        .setCustomId('avancement_trad')
                        .setLabel('Trad ' + ('0' + (serieData.avancement.vf.trad + 1)).slice(-2))
                        .setStyle('PRIMARY'),
                    new discord.MessageButton()
                        .setCustomId('avancement_check')
                        .setLabel('Check ' + ('0' + (serieData.avancement.vf.check + 1)).slice(-2))
                        .setStyle('PRIMARY'),
                    new discord.MessageButton()
                        .setCustomId('avancement_clean')
                        .setLabel('Clean ' + ('0' + (serieData.avancement.vf.clean + 1)).slice(-2))
                        .setStyle('PRIMARY'),
                    new discord.MessageButton()
                        .setCustomId('avancement_edit')
                        .setLabel('Edit ' + ('0' + (serieData.avancement.vf.edit + 1)).slice(-2))
                        .setStyle('PRIMARY'),
                    new discord.MessageButton()
                        .setCustomId('avancement_qcheck')
                        .setLabel('QCheck ' + ('0' + (serieData.avancement.vf.qcheck + 1)).slice(-2))
                        .setStyle('PRIMARY')
                );

                await interaction.update({ embeds: [serieAvancementEmbed], components: [serieAvancementComponents] });

                //#endregion
            }
        }
        //#endregion
    },
};
