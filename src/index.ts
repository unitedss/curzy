import 'dotenv/config'
import { Client, Events, Message } from 'discord.js'
import { Bot } from './bot-manager'
const client: Client = new Client({ intents: [3276799] })
const prefix = '!'


client.on(Events.ClientReady, () => {
    console.log(`Logged in as: ${client.user?.tag}`)
})

client.on(Events.MessageCreate, async (message: Message) => {
    if(message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift()?.toLowerCase();
    
    if(command === 'create-bot') {
        const name = args[0];
        if(!name) return message.reply({ content: 'Pon un nombre para el bot.' });
        const app = new Bot({ name })
        const token = await app.create()

        message.reply({ content: `Se ha creado el bot: **${name}**` })
        message.author.send({ content: `Bot Token: ${token}`})
    }
})

client.login(process.env.DISCORD_TOKEN)