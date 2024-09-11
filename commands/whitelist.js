const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  channelWl,
  idcategoriawl,
  resultadowlstaff,
  resultadowlacertos,
  resultadowl_errados,
  whitelistcargo,
  nonwhitelistcargo,
} = require("../config.json");

const questions = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/questions.json"))
);

module.exports = {
  name: "whitelist",
  category: "everyone",
  run: async (client, message, args) => {
    if (message.channel.id !== channelWl) {
      const embed = new MessageEmbed()
        .setTitle("<a:Incorreto:1214051678089777212>** Canal Incorreto! **")
        .setDescription(
          `\\😡 **Você não pode usar este comando neste chat.**` +
            `\\📝 **Utilize este Canal**: ${channelWl}`
        )
        .setColor("#ff0000")
        .setFooter({ text: "Leia com atenção!" });
      return message.channel.send({ embeds: [embed] });
    }

    let existingChannel = message.guild.channels.cache.find(
      (channel) => channel.name === `whitelist-${message.author.id}`
    );
    if (existingChannel) {
      const existChannel = new MessageEmbed()
        .setTitle(
          "<a:Incorreto:1214051678089777212>** Você já possui uma whitelist em aberta! **"
        )
        .setDescription(
          `\\⏱️ *Você tem 20 segundos para responder cada pergunta.*\n` +
            `\\📝 **Canal**: ${existingChannel}`
        )
        .setColor("RED")
        .setFooter({
          text: "DeGabrielDEV ™ - Avisos",
          iconURL: message.author.displayAvatarURL(),
        })
        .setTimestamp();
      return message.channel
        .send({
          content: `${message.author}`,
          embeds: [existChannel],
        })
        .then((msg) => {
          message.delete().catch(console.error);
          setTimeout(() => msg.delete().catch(console.error), 3000);
        });
    }

    // Criando o canal temporário para a whitelist
    message.guild.channels
      .create(`whitelist-${message.author.id}`, {
        type: "GUILD_TEXT",
        parent: idcategoriawl,
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
        ],
      })
      .then(async (channel) => {
        const embed = new MessageEmbed()
          .setTitle(
            "<a:Correto:1214051675166478377>** Canal de Whitelist Criado! **"
          )
          .setDescription(
            `\\🪪 **Usuário:** ${message.author}\n` +
              `\\⏱️ **Você tem 20 segundos para responder cada pergunta.**\n` +
              `\\📝 **Canal**: ${channel}`
          )
          .setColor("GREEN")
          .setThumbnail(message.guild.iconURL())
          .setFooter({
            text: "DeGabrielDEV ™ - Avisos",
            iconURL: message.author.displayAvatarURL(),
          })
          .setTimestamp();

        message.channel.send({ embeds: [embed] }).then((msg) => {
          message.delete().catch(console.error);
          setTimeout(() => msg.delete().catch(console.error), 5000);
        });

        const collector = channel.createMessageCollector({
          time: 20000,
        });

        let currentQuestion = 0;
        let correctAnswers = 0;
        let totalQuestions = questions.length;
        let userAnswers = [];
        let answered = false;
        let characterName = ""; // Variável para armazenar o nome do personagem

        const askQuestion = () => {
          if (currentQuestion < totalQuestions) {
            let questionObj = questions[currentQuestion];
            let questionText = `**${currentQuestion + 1}. ${
              questionObj.question
            }**\n\n${questionObj.options
              .map((opt, index) => `${index + 1}️⃣ ${opt}`)
              .join("\n")}`;
            channel.send(questionText);
          } else {
            endWhitelist(channel, correctAnswers);
          }
        };

        collector.on("collect", (m) => {
          if (m.author.bot) return;

          if (currentQuestion === 0) {
            // Primeiro pergunta é o nome do personagem
            characterName = m.content.trim();
            userAnswers.push(`**Nome do Personagem:** ${characterName}`);
            currentQuestion++;
            askQuestion();
          } else {
            const userAnswer = parseInt(m.content.trim(), 10);
            const answerIncorrect = new MessageEmbed()
              .setDescription(
                `<a:Incorreto:1214051678089777212>**| Resposta Incorreta!**`
              )
              .setColor("RED")
              .setFooter({
                text: "DeGabrielDEV Store™",
                iconURL: message.author.displayAvatarURL(),
              })
              .setTimestamp();

            const answerCorrect = new MessageEmbed()
              .setDescription(
                `<a:Correto:1214051675166478377>**| Resposta Correta!**`
              )
              .setColor("GREEN")
              .setFooter({
                text: "DeGabrielDEV Store™",
                iconURL: message.author.displayAvatarURL(),
              })
              .setTimestamp();

            const answerInvalid = new MessageEmbed()
              .setDescription(
                `<a:Sirene:1214051670343028776>**| Por Favor, envie uma resposta válida, utilizando somente o número da alternativa que acha correta.**`
              )
              .setColor("BLUE")
              .setFooter({
                text: "DeGabrielDEV Store™",
                iconURL: message.author.displayAvatarURL(),
              })
              .setTimestamp();

            if (!isNaN(userAnswer)) {
              userAnswers.push(`**Pergunta ${currentQuestion}:** ${m.content}`);
              if (userAnswer === questions[currentQuestion - 1].answer) {
                correctAnswers++;
                channel
                  .send({
                    content: `${message.author}`,
                    embeds: [answerCorrect],
                  })
                  .then((msg) =>
                    setTimeout(() => msg.delete().catch(console.error), 2000)
                  );
              } else {
                channel
                  .send({
                    content: `${message.author}`,
                    embeds: [answerIncorrect],
                  })
                  .then((msg) =>
                    setTimeout(() => msg.delete().catch(console.error), 2000)
                  );
              }
              currentQuestion++;
              askQuestion();
            } else {
              channel
                .send({ content: `${message.author}`, embeds: [answerInvalid] })
                .then((msg) =>
                  setTimeout(() => msg.delete().catch(console.error), 2000)
                );
            }
          }
        });

        collector.on("end", () => {
          if (!answered) {
            answered = true;
            endWhitelist(channel, correctAnswers);
          }
        });

        askQuestion();

        const endWhitelist = (channel, correctAnswers) => {
          if (answered) return;
          answered = true;

          collector.stop();
          const percentageCorrect = (correctAnswers / totalQuestions) * 100;

          const sendToChannel = (channelId, content) => {
            const resultChannel = client.channels.cache.get(channelId);
            if (resultChannel) {
              resultChannel.send(content).catch(console.error);
            }
          };

          if (userAnswers.length > 0) {
            let user = message.mentions.users.first() || message.author;
            const resultStaff = new MessageEmbed()
              .setTitle(`🎉 Resultado da Whitelist`)
              .setThumbnail(message.guild.iconURL())
              .setDescription(
                `🪪 **Usuário:** ${user}\n` +
                  `🆔 **ID:** ${user.tag}\n` +
                  `**Nome do Personagem:** ${characterName}\n` +
                  `**Pontuação:**\n ${userAnswers.join("\n")}\n` +
                  `🎯 **Resultado:** ${percentageCorrect.toFixed(2)}%`
              )
              .setColor("BLUE")
              .setFooter({
                text: "DeGabrielDEV ™ - Avisos",
                iconURL: message.author.displayAvatarURL(),
              })
              .setTimestamp();

            sendToChannel(resultadowlstaff, { embeds: [resultStaff] });
          }

          if (percentageCorrect >= 80) {
            const embedAprovado = new MessageEmbed()
              .setTitle(
                "<a:Correto:1214051675166478377>** Whitelist Aprovada **"
              )
              .setDescription(
                `**Usuário:** ${message.author}\n` +
                  `**Personagem:** ${characterName}\n` +
                  `**Resultado:** ${percentageCorrect.toFixed(2)}%\n` +
                  `**Pontuação:** ${correctAnswers} de ${totalQuestions} acertos`
              )
              .setThumbnail(message.guild.iconURL())
              .setColor("GREEN")
              .setFooter({
                text: "DeGabrielDEV ™ - Avisos",
                iconURL: message.author.displayAvatarURL(),
              })
              .setTimestamp();

            sendToChannel(resultadowlacertos, { embeds: [embedAprovado] });
            message.member.roles.add(whitelistcargo).catch(console.error);
          } else {
            const embedReprovado = new MessageEmbed()
              .setTitle(
                "<a:Incorreto:1214051678089777212>** Whitelist Reprovada **"
              )
              .setDescription(
                `**Usuário:** ${message.author}\n` +
                  `**Personagem:** ${characterName}\n` +
                  `**Resultado:** ${percentageCorrect.toFixed(2)}%\n` +
                  `**Pontuação:** ${correctAnswers} de ${totalQuestions} acertos`
              )
              .setThumbnail(message.guild.iconURL())
              .setColor("RED")
              .setFooter({
                text: "DeGabrielDEV ™ - Avisos",
                iconURL: message.author.displayAvatarURL(),
              })
              .setTimestamp();

            sendToChannel(resultadowl_errados, { embeds: [embedReprovado] });
            message.member.roles.remove(nonwhitelistcargo).catch(console.error);
          }

          setTimeout(() => channel.delete(), 3000);
        };
      })
      .catch(console.error);
  },
};
