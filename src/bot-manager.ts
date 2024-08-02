import { Application } from './application'

interface Options {
  name: string
  description?: string
  tags?: string[]
  owners?: string[]
  avatar?: Buffer
}

export class Bot extends Application {
  private name!: string
  private description?: string
  private tags?: string[]
  private owners?: string[]
  private avatar?: Buffer

  constructor(options: Options) {
    super()
    this.validate(options)
  }

  private validate(options: Options) {
    if (typeof options !== 'object')
      throw TypeError('Options should be a type of Object.')
    if (!options.name)
      throw Error('You must provide the name of the application.')
    if (!Array.isArray(options.tags))
      throw TypeError('Tag(s) should be a type of Array<String>')
    if (!Array.isArray(options.owners))
      throw TypeError('Owner(s) should be a type of Array<String>')
    if (!Buffer.isBuffer(options.avatar))
      throw TypeError('Avatar should be a type of Buffer.')
    this.name = options.name
    this.description = options.description
    this.tags = options.tags
    this.owners = options.owners
  }

  async get(id: string) {
    const application = await this.getApplication(id)
    return application
  }

  async create() {
    const application = await this.createApplication(this.name)
    return application
  }

  async delete(id: string, cookie: string) {
    const application = await this.deleteApplication(id, cookie)
    return application
  }
}
