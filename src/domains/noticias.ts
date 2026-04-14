import { HTTPClient } from '../core/http-client.js'
import { BNVDResponse, PaginationParams } from '../types/index.js'

export class NoticiasDomain extends HTTPClient {
  async list(params?: PaginationParams) {
    return this.get<BNVDResponse<any>>('/api/v1/noticias', params)
  }

  async getRecent(limit: number = 5) {
    return this.get<BNVDResponse<any>>('/api/v1/noticias/recentes', { limit })
  }

  async getBySlug(slug: string) {
    return this.get<BNVDResponse<any>>(`/api/v1/noticias/${slug}`)
  }
}
