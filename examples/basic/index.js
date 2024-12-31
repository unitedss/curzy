import 'dotenv/config'
import { Application } from '@uniteds/curzy'

const [token, password] = process.env
const app = new Application().setCredentials(token, password)
const bot = await app.create({ name: 'My Bot' })

console.log(bot.token)
