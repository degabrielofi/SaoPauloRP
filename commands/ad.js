const Discord = require("discord.js");
const { idservidor } = require("../config.json");

module.exports.run = async (client, message, args) => {
  let degabrielofi = new Discord.MessageEmbed()
    .setAuthor("COMANDO: Anúncio", "https://i.imgur.com/0b6Ohrl.png")
    .setThumbnail("https://i.imgur.com/EXXpFP5.png")
    .setTimestamp()
    .setFooter(
      `Autor do comando ${message.author.tag}`,
      message.author.displayAvatarURL({ format: "png" })
    )
    .setColor("#471516")
    .addFields(
      {
        name: "<:Descricao:1214053842162024508> Descrição:",
        value:
          "Utilize este comando para eu fazer um anúncio no chat. Escreva com `!anuncio (Mensagem).`",
        inline: true,
      },
      {
        name: "<:Sinonimos:1214053417933340692> Sinônimos:",
        value: "`!ad` `!anunciar`",
        inline: true,
      },
      {
        name: "\u200b",
        value: `\u200b`,
        inline: true,
      },
      {
        name: "<:folder:1214053377923616798> Exemplos:",
        value: "`d$ad DeGabrielDEV É O MELHOR! `",
        inline: true,
      }
    );
  if (!args[0])
    return message
      .reply({
        content: `${message.author}`,
        embeds: [degabrielofi],
      })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 10000);
      });

  client.commands = new Discord.Collection();
  const announcementText = args.join(" ");
  message.delete().catch((err) => {});

  let server = client.guilds.cache.get(idservidor);

  const embed = new Discord.MessageEmbed()
    .setTitle("Anúncio - " + server.name)
    .setColor("BLUE")
    .setThumbnail(message.guild.iconURL())
    .setDescription("**__" + announcementText + "__**")
    .setFooter(
      `Autor do comando ${message.author.tag}`,
      message.author.displayAvatarURL({ format: "png" })
    );

  message.channel.send({ content: `${message.author}`, embeds: [embed] });
};

exports.config = {
  name: "anuncio",
  aliases: ["anunciar", "ad"],
};
