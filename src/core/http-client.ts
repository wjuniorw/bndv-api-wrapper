import { BNVDConfig } from '../types/index.js'

export class HTTPClient {
  protected config: Required<BNVDConfig>

  constructor(config: BNVDConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://bnvd.org',
      timeout: config.timeout || 30000,
      headers: {
        Accept: 'application/json',
        ...(config.headers || {}),
      },
    }
  }

  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, this.config.baseUrl)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.config.headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`BNVD API Error: ${response.status} ${response.statusText}`)
      }

      return (await response.json()) as Promise<T>
    } catch (error: unknown) {
      clearTimeout(timeoutId)
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout após ${this.config.timeout}ms`)
        }
        throw error
      }
      throw new Error('Unknown HTTP error occurred')
    }
  }
}
