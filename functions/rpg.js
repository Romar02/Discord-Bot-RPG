import Discord from 'discord.js';

export default {
    saveBDD: function (file, client) {
        const fs = require('fs');
        var db = client[file];
        fs.writeFile('./datas/' + file + '.json', db.export(), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    },
    getBDD: function (file, client) {
        const fs = require('fs');
        var db = client[file];
        fs.readFile('./datas/' + file + '.json', function read(err, data) {
            if (err) {
                throw err;
            }
            db.import(data, true, true);
            console.log('Importation de ' + file + ' réussie.');
        });
    },
    await: function (ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },
    spawn: function (number, message) {
        const fs = require('fs');
        var num = number,
            length = JSON.parse(fs.readFileSync('./monster.json'))['Monstres'].length;
        if (num > length) {
            num = Math.floor(Math.random() * (+length + 1 - +1) + 1);
        }
        const monstrespawn = JSON.parse(fs.readFileSync('./monster.json'))['Monstres'].slice(num, num + 1);
        message.delete();
        return monstrespawn;
    },
    //Obtention de stat
    getstat: function (equip, statistique, moi) {
        const fs = require('fs');
        const economy = JSON.parse(fs.readFileSync('./items.json'));
        var stat = 0;
        if (statistique.includes('bonus')) {
            stat = 1;
        }
        try {
            moi.autres.equip;
        } catch (error) {
            return;
        }
        var equipname = moi.autres.equip[equip];
        if (equipname && equipname != 'Rien' && equipname != '') {
            for (var i = 0; i < economy['Equipement'].map((e) => e.name).length; i++) {
                if (
                    economy['Equipement']
                        .map((e) => e.name)
                        .slice(i, i + 1)
                        .join(' ') == equipname
                ) {
                    const name = economy['Equipement'].slice(i, i + 1);
                    name.forEach((element) => {
                        stat = +element.stats[statistique];
                    });
                }
            }
        }
        return stat;
    },
    dégats: function (stat) {
        var deg = Math.floor(Math.random() * (1 * +stat + 1 - 0.6 * +stat) + 0.6 * +stat);
        return deg;
    },
    //Événement aléatoire
    simulateEvent: function (chances) {
        var sum = 0;
        chances.forEach(function (chance) {
            sum += chance;
        });
        var rand = Math.random();
        var chance = 0;
        for (var i = 0; i < chances.length; i++) {
            chance += chances[i] / sum;
            if (rand < chance) {
                return i;
            }
        }
        return -1;
    },
    calcdégat: function (event, deg, statdef, statpuiss) {
        var result;
        switch (event) {
            case 'Esquive':
                result = 0;
                break;

            case 'Attaque normale':
                result = Math.round(+deg * (100 / (100 + +statdef)));
                break;

            case 'Coup critique':
                result = Math.round(+deg * 1.6);
                break;
        }
        return result;
    },
    randomnumber: function (min, max) {
        var number = Math.floor(Math.random() * (+max + 1 - +min) + min);
        return number;
    },
    getUserFromMentionRegEx: function (mention, members) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
        const id = matches[1];

        return members.get(id);
    },
    checklvlup: function (client, us, message) {
        const curLevel = Math.floor(0.3 * Math.sqrt(client.rpg.get(us.id, 'xp')));
        if (client.rpg.get(us.id, 'level') < curLevel) {
            var msg = '';
            if (message.author.id == us.id) {
                msg = `Vous êtes monté en niveau, vous êtes désormais au niveau **${curLevel}** !`;
            } else {
                msg = `${us.username} est monté en niveau, il est désormais au niveau **${curLevel}** !`;
            }
            client.rpg.set(us.id, curLevel, 'level');
            this.logs(`>>> [:chart_with_upwards_trend:] Levelup de **${us.tag}//${us.id}**, qui est maintenant au niveau **${curLevel}**.`, client);
            return message.reply(msg);
        } else if (client.rpg.get(us.id, 'level') > curLevel) {
            client.rpg.set(us.id, curLevel, 'level');
            this.logs(`>>> [:chart_with_downwards_trend:] Leveldown de **${us.tag}//${us.id}**, qui est maintenant au niveau **${curLevel}**.`, client);
            return;
        }
    },
    checkinvcraft: function (client, k, element, number) {
        if (client.rpg.get(k, `sac.${element}`) >= number) {
            return true;
        } else {
            return false;
        }
    },
    craft: function (message, itemcraft, number) {
        var resu = {
            réussite: 0,
            echec: 0,
        };
        for (var i = 0; i < +number; i++) {
            for (let [key, value] of Object.entries(itemcraft.craft.recette)) {
                message.client.rpg.math(message.author.id, '-', value, `sac.${key}`);
            }
            var res = itemcraft.name;
            const key = message.author.id;
            if (itemcraft.craft.echec) {
                res = [itemcraft.name, itemcraft.craft.echec][this.simulateEvent([+itemcraft.craft.chance, 100 - +itemcraft.craft.chance])];
            }
            if (message.client.rpg.has(key, `sac.${res}`)) {
                message.client.rpg.math(key, '+', 1, `sac.${res}`);
            } else {
                message.client.rpg.ensure(key, 1, `sac.${res}`);
            }
            if (res == itemcraft.name) {
                Object.assign(resu, {
                    réussite: resu.réussite + 1,
                });
            } else if (res == itemcraft.craft.echec) {
                Object.assign(resu, {
                    echec: resu.echec + 1,
                });
            }
        }
        return resu;
    },
    convnum: function (param) {
        var result = param;
        if (isNaN(param)) {
            const param2 = param.split('');
            const unit = `${param2.pop()}`;
            const num = param2.join('');
            if (isNaN(+num)) {
                return;
            } else if (Math.round(num) > 999) {
                const number = Math.round(+num);
                const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
                result = `${Math.floor((number / 1000) * 100) / 100}${units[units.findIndex((e) => e == unit) + 1]}`;
            } else {
                result = param;
            }
        } else {
            result = param;
            const number = Math.round(+param);
            const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
            for (var i = 1000, act = 0; i < 1000000000000000000001; act++, i = i * 1000) {
                if (i < number) {
                    result = `${Math.floor((number / i) * 100) / 100}${units[act]}`;
                }
            }
        }
        return result;
    },
    logs: function (log, client) {
        const logGuild = client.guilds.cache.find((g) => g.id == '661203506434146304');
        if (!logGuild) return;
        const logChan = logGuild.channels.cache.find((ch) => ch.id == '695231063701717023');
        if (!logChan) return;
        logChan.send(log);
    },
};
