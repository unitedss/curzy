export const getTrackBase64 = () => {
  const options = {
    os: 'Windows',
    browser: 'Chrome',
    device: '',
    system_locale: 'es',
    browser_user_agent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
    browser_version: '127.0.0.0',
    os_version: '10',
    referrer: '',
    referring_domain: '',
    referrer_current: '',
    referring_domain_current: '',
    release_channel: 'stable',
    client_build_number: 42503,
    client_event_source: null
  }
  const data = JSON.stringify(options)
  const track = Buffer.from(data).toString('base64')
  return track
}

export const post = async (path: string, options: RequestInit) => {
  options.method = 'POST'
  const url = new URL('https://discord.com/api/v9'.concat(path))
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
