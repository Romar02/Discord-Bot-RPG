import Discord from 'discord.js';
export default {
    async execute(member, client) {
        const join = client.guilds.cache.get('498228085804630016').emojis.cache.get('718801227898683402');

        const settings = client.getSettings(member.guild);

        if (settings.logs == 'true') {
            const guild = member.guild;
            const channellog = guild.channels.cache.find((c) => c.name == settings.modLogChannel);
            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.displayAvatarURL({ dynamic: false }) })
                .setDescription(`${join} **Arrivée :** ${member} • @${member.user.tag}`)
                .setTimestamp()
                .setFooter({ text: `User ID : ${member.user.id}` })
                .setColor('#64B5E7');
            if (channellog != null) {
                channellog.send({ embeds: [embed] });
            }
        }

        if (settings.welcomeEnabledMP == 'true') {
            const welcomeMessagePV = settings.welcomeMessageMP.replace('{{user}}', member.user.username);
            member.send({ content: welcomeMessagePV });
        }

        if (settings.welcomeEnabled == 'true') {
            const welcomeMessage = settings.welcomeMessage
                .replace('{{user}}', member.user)
                .replace('{{guild}}', member.guild.name)
                .replace('{{number}}', member.guild.members.cache.size.toLocaleString());

            const channel = member.guild.channels.cache.find((c) => c.name == settings.welcomeChannel);

            if (channel != null) {
                channel.send({ content: `${join} ${welcomeMessage}` }).catch(console.error);
            }
        }
    },
};
