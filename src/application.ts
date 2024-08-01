import { Network } from './network'

export class Application {
    private rest = new Network
    constructor() {
        this.rest = new Network()
    }
    
    protected async createApplication(name: string) {
        const application = await this.rest.createApplication(name)
        const ticket = await this.rest.getTicket(application.id)
        const cookie = await this.rest.getCookie(ticket)
        const token = await this.rest.getToken(application.id, cookie)

        return {
            ...application,
            token
        }
    }

    protected async getApplication(id: string) {
        if (typeof id !== 'string' || !id) throw Error('ID not valid!')
        const response = await this.rest.getApplication(id)
        return response
    }
    
    protected async deleteApplication(id: string) {
        if (typeof id !== 'string' || !id) throw Error('ID not valid!')
        const response = await this.rest.deleteApplication(id);
        return response
    }
}