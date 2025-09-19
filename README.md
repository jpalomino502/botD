# 💖 Discord Love Bot

Proyecto original: [Capitanl0pez](https://github.com/Capitanl0pez)
Con apoyo de: [jpalomino502](https://github.com/jpalomino502)

Un **bot de Discord** que comparte frases de amor aleatorias cuando se utiliza el comando:

```
ʕっ•ᴥ•ʔっfrase 💝
```

Preparado para **funcionar 24/7 en Render**, usando un servidor HTTP para mantenerse activo.

---

## 📦 Requisitos

* Node.js ≥ 18
* npm
* Una cuenta de Discord y un bot creado
* [Render](https://render.com/) para hosting gratuito (opcional)
* [UptimeRobot](https://uptimerobot.com/) para mantenerlo activo (opcional)

---

## ⚙️ Configuración

1. Clona el repositorio:

```bash
git clone https://github.com/Capitanl0pez/botD.git
cd discord-love-bot
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz con tu **token de Discord**:

```env
DISCORD_TOKEN=TU_TOKEN_DE_DISCORD
```

4. Asegúrate de que tu `package.json` tenga un script de inicio:

```json
"scripts": {
  "start": "node server.js"
}
```

---

## 🚀 Uso local

Ejecuta el bot en tu máquina:

```bash
npm start
```

Responderá al comando:

```
ʕっ•ᴥ•ʔっfrase 💝
```

---

## 🌐 Uso en Render

1. Crea un **Web Service** en Render.
2. Conecta tu repositorio.
3. Configura:

   * **Environment:** Node
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
4. Render asignará automáticamente un puerto, que tu bot ya usa con `process.env.PORT`.

---

## ⏱ Mantener activo 24/7

Render detiene servicios gratuitos después de **15 minutos de inactividad**. Para mantenerlo activo:

* Usa [UptimeRobot](https://uptimerobot.com/) u otro servicio para hacer **ping** a tu URL de Render cada 5 minutos.
* Ejemplo de ping: `https://tu-app-en-render.onrender.com/`

---

## 💬 Funcionamiento del bot

* Escucha mensajes en los canales donde esté presente.
* Si un mensaje inicia con `ʕっ•ᴥ•ʔっfrase` y contiene `💝`, envía una **frase aleatoria** de amor.
* Las frases se ciclan sin repetirse hasta que se agoten, luego se reinicia la lista.

---

## 📌 Estructura del proyecto

```
discord-love-bot/
│
├─ server.js        # Código principal del bot + servidor HTTP
├─ package.json     # Dependencias y scripts
├─ package-lock.json
└─ .env             # Token de Discord
```

---

## ⚠️ Notas importantes

* Mantén tu `DISCORD_TOKEN` **privado**.
* Puedes agregar o modificar las frases dentro del array `frases` en `server.js`.
* El servidor HTTP solo mantiene vivo el bot en Render, no afecta su funcionalidad en Discord.

---

## ❤️ Autor

Proyecto original: [Capitanl0pez](https://github.com/Capitanl0pez)
Con apoyo de: [jpalomino502](https://github.com/jpalomino502)
