const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  channelWl,
  wlCategoryId,
  wlStaffResult,
  wlCorrectResults,
  wlIncorrectResults,
  whitelistRole,
  nonWhitelistRole,
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
        .setFooter({ text: "\\🚩 Leia com atenção!" });
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
        .send({ content: `${message.author}`, embeds: [existChannel] })
        .then((msg) => {
          message.delete().catch(console.error);
          setTimeout(() => msg.delete().catch(console.error), 3000);
        });
    }

    // Criando o canal temporário para a whitelist
    message.guild.channels
      .create(`whitelist-${message.author.id}`, {
        type: "GUILD_TEXT",
        parent: wlCategoryId,
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

        let currentQuestion = 0;
        let correctAnswers = 0;
        let totalQuestions = questions.length;
        let userAnswers = [];
        let characterName = "";

        const askQuestion = async () => {
          if (currentQuestion < totalQuestions) {
            let questionObj = questions[currentQuestion];
            let questionText = `**${currentQuestion + 1}. ${
              questionObj.question
            }**`;

            if (currentQuestion < 2) {
              await channel.send(questionText);
            } else {
              const buttons = questionObj.options.map((_, index) => {
                return new MessageButton()
                  .setCustomId(`answer_${index + 1}`)
                  .setLabel(`${index + 1}`)
                  .setStyle("PRIMARY");
              });

              const row = new MessageActionRow().addComponents(buttons);

              questionText += "\n";
              questionObj.options.forEach((option, index) => {
                questionText += `${index + 1}. ${option}\n`; // Exibe as opções de resposta no texto
              });

              await channel.send({ content: questionText, components: [row] });
            }

            currentQuestion++;
          } else {
            endWhitelist(channel, correctAnswers);
          }
        };

        // Iniciar fazendo a primeira pergunta
        await askQuestion();

        const buttonCollector = channel.createMessageComponentCollector({
          componentType: "BUTTON",
          time: 1200000, // Tempo que a Whitelist permanece aberta
        });

        const textCollector = channel.createMessageCollector({
          time: 20000,
        });

        buttonCollector.on("collect", async (interaction) => {
          if (interaction.user.id !== message.author.id) return;

          const selectedAnswer = interaction.customId.split("_")[1];

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

          // Verifica se a resposta é correta
          if (
            parseInt(selectedAnswer, 10) ===
            questions[currentQuestion - 1].answer
          ) {
            correctAnswers++;
            await interaction.reply({
              embeds: [answerCorrect],
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              embeds: [answerIncorrect],
              ephemeral: true,
            });
          }

          await askQuestion();
        });

        textCollector.on("collect", async (m) => {
          if (m.author.bot) return;

          if (currentQuestion === 1) {
            characterName = m.content.trim();
            await askQuestion();
            correctAnswers++;
          } else if (currentQuestion === 2) {
            let userID = m.content.trim();
            userAnswers.push(`\\🆔 **ID do Jogo:** ${userID}`);
            await askQuestion();
            correctAnswers++;
          }
        });

        buttonCollector.on("end", async (collected, reason) => {
          if (reason === "time") {
            await channel.send(
              `<a:Incorreto:1214051678089777212>**O Tempo limite foi atingido!** \n \\📉 Finalizando a Whitelist...`
            );
            endWhitelist(channel, correctAnswers);
          }
        });

        const endWhitelist = async (channel, correctAnswers) => {
          const percentageCorrect = (correctAnswers / totalQuestions) * 100;

          const sendToChannel = (channelId, content) => {
            const resultChannel = client.channels.cache.get(channelId);
            if (resultChannel) {
              resultChannel.send(content).catch(console.error);
            }
          };

          let user = message.mentions.users.first() || message.author;
          const resultStaff = new MessageEmbed()
            .setTitle(`\\🎉 Resultado da Whitelist`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(
              `\\🕵️ **Nome do Personagem:** ${characterName}\n` +
                `\\🪪 **Usuário:** ${user}\n` +
                `\\🎯 **Resultado:** ${percentageCorrect.toFixed(2)}%`
            )
            .setColor("BLUE")
            .setFooter({
              text: "DeGabrielDEV ™ - Avisos",
              iconURL: message.author.displayAvatarURL(),
            })
            .setTimestamp();

          sendToChannel(wlStaffResult, { embeds: [resultStaff] });

          let embedResult;
          if (percentageCorrect >= 80) {
            embedResult = new MessageEmbed()
              .setTitle(
                "<a:Correto:1214051675166478377>** Whitelist Aprovada! **"
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

            await message.member.roles.add(whitelistRole);
            await message.member.roles.remove(nonWhitelistRole);
          } else {
            embedResult = new MessageEmbed()
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

            await message.member.roles.add(nonWhitelistRole);
          }

          sendToChannel(
            percentageCorrect >= 80 ? wlCorrectResults : wlIncorrectResults,
            { embeds: [embedResult] }
          );

          await channel.delete();
        };
      });
  },
};
