import { DEFAULT_HEADERS } from './utils/constants'
import type { RESTOptions } from './utils/types'
import { post } from './utils/utils'

export class Auth {
  #token: string | null = null
  #password: string | null = null
  public readonly options: RESTOptions

  constructor(options: RESTOptions) {
    this.options = options
  }

  public async getAuthorization(id: string) {
    const ticket = await this._getTicket(id)
    const cookie = await this._getCookie(ticket)
    return cookie
  }

  private async _getTicket(id: string) {
    const url = new URL(
      `${this.options.api}/v${this.options.version}/applications/${id}/bot/reset`
    )
    const reset = await post(url, this.headers)
    return reset.mfa.ticket
  }

  private async _getCookie(ticket: string) {
    const url = new URL(`${this.options.api}/v${this.options.version}/mfa/finish`)
    const cookie = await post(url, {
      body: JSON.stringify({
        data: this.#password,
        mfa_type: 'password',
        ticket: ticket,
      }),
    })
    return cookie.token
  }

  /**
   * Sets the authorization token that should be used for requests
   *
   * @param token - The authorization token to use
   * @param password - The authorization password to use
   */
  setCredentials(token: string, password: string) {
    this.#token = token
    this.#password = password
    return this
  }

  public get headers(): Record<string, string> {
    return { ...DEFAULT_HEADERS, Authorization: this.#token! }
  }
}
