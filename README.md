<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://i.imgur.com/EXXpFP5.png" width="400"  /></a>
  </p>
  <br />
  <p>
    <img alt="Github Top Language" src="https://img.shields.io/github/languages/top/degabrielofi/SaoPauloRP?color=blue">
    <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/npm/v/discord.js.svg?maxAge=3600" alt="npm version" /></a>
    <img alt="Github Language Count" src="https://img.shields.io/github/languages/count/degabrielofi/SaoPauloRP?color=blue">
    <img alt="Repository Size" src="https://img.shields.io/github/repo-size/degabrielofi/SaoPauloRP?color=blue">
  </p>
</div>

## 📌 Requisitos do Sistema

- [git](https://git-scm.com/) v2.13 ou superior
- [NodeJS](https://nodejs.org/en) `14 || 16 || 18`
- [npm](https://www.npmjs.com/) v6 ou superior

Todos estes requerimentos devem estar disponíveis no seu `PATH`. Para verificar se tudo está configurado corretamente, execute os comandos abaixo:

```shell
git --version
node --version
npm --version
```

Se você tiver problemas com qualquer um deles, saiba mais sobre o ambiente PATH e como corrigi-lo aqui para [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) ou
[Mac/Linux](https://stackoverflow.com/questions/24306398/how-to-add-mongo-commands-to-path-on-mac-osx/24322978#24322978).

<div align="center">
<img src="https://i.imgur.com/5nDOIb7.png"/>
</div>

# :clipboard: Sobre o Projeto

Este bot foi desenvolvido para automatizar completamente o processo de Whitelist em servidores de **GTA RP** no Discord, tornando a avaliação dos jogadores muito mais prática e precisa. Ele garante que o time de administração economize tempo ao avaliar automaticamente as respostas dos usuários e classificar os resultados, atribuindo cargos automaticamente.

O bot organiza e processa os resultados, enviando-os a canais específicos para que a equipe de administração possa monitorar facilmente quem foi aprovado ou reprovado. Assim, a integração dos novos membros é rápida e eficiente, garantindo um fluxo contínuo e organizado no servidor.

Com este sistema, a gestão do Whitelist torna-se mais simples, confiável e escalável, permitindo que servidores de qualquer tamanho integrem novos jogadores qualificados de forma ágil.

## ⚙️ Configuração

Para que o bot funcione corretamente, você precisa configurar o arquivo `config.json` com as seguintes informações:

```json
{
  "prefix": "!", // Prefixo utilizado para os comandos do bot.
  "token": "SEU_TOKEN_AQUI", // Token de autenticação do bot.

  "channelWl": "ID_DO_CANAL_WHITELIST", // Canal onde os jogadores usam o comando !whitelist.

  "serverId": "ID_DO_SERVIDOR", // ID do servidor onde o bot está rodando.
  "wlCategoryId": "ID_CATEGORIA_WHITELIST", // Categoria onde serão criados os canais para whitelist.

  "wlStaffResult": "ID_CANAL_RESULTADO_STAFF", // Canal onde os resultados serão enviados para a equipe de staff.
  "wlCorrectResults": "ID_CANAL_ACERTOS", // Canal onde os aprovados na whitelist serão mostrados.
  "wlIncorrectResults": "ID_CANAL_ERROS", // Canal onde os reprovados na whitelist serão exibidos.

  "whitelistRole": "ID_CARGO_WHITELIST", // Cargo atribuído aos aprovados.
  "nonWhitelistRole": "ID_CARGO_NON_WHITELIST" // Cargo atribuído aos reprovados.
}
```

### Etapas para Configurar:

1. **Clonar o Repositório:**

   ```bash
   git clone https://github.com/degabrielofi/SaoPauloRP
   cd SaoPauloRP
   ```

2. **Instalar Dependências:**

   ```bash
   npm install i
   ```

3. **Criar o Token do Bot:**

   - Vá até o [Discord Developer Portal](https://discord.com/developers/applications).
   - Crie uma nova aplicação e configure seu bot.
   - Copie o token e insira no campo `"token"` do `config.json`.

4. **Rodar o Projeto:**
   ```bash
   node .
   ```

### 🔒 Atenção com o Token do Bot

O token do bot é uma credencial sensível e deve ser mantido em segredo. Caso o token seja exposto, pessoas mal-intencionadas podem controlar seu bot e realizar ações indesejadas no servidor. Se o token for comprometido, vá ao [Discord Developer Portal](https://discord.com/developers/applications), resete o token e atualize o arquivo `config.json` com o novo token.

## 🚀 Funcionalidades

- Sistema de perguntas para **Whitelist**.
- Respostas certas e erradas são automaticamente atribuídas a canais específicos.
- Criação automática de canal de Whitelist.
- Gerenciamento de cargos para usuários aprovados e reprovados.

## 📋 Exemplos de Uso:

- **Comando para iniciar a Whitelist:**

```bash
!whitelist
```

O usuário receberá as perguntas e será avaliado automaticamente.

- **Resultado após a finalização:**
  Os resultados de acertos e erros serão enviados aos canais configurados no `config.json`, e os cargos serão atribuídos automaticamente.

## :computer: Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/)
- [JavaScript](https://www.javascript.com/)
- [Discord.js](https://discord.js.org/)

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas sobre o projeto, sinta-se à vontade para entrar em contato via:

- [Abrir uma Issue no GitHub](https://github.com/degabrielofi/SaoPauloRP/issues)
- [Meu Discord](https://discord.com/invite/fTWzcm75VD)

## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#" title="defina o titulo do link">
        <img src="https://avatars.githubusercontent.com/u/92073289?v=4" width="100px;" alt="Foto do degabrielofi no GitHub"/><br>
        <sub>
          <b>Gabriel Silva</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

#

<div align="center">
Feito com ❤️ por DeGabrielDEV.
</div>
