import { getTrackBase64 } from './utils'

export const DEFAULT_REST_OPTIONS = {
  api: 'https://discord.com/api',
  version: 10,
  password: null,
}

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'X-Track': getTrackBase64(),
}
