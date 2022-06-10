import discord from 'discord.js';
import fs from 'fs';

export default {
    async execute(modal) {
        if (modal.customId === 'modal-add-serie') {
            const serieName = modal.getTextInputValue('add_serie_name');
            const serieLienVF = modal.getTextInputValue('add_serie_vf');
            const serieLienVA = modal.getTextInputValue('add_serie_va');
            const serieLienVO = modal.getTextInputValue('add_serie_vo');
            const salonId = modal.channelId;

            //#region Message d'avancement
            const serieAvancementEmbed = new discord.MessageEmbed()
                .setTitle(serieName)
                .setDescription(
                    (serieLienVF ? `${discord.Formatters.hyperlink('URL VF', serieLienVF)}\n` : '') +
                        (serieLienVA ? `${discord.Formatters.hyperlink('URL VA', serieLienVA)}\n` : '') +
                        (serieLienVO ? `${discord.Formatters.hyperlink('URL VO', serieLienVO)}\n` : '') +
                        `\n\n` +
                        (serieLienVF ? `${'**Nombre de chapitres en VF** : 0'}\n` : '') +
                        (serieLienVA ? `${'**Nombre de chapitres en VA** : 0'}\n` : '') +
                        (serieLienVO ? `${'**Nombre de chapitres en VO** : 0'}\n` : '')
                );

            const serieAvancementComponents = new discord.MessageActionRow().addComponents(
                new discord.MessageButton().setCustomId('avancement_trad').setLabel('Trad 01').setStyle('PRIMARY'),
                new discord.MessageButton().setCustomId('avancement_check').setLabel('Check 01').setStyle('PRIMARY'),
                new discord.MessageButton().setCustomId('avancement_clean').setLabel('Clean 01').setStyle('PRIMARY'),
                new discord.MessageButton().setCustomId('avancement_edit').setLabel('Edit 01').setStyle('PRIMARY'),
                new discord.MessageButton().setCustomId('avancement_qcheck').setLabel('QCheck 01').setStyle('PRIMARY')
            );

            modal.guild.channels.cache.get('788525456802185237').send({ embeds: [serieAvancementEmbed], components: [serieAvancementComponents] });

            //#endregion

            const fileDatas = JSON.parse(fs.readFileSync('./datas/avancement_serie.json'));
            const serieDatas = {
                nom: serieName,
                salon: salonId,
                liens: {
                    vf: serieLienVF,
                    va: serieLienVA ?? '',
                    vo: serieLienVO ?? '',
                },
                avancement: {
                    vf: {
                        clean: 0,
                        trad: 0,
                        check: 0,
                        edit: 0,
                        qcheck: 0,
                    },
                    va: 0,
                    vo: 0,
                },
                postes: {
                    clean: [],
                    trad: [],
                    check: [],
                    edit: [],
                    qcheck: [],
                },
            };

            fileDatas[serieName] = serieDatas;

            fs.writeFileSync('./datas/avancement_serie.json', JSON.stringify(fileDatas, null, 2));

            modal.reply({ content: 'Série ajoutée' });
            setTimeout(() => modal.deleteReply(), 2000);
        }
    },
};
