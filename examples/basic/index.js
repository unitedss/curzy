import 'dotenv/config'
import {Bot} from '@uniteds/curzy'

const app = new Bot({name: 'My Bot'})
const bot = await app.create()
console.log(bot.token)
