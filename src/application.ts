import { getTrackBase64, post } from './utils'

export class Application {
    #token: string = process.env.SYSTEM_TOKEN as string
    protected password: string = process.env.SYSTEM_PASSWORD as string
    private headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': this.#token,
        'X-Track': getTrackBase64()
    }

    protected async getId(name: string) {
        const app = await post(`/applications`, {
            headers: this.headers,
            body: JSON.stringify({
                name
            })
        })
        return app.id as string
    }

    protected async getTicket(id: string, password: string = this.password) {
        const reset = await post(`/applications/${id}/bot/reset`, {
            headers: this.headers
        })
        return reset.mfa.ticket as string
    }

    protected async getCookie(ticket: string, password: string = this.password) {
        const cookie = await post(`/mfa/finish`, {
            headers: this.headers,
            body: JSON.stringify({
                'data': password,
                'mfa_type': 'password',
                'ticket': ticket
            })
        })
        return cookie.token as string
    }

    protected async getToken(id: string, cookie: string) {
        const response = await post(`/applications/${id}/bot/reset`, {
            headers: {
                ...this.headers,
                'x-discord-mfa-authorization': cookie
            }
        })
        return response.token as string;
    }
}
