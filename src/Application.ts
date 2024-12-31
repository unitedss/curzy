import { REST } from './REST'
import type { CreateApplicationOptions } from './utils/types'
const DEFAULT_VERSION = 10

export class Application {
  protected rest: REST
  #token: string | null = null
  #password: string | null = null

  /**
   * Manage an discord bot application.
   * @param version - The version of the API to use
   */
  constructor(protected version: number = DEFAULT_VERSION) {
    this.version = version
    this.rest = new REST({
      api: 'https://discord.com/api',
      version: this.version,
    })
  }

  /**
   * Return a specific application.
   * @param id - The id of the application.
   */
  public async get(id?: string) {
    return this.rest.get(id)
  }

  /**
   * Create a new application.
   * @param options - The options to create the application.
   */
  public async create(options: Partial<CreateApplicationOptions>) {
    return this.rest.create(options)
  }

  /**
   * Delete a specific application.
   * @param id - The id of the application.
   */
  public async delete(id: string) {
    return this.rest.delete(id)
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
    this.rest.setCredentials(this.#token, this.#password)
    return this
  }
}
