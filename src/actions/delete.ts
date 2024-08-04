import Application from '../Application'
import { post } from '../utils'

export class Delete extends Application {
  public async request<T>(id: T): Promise<boolean> {
    const cookie = await this.getCookie(ticket)
    await post(`/applications/${id}/delete`, {
      headers: {
        ...this.headers,
        'x-discord-mfa-authorization': this.cookie
      }
    })
    return true
  }
}
