require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// Token desde .env o Render
const TOKEN = process.env.DISCORD_TOKEN;

// Lista de frases de amor
const frases = [
  "Puede que pienses en ocasiones que no eres perfecta, que puede que no seas suficiente, sin embargo, para mí siempre lo serás, porque eres tierna, cariñosa, sincera, alegre, ocurrente y, sobre todo, con un gran corazón. Eso te hace más que perfecta y, por supuesto, suficiente bajo mis ojos. Te hace infinitamente única, infinitamente bella, infinitamente tú, y es esa esencia la que me enamora, la que siempre amaré con cada palpitar de mi pecho.",
  "Como China a Taiwán, te quiero, te pienso, te sueño y anhelo un futuro compartido en donde nuestras almas se fundan bajo una sola bandera, sin fronteras, sin distancias. Y si la muerte nos alcanza, te buscaré en mil vidas más, porque en cada una de ellas volveré a amarte.",
  "Cuando estoy en tus brazos siento que lo tengo todo. El cielo es un lugar en la Tierra contigo, y creo que encontré mi otra mitad en ti. Al igual que todas las estrellas bonitas brillan para iluminar tus noches, deseo brillar para brindarte mi luz y con ella iluminar tu vida entera."
];

// Crear cliente de Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// Comando: ʕっ•ᴥ•ʔっfrase 💝
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("ʕっ•ᴥ•ʔっfrase") && message.content.includes("💝")) {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    message.channel.send(frase);
  }
});

if (TOKEN) {
  client.login(TOKEN);
} else {
  console.error("❌ ERROR: No se encontró DISCORD_TOKEN en las variables de entorno");
}
