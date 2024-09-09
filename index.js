const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.MESSAGE_CONTENT,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const fs = require("fs");
const configJson = require("./config.json");

const config = {
  token: configJson.token,
  prefix: configJson.prefix,
};

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (
    message.content === `<@${client.user.id}>` ||
    message.content === `<@!${client.user.id}>`
  ) {
    return message.reply(
      `<:DGzzIN:1214053375750963221> **|** Olá ${message.author}, Meu prefixo é \`${config.prefix}\`, veja meus comandos em ${configJson.prefix}help`
    );
  }

  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase()))
    return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error("Erro ao executar o comando:", err);

    const degabrielofierr = new Discord.MessageEmbed()
      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Este comando não existe! Veja meus comandos existentes com ${configJson.prefix}help**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    const msg = await message.reply({
      content: `${message.author}`,
      embeds: [degabrielofierr],
    });
    message.delete();
    setTimeout(() => msg.delete(), 10000);
  }
});

client.once("ready", () => {
  console.log("Estou pronto(a) para ser utilizado(a)!");
});

client.login(config.token);
