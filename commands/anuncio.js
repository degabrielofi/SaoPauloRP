const Discord = require("discord.js");
const { idservidor, imgwl } = require("../config.json");

module.exports.run = async (client, message, args) => {
  // Junta os argumentos fornecidos no comando em uma única string
  const announcementText = args.join(" ");

  // Deleta a mensagem original e adiciona um manipulador de erro
  message.delete().catch((err) => {});

  let server = client.guilds.cache.get(idservidor);

  const embed = new Discord.MessageEmbed()
    .setTitle("𝗔𝗻𝘂𝗻𝗰𝗶𝗼 - " + server.name)
    .setColor("PURPLE")
    .setThumbnail(message.guild.iconURL())
    .setDescription("**__" + announcementText + "__**")
    .setFooter("𝗗𝗿𝗮𝗴𝗼𝗻 Resources");

  message.channel.send(embed);
};

exports.config = {
  name: "anuncio",
  aliases: ["anunciar", "say"],
};
