const { Telegraf } = require('telegraf')
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome to Weather Bot!\nI can tell you what the weather is in your location.\nSend me your location'))
bot.on('message', async (ctx) => {
    if (ctx.message.location) {
        console.log(ctx.message.location);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=b9989b7abe745485b3ea8d352fadc290`;
        const response = await axios.get(url);
        console.log(response);
        ctx.reply(`The weather in ${response.data.name}: ${Math.round(response.data.main.temp - 274)} C`)

    }
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))