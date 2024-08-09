import { getTrackBase64, post } from './utils'

export default abstract class Application {
  #token: string = process.env.SYSTEM_TOKEN as string
  protected password: string = process.env.SYSTEM_PASSWORD as string
  protected headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: this.#token,
    'X-Track': getTrackBase64()
  }

  public async getTicket(id: string) {
    const reset = await post(`/applications/${id}/bot/reset`, {
      headers: this.headers
    })
    return reset.mfa.ticket as string
  }

  public async getCookie(ticket: string) {
    const cookie = await post('/mfa/finish', {
      headers: this.headers,
      body: JSON.stringify({
        data: this.password,
        mfa_type: 'password',
        ticket: ticket
      })
    })
    return cookie.token as string
  }

  public abstract request<T>(options: T): Promise<unknown>
}
