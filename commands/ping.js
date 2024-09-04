const Discord = require("discord.js");
const { idservidor } = require("../config.json");

exports.run = (client, message, args) => {
  // Obtém o canal de texto do servidor usando o ID fornecido em 'config.json'
  let channel = client.guilds.cache.get(idservidor).channel;

  // Cria uma mensagem embed usando o Discord.MessageEmbed()
  const embed = new Discord.MessageEmbed()
    .setTitle("Status - Bot")
    .setDescription("**Estou com " + Math.floor(client.ws.ping) + " de ping!**")
    .setColor("PURPLE")
    .setFooter("DeGabrielOFI SOKASOA")
    .setThumbnail("https://i.gifer.com/ZZ4q.gif");

  // Envia o embed para o canal de texto onde o comando foi chamado
  message.channel.send(embed).then((msg) => {
    // Deleta a mensagem após 10 segundos (10000 milissegundos)
    msg.delete({ timeout: 10000 });
  });
};

exports.config = {
  name: "ping",
  aliases: ["ping"],
};
