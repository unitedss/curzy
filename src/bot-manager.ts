import { Application } from './application'

export class Bot extends Application {
    public name!: string;
    constructor(options: BotOptions) {
        super()
        this.validate(options)
    }

    private validate(options: BotOptions) {
        if (typeof options !== 'object') throw TypeError('Options should be a type of Object.')
        if (!options.name) throw Error('Por favor, especifica el nombre del bot!')
        this.name = options.name
    }
    
    public async start(token: string) {
        // await this.login(token as string)
    }
}