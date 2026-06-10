<div align="center">
  <br />
  <a href="https://discord.js.org">
    <img src="https://i.imgur.com/EXXpFP5.png" width="400" alt="Discord.js" />
  </a>
  <br /><br />

  <p>
    <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/degabrielofi/SaoPauloRP?color=5865F2&style=for-the-badge" />
    <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/degabrielofi/SaoPauloRP?color=5865F2&style=for-the-badge" />
    <img alt="Repository Size" src="https://img.shields.io/github/repo-size/degabrielofi/SaoPauloRP?color=5865F2&style=for-the-badge" />
    <img alt="License" src="https://img.shields.io/badge/licença-MIT-5865F2?style=for-the-badge" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord.js" />
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  </p>
</div>

---

## 📋 Sobre o Projeto

**SaoPauloRP** é um bot para Discord desenvolvido para automatizar completamente o processo de **Whitelist em servidores de GTA RP**. O sistema conduz os candidatos por uma entrevista automática via bot, avalia as respostas e atribui cargos com base no resultado — tudo sem intervenção manual da staff.

Este foi um dos primeiros projetos sérios de Gabriel Pereira como desenvolvedor, criado para resolver um problema real de comunidades brasileiras de GTA RP no Discord: o processo manual de whitelist era lento, inconsistente e sobrecarregava a equipe de moderação.

### ✨ Funcionalidades

- Entrevista automatizada via canal privado no Discord
- Avaliação automática de respostas certas e erradas
- Criação dinâmica de canais de whitelist por usuário
- Atribuição automática de cargos (aprovado / reprovado)
- Envio de resultados a canais específicos da staff
- Suporte a prefixo de comando configurável

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Node.js](https://nodejs.org/en/) | 14 \| 16 \| 18 | Runtime JavaScript |
| [Discord.js](https://discord.js.org/) | ^13.15.0 | Integração com API do Discord |
| [dotenv](https://github.com/motdotla/dotenv) | ^16.4.5 | Gerenciamento de variáveis de ambiente |
| [moment.js](https://momentjs.com/) | ^2.29.1 | Manipulação de datas |
| [nodemon](https://nodemon.io/) | ^3.1.4 | Reinicialização automática em dev |

---

## ⚙️ Configuração

### Pré-requisitos

Certifique-se de ter instalado:

- [git](https://git-scm.com/) v2.13 ou superior
- [Node.js](https://nodejs.org/en/) `14 || 16 || 18`
- [npm](https://www.npmjs.com/) v6 ou superior

```shell
git --version
node --version
npm --version
```

### Instalação

**1. Clonar o repositório:**
```bash
git clone https://github.com/degabrielofi/SaoPauloRP
cd SaoPauloRP
```

**2. Instalar as dependências:**
```bash
npm install
```

**3. Configurar o arquivo `data/config.json`:**
```json
{
  "prefix": "!",
  "token": "SEU_TOKEN_AQUI",

  "channelWl": "ID_DO_CANAL_WHITELIST",

  "serverId": "ID_DO_SERVIDOR",
  "wlCategoryId": "ID_CATEGORIA_WHITELIST",

  "wlStaffResult": "ID_CANAL_RESULTADO_STAFF",
  "wlCorrectResults": "ID_CANAL_ACERTOS",
  "wlIncorrectResults": "ID_CANAL_ERROS",

  "whitelistRole": "ID_CARGO_WHITELIST",
  "nonWhitelistRole": "ID_CARGO_NON_WHITELIST"
}
```

**4. Criar o token do bot:**
- Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
- Crie uma nova aplicação e configure o bot
- Copie o token e insira no campo `"token"` do `config.json`

**5. Iniciar o bot:**
```bash
node .
```

---

## 🔒 Segurança — Token do Bot

O token é uma credencial sensível. Nunca o compartilhe publicamente. Caso seja exposto, acesse o [Discord Developer Portal](https://discord.com/developers/applications) e gere um novo token imediatamente, atualizando o `config.json`.

---

## 📖 Uso

Após iniciar o bot e configurar o servidor, o fluxo de whitelist funciona assim:

1. O jogador digita `!whitelist` no canal configurado
2. O bot cria um canal privado e inicia a entrevista automática
3. Ao final, o bot avalia as respostas e atribui o cargo correspondente
4. Os resultados são enviados aos canais da staff para monitoramento

---

## 🆘 Suporte

- [Abrir uma Issue no GitHub](https://github.com/degabrielofi/SaoPauloRP/issues)
- [Servidor no Discord](https://discord.com/invite/fTWzcm75VD)

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---

<div align="center">
  Feito com ❤️ por <a href="https://github.com/degabrielofi">Gabriel Pereira</a>
</div>
