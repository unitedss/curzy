// export { Bot } from './bot-manager'
import { Bot } from './Bot'

const app = new Bot({
  name: 'kjasnjnds'
})

const bot = await app.create()
console.log(bot)
