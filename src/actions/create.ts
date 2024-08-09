import Application from '../Application'
import { post } from '../utils'

export class Create extends Application {
  public async request<T>(name: T) {
    const application = await this.createApplication(name as string)
    const ticket = await this.getTicket(application.id)
    const cookie = await this.getCookie(ticket)
    const token = await this.getToken(application.id, cookie)

    return {
      ...application,
      token
    }
  }

  private async createApplication(name: string) {
    const app = await post('/applications', {
      headers: this.headers,
      body: JSON.stringify({
        name
      })
    })
    return app
  }

  private async getToken(id: string, cookie: string) {
    const response = await post(`/applications/${id}/bot/reset`, {
      headers: {
        ...this.headers,
        'x-discord-mfa-authorization': cookie
      }
    })
    return response.token as string
  }
}
