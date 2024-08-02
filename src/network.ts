import type { StringLiteral } from 'typescript'
import { getTrackBase64, post } from './utils'

export class Network {
  #token: string = process.env.SYSTEM_TOKEN as string
  #password: string = process.env.SYSTEM_PASSWORD as string
  private headers: HeadersInit

  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: this.#token,
      'X-Track': getTrackBase64()
    }
  }

  async getApplication(id: string) {}

  async deleteApplication(id: string, cookie: string) {
    await post(`/applications/${id}/delete`, {
      headers: {
        ...this.headers,
        'x-discord-mfa-authorization': cookie
      }
    })
  }

  async createApplication(name: string) {
    const app = await post('/applications', {
      headers: this.headers,
      body: JSON.stringify({
        name
      })
    })
    return app
  }

  async getTicket(id: string) {
    const reset = await post(`/applications/${id}/bot/reset`, {
      headers: this.headers
    })
    return reset.mfa.ticket as string
  }

  async getCookie(ticket: string) {
    const cookie = await post('/mfa/finish', {
      headers: this.headers,
      body: JSON.stringify({
        data: this.#password,
        mfa_type: 'password',
        ticket: ticket
      })
    })
    return cookie.token as string
  }

  async getToken(id: string, cookie: string) {
    const response = await post(`/applications/${id}/bot/reset`, {
      headers: {
        ...this.headers,
        'x-discord-mfa-authorization': cookie
      }
    })
    return response.token as string
  }
}
