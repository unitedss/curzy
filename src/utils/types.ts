/**
 * Options to be passed when creating the REST instance
 */
export interface RESTOptions {
  /**
   * The base api path, without version
   *
   * @defaultValue `'https://discord.com/api'`
   */
  api: string

  /**
   * The version of the API to use
   *
   * @defaultValue `10`
   */
  version: number
}

export interface CreateApplicationOptions {
  name: string
  description: string
  tags: string[]
  owners: string[]
}
