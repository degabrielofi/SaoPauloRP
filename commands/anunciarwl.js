const { idservidor } = require("../config.json");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  client.commands = new Discord.Collection();

  let server = await client.guilds.cache.get(idservidor);

  const embed = new Discord.MessageEmbed()
    .setTitle("Whitelist - " + server.name)
    .setThumbnail(message.guild.iconURL())
    .setColor("BLUE")
    .setDescription(
      "**Sistema de whitelist exclusivo! <a:verified:846807270632980570>** \n" +
        "***Para fazer sua whitelist digite neste canal:***\n" +
        "**```fix\n!whitelist```**\n" +
        "E aguarde as instruções do BOT! 💎"
    )
    .setFooter("DeGabrielDEV Store™");

  message.channel.send({ embeds: [embed] });
};

exports.config = {
  name: "anunciarwl",
  aliases: ["anunciarwl"],
};
