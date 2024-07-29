import { post } from './utils'

export class Application {
    private password: string = process.env.SYSTEM_PASSWORD as string

    public async create(name: string) {
        const id = await this.getId(name)
        const ticket = await this.getTicket(id, this.password)
        const cookie = await this.getCookie(ticket, this.password)
        const token = await this.getToken(id, cookie)
        return token
    }

    private async getId(name: string) {
        const app = await post(`/applications`, 'POST', { name })
        return app.id as string
    }

    private async getTicket(id: string, password: string = this.password) {
        const reset = await post(`/applications/${id}/bot/reset`, 'POST')
        return reset.mfa.ticket as string
    }

    private async getCookie(ticket: string, password: string = this.password) {
        const body = {
            'data': password,
            'mfa_type': 'password',
            'ticket': ticket
        }
        const cookie = await post(`/mfa/finish`, 'POST', body)
        return cookie.token as string
    }

    private async getToken(id: string, cookie: string) {
        const headers = {
            'x-discord-mfa-authorization': cookie
        }
        const response = await post(`/applications/${id}/bot/reset`, 'POST', headers)
        return response.token;
    }
}
