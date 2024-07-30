export const post = async (path: string, options: RequestInit) => {
    options.method = 'POST'
    const url = new URL('https://discord.com/api/v9' + path)
    const response = await fetch(url, options)
    const data = await response.json()
    if (!response.ok) throw new Error (`Error: ${response.status} ${data.error.message}`)
    
    return data
}