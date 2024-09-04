const { idservidor } = require("../config.json"); // Importa o ID do servidor a partir de um arquivo de configuração
const Discord = require("discord.js"); // Importa a biblioteca discord.js

exports.run = async (client, message, args) => {
  // Função assíncrona chamada quando o comando 'anunciarwl' é executado

  // Obtém o servidor pelo ID fornecido no arquivo de configuração
  let server = await client.guilds.cache.get(idservidor);

  // Verifica se o autor da mensagem tem permissão de administrador
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("Sem permissão"); // Responde com "Sem permissão" caso o usuário não tenha permissões
  }

  // Cria uma mensagem embed usando o Discord.MessageEmbed()
  const embed = new Discord.MessageEmbed()
    .setTitle("Whitelist - " + server.name) // Define o título do embed com o nome do servidor
    .setThumbnail(message.guild.iconURL()) // Define a miniatura usando o ícone do servidor
    .setColor("BLACK") // Define a cor do embed
    .setDescription(
      "**Sistema de whitelist exclusivo! <a:verified:846807270632980570>** \n" +
        "***Para fazer sua whitelist digite neste canal:***\n" +
        "**```fix\n!whitelist```**\n" +
        "E aguarde as instruções do BOT! 💎"
    ) // Define a descrição do embed com instruções para whitelist
    .setFooter("DeGabrielOFI Bot"); // Define o rodapé do embed

  // Envia o embed para o canal onde o comando foi chamado
  message.channel.send(embed);
};

exports.config = {
  name: "anunciarwl", // Nome do comando
  aliases: ["anunciarwl"], // Aliases (atalhos) para o comando
};
