const DISCORD_API = 'https://discord.com/api/v9'
const SYSTEM_TOKEN = process.env.SYSTEM_TOKEN as string

export const post = async (path: string, method: string, headers?: Record<string, string>, body: unknown = {}) => {
    const response = await fetch(DISCORD_API + path, {
        method,
        headers: {
            'Authorization': SYSTEM_TOKEN,
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    })
    return await response.json()
}