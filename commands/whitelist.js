const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  canalwl,
  idcategoriawl,
  resultadowlstaff,
  resultadowlacertos,
  resultadowl_errados,
  whitelistcargo,
  nonwhitelistcargo,
} = require("../config.json");

// Carrega as perguntas do arquivo JSON
const questions = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/questions.json"), "utf-8")
);

module.exports = {
  name: "whitelist",
  category: "everyone",
  run: async (client, message, args) => {
    if (message.channel.id !== canalwl) {
      const embed = new MessageEmbed()
        .setTitle("Canal Incorreto")
        .setDescription(
          `Você não pode usar este comando neste chat. Utilize: <#${canalwl}>`
        )
        .setColor("#ff0000")
        .setFooter({ text: "Leia com atenção!" });
      return message.channel.send({ embeds: [embed] });
    }

    let existingChannel = message.guild.channels.cache.find(
      (channel) => channel.name === `whitelist-${message.author.id}`
    );
    if (existingChannel) {
      return message.channel.send(
        "```fix\nVocê já possui uma whitelist em aberta!```"
      );
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
          .setTitle("Whitelist - Criada!")
          .setDescription(
            `>**!\nCriei seu canal de Whitelist. Você tem 50 segundos a partir de **agora** em cada **pergunta.**\n\n**Canal**: ${channel}`
          )
          .setColor("#2b961f")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/769023544931123210/806905164345901116/ALERTAANIMADO.gif"
          )
          .setFooter({
            text: "DeGabrielDEV Store™",
            iconURL: message.author.displayAvatarURL(),
          })
          .setTimestamp();

        message.channel.send({ embeds: [embed] }).then((msg) => {
          try {
            message.delete().catch(console.error);
            setTimeout(() => msg.delete().catch(console.error), 5000);
          } catch (err) {
            console.error("Erro ao tentar deletar mensagens:", err);
          }
        });

        const collector = channel.createMessageCollector({
          time: 20000,
        });

        let currentQuestion = 0;
        let correctAnswers = 0;
        let totalQuestions = questions.length;
        let userAnswers = [];
        let answered = false;

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
            userAnswers.push(
              `**Pergunta ${currentQuestion + 1}:** ${m.content} `
            );
            if (userAnswer === questions[currentQuestion].answer) {
              correctAnswers++;
              channel
                .send({ content: `${message.author}`, embeds: [answerCorrect] })
                .then((msg) => {
                  try {
                    setTimeout(() => msg.delete().catch(console.error), 2000);
                  } catch (err) {
                    console.error(
                      "Erro ao tentar deletar mensagem correta:",
                      err
                    );
                  }
                });
            } else {
              channel
                .send({
                  content: `${message.author}`,
                  embeds: [answerIncorrect],
                })
                .then((msg) => {
                  try {
                    setTimeout(() => msg.delete().catch(console.error), 2000);
                  } catch (err) {
                    console.error(
                      "Erro ao tentar deletar mensagem incorreta:",
                      err
                    );
                  }
                });
            }
            currentQuestion++;
            askQuestion();
          } else {
            channel
              .send({ content: `${message.author}`, embeds: [answerInvalid] })
              .then((msg) => {
                try {
                  setTimeout(() => msg.delete().catch(console.error), 2000);
                } catch (err) {
                  console.error(
                    "Erro ao tentar deletar mensagem inválida:",
                    err
                  );
                }
              });
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

          const sendToChannel = (channelId, content) => {
            const resultChannel = client.channels.cache.get(channelId);
            if (resultChannel) {
              resultChannel.send(content).catch(console.error);
            } else {
              console.error(`Canal desconhecido ou inacessível: ${channelId}`);
            }
          };

          if (userAnswers.length > 0) {
            sendToChannel(resultadowlstaff, {
              embeds: [
                new MessageEmbed()
                  .setTitle(`Resultado da Whitelist de ${message.author.tag}`)
                  .setDescription(userAnswers.join("\n"))
                  .setColor("#2b961f")
                  .setFooter({
                    text: "DeGabrielDEV ™ - Avisos",
                    iconURL: message.author.displayAvatarURL(),
                  }).setTimestamp,
              ],
            });
          } else {
            console.error("Nenhuma resposta foi coletada para a whitelist.");
          }

          const percentageCorrect = (correctAnswers / totalQuestions) * 100;

          if (percentageCorrect >= 80) {
            const embedAprovado = new MessageEmbed()
              .setTitle(
                "<a:Correto:1214051675166478377>** Whitelist Aprovada **"
              )
              .setDescription(
                `**Usuário:** ${message.author}\n` + // Nome do usuário
                  `**Personagem:** @nomeDoPersonagem\n` + // Nome do personagem substitua "nomeDoPersonagem" pelo nome apropriado
                  `**Resultado:** ${percentageCorrect.toFixed(2)}%\n` + // Resultado com a porcentagem
                  `**Pontuação:** ${correctAnswers} de ${totalQuestions} acertos` // Pontuação total
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
                `Infelizmente, ${
                  message.author
                } você não atingiu a pontuação mínima. Você acertou ${correctAnswers} de ${totalQuestions} (${percentageCorrect.toFixed(
                  2
                )}%).`
              )
              .setThumbnail(message.guild.iconURL())
              .setColor("RED")
              .setFooter({
                text: "DeGabrielDEV ™ - Avisos",
                iconURL: message.author.displayAvatarURL(),
              })
              .setTimestamp();

            sendToChannel(resultadowl_errados, { embeds: [embedReprovado] });
            message.member.roles.add(nonwhitelistcargo).catch(console.error);
          }

          setTimeout(() => channel.delete().catch(console.error), 5000);
        };
      })
      .catch((err) => {
        console.error("Erro ao criar o canal:", err);
      });
  },
};
