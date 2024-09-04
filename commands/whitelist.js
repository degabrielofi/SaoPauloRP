const { Client, Intents, MessageEmbed } = require("discord.js");
const mysql = require("mysql");
const {
  ipservidor,
  portaservidor,
  conexaodb,
  userdb,
  senhadb,
  db,
  canalwl,
  idcategoriawl,
  idservidor,
  resultadowlstaff,
  resultadowlacertos,
  resultadowl_errados,
  margemdeacertos,
  whitelistcargo,
  nonwhitelistcargo,
} = require("../config.json"); // Usando suas configurações
const colors = require("colors"); // Dependência para personalizar a saída no console

// Criando a conexão com o banco de dados MySQL
const connection = mysql.createPool({
  connectionLimit: 10,
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db,
});

module.exports = async (client, message, args) => {
  if (message.channel.id !== canalwl) {
    const embed = new MessageEmbed()
      .setTitle("Canal Incorreto")
      .setDescription(
        `Você não pode usar este comando neste chat. Utilize: <#${canalwl}>`
      )
      .setColor("#ff0000")
      .setFooter("Leia com atenção!");
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
        .setFooter("Dragon - Avisos");

      message.channel.send({ embeds: [embed] });

      // Coletor de mensagens para a Whitelist
      const collector = channel.createMessageCollector({
        time: 60000, // 1 minuto para responder a cada pergunta
      });

      let questions = [
        "1. Roleplay significa...? \n\n1️⃣ Mata-Mata\n\n2️⃣ Role com os Amigos\n\n3️⃣ Simular a vida real\n\n4️⃣ Simular a Fantasia",
        "2. O que é RDM? \n\n1️⃣ RDM é usada para quem abusou de bug.\n\n2️⃣ RDM é atropelar alguém sem motivos.\n\n3️⃣ RDM é matar alguém sem motivos.\n\n4️⃣ RDM é sacar uma arma e ameaçar alguém.",
        "3. O que é considerado anti RP? \n\n1️⃣ Vender drogas em área safe\n\n2️⃣ É você quebrar as regras do servidor.\n\n3️⃣ É você cometer infrações de trânsito.\n\n4️⃣ É você fazer rp de bandido.",
        // Adicione mais perguntas conforme necessário
      ];

      let currentQuestion = 0;
      let correctAnswers = 0;
      let totalQuestions = questions.length;

      // Função para fazer perguntas
      const askQuestion = () => {
        if (currentQuestion < totalQuestions) {
          channel.send(`**Pergunta:** ${questions[currentQuestion]}`);
          currentQuestion++;
        } else {
          // Se todas as perguntas forem respondidas
          endWhitelist(channel, correctAnswers);
        }
      };

      collector.on("collect", (m) => {
        if (m.author.bot) return;
        // Verificação da resposta correta
        if (m.content === "3") {
          // Exemplo de resposta correta sendo a opção '3'
          correctAnswers++;
          channel.send("Resposta correta!");
        } else {
          channel.send("Resposta incorreta.");
        }
        askQuestion(); // Faz a próxima pergunta
      });

      collector.on("end", () => {
        // Quando o coletor parar de coletar (por tempo ou conclusão)
        endWhitelist(channel, correctAnswers);
      });

      // Faz a primeira pergunta
      askQuestion();

      // Função para finalizar a whitelist
      const endWhitelist = (channel, correctAnswers) => {
        if (correctAnswers >= margemdeacertos) {
          // Usuário aprovado
          const embedAprovado = new MessageEmbed()
            .setTitle("Whitelist Aprovada!")
            .setDescription(
              `Parabéns! Você foi aprovado com ${correctAnswers} de ${totalQuestions} acertos!`
            )
            .setColor("#2b961f")
            .setFooter("Dragon - Avisos");

          channel.send({ embeds: [embedAprovado] });
          message.member.roles.add(whitelistcargo).catch(console.error); // Adiciona cargo ao usuário
        } else {
          // Usuário reprovado
          const embedReprovado = new MessageEmbed()
            .setTitle("Whitelist Reprovada!")
            .setDescription(
              `Infelizmente, você reprovou com ${correctAnswers} de ${totalQuestions} acertos. Mas você pode refazer a whitelist!`
            )
            .setColor("#ff0000")
            .setFooter("Dragon - Avisos");

          channel.send({ embeds: [embedReprovado] });
          message.member.roles.add(nonwhitelistcargo).catch(console.error); // Adiciona cargo de não-whitelist ao usuário
        }
        setTimeout(() => {
          channel.delete().catch(console.error); // Deleta o canal após um tempo
        }, 10000);
      };
    })
    .catch(console.error);
};
