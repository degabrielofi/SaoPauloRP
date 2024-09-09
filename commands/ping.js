const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const messagePing = await message.reply("Calculando ping...");
  const latency = messagePing.createdTimestamp - message.createdTimestamp;
  const apiPing = Math.round(client.ws.ping);

  const uptime = formatUptime(client.uptime);

  const embed = new Discord.MessageEmbed()
    .setTitle("\\🏓 Pong! Meus Status:")
    .setDescription("Veja abaixo minhas informações de status e latência:")
    .addField("\\🤖 **Latência do Bot:**", `\`${latency}ms\``, true)
    .addField("\\📶 **Latência da API:**", `\`${apiPing}ms\``, true)
    .addField("\\⏰ **Uptime do Bot:**", `\`${uptime}\``, false)
    .setColor("BLUE")
    .setFooter("DeGabrielDEV Store™", message.author.displayAvatarURL())
    .setThumbnail("https://i.gifer.com/ZZ4q.gif")
    .setTimestamp();

  messagePing.edit({ content: `${message.author}`, embeds: [embed] });
};

function formatUptime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

exports.config = {
  name: "ping",
  aliases: ["ping"],
};
