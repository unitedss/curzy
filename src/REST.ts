import { Auth } from './Auth'
import { DEFAULT_HEADERS, DEFAULT_REST_OPTIONS } from './utils/constants'
import type { CreateApplicationOptions, RESTOptions } from './utils/types'
import { get, post } from './utils/utils'

export class REST {
  #token: string | null = null
  #password: string | null = null
  public readonly options: RESTOptions
  private auth: Auth

  constructor(options: Partial<RESTOptions> = {}) {
    this.options = { ...DEFAULT_REST_OPTIONS, ...options }
    this.auth = new Auth(this.options)
  }

  public async get(id?: string) {
    const url = new URL(
      `${this.options.api}/v${this.options.version}/applications${id ? `/${id}` : ''}`
    )
    return await get(url, this.headers)
  }

  public async delete(id: string) {
    const url = new URL(
      `${this.options.api}/v${this.options.version}/applications/${id}/delete`
    )
    const cookie = await this.auth.getAuthorization(id)
    return await post(url, {
      headers: {
        ...this.headers,
        'x-discord-mfa-authorization': cookie,
      },
    })
  }

  public async create(options: Partial<CreateApplicationOptions>) {
    const url = new URL(`${this.options.api}/v${this.options.version}/applications`)
    const application = await post(url, {
      headers: this.headers,
      body: JSON.stringify(options),
    })
    const cookie = await this.auth.getAuthorization(application.id)
    const bot = await post(`${url.toString()}/${application.id}/bot/reset`, {
      headers: {
        ...this.headers,
        'x-discord-mfa-authorization': cookie,
      },
    })
    return { ...application, token: bot.token }
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
    this.auth.setCredentials(this.#token, this.#password)
    return this
  }

  public get headers(): Record<string, string> {
    return { ...DEFAULT_HEADERS, Authorization: this.#token! }
  }
}
