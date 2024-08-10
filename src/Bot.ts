import {Create, Delete} from './actions/index'

interface Options {
  name: string
  description?: string
  tags?: string[]
  owners?: string[]
  avatar?: Buffer
}

export class Bot {
  private name!: string
  private description?: string
  private tags?: string[]
  private owners?: string[]
  private avatar?: Buffer

  constructor(options: Options) {
    this.validate(options)

    this.name = options.name
    this.description = options.description
    this.tags = options.tags
    this.owners = options.owners
    this.avatar = options.avatar
  }

  private validate(options: Options) {
    if (typeof options !== 'object')
      throw TypeError('Options should be a type of Object.')
    if (!options.name) throw Error('You must provide the name of the application.')
    if (Reflect.has(options, 'tags') && !Array.isArray(options.tags))
      throw TypeError('Tag(s) should be a type of Array<String>')
    if (Reflect.has(options, 'owners') && !Array.isArray(options.owners))
      throw TypeError('Owner(s) should be a type of Array<String>')
    if (Reflect.has(options, 'avatar') && !Buffer.isBuffer(options.avatar))
      throw TypeError('Avatar should be a type of Buffer.')
  }

  public create = async () => new Create().request<string>(this.name)
  public delete = async (id: string) => new Delete().request<string>(id)
}
