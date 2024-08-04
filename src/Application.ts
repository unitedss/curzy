import { getTrackBase64 } from './utils'

interface Options {
  headers: Record<string, string>
  cookie: string
}

export default abstract class Application {
  #token: string = process.env.SYSTEM_TOKEN as string
  protected password: string = process.env.SYSTEM_PASSWORD as string
  protected headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: this.#token,
    'X-Track': getTrackBase64()
  }

  public abstract request<T>(options: T): Promise<unknown>
}
