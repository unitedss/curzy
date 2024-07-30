import { Application } from './application'

export class Bot extends Application {
    private name!: string

    constructor(options: BotOptions) {
        super()
        this.validate(options)
    }
    
    private validate(options: BotOptions) {
        if (typeof options !== 'object') throw TypeError('Options should be a type of Object.')
        if (!options.name) throw Error('Por favor, especifica el nombre del bot!')
        this.name = options.name
    }

    public async create() {
        const id = await this.getId(this.name)
        const ticket = await this.getTicket(id, this.password)
        const cookie = await this.getCookie(ticket, this.password)
        const token = await this.getToken(id, cookie)
        return token
    }
}