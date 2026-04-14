import { HTTPClient } from '../core/http-client.js'
import {
  BNVDResponse,
  SearchParams,
  Vulnerability,
  PaginationParams,
  RecentSearchParams,
} from '../types/index.js'

export class VulnerabilitiesDomain extends HTTPClient {
  // Endpoint V1 Padrão
  async list(params?: SearchParams) {
    return this.get<BNVDResponse<Vulnerability[]>>('/api/v1/vulnerabilities', params)
  }

  async getById(cveId: string, includePt: boolean = true) {
    return this.get<BNVDResponse<Vulnerability>>(`/api/v1/vulnerabilities/${cveId}`, {
      include_pt: includePt,
    })
  }

  async getRecent(params?: RecentSearchParams) {
    return this.get<BNVDResponse<Vulnerability[]>>('/api/v1/search/recent', params)
  }

  async getTop5Recent(includePt: boolean = true) {
    return this.get<BNVDResponse<Vulnerability[]>>('/api/v1/search/recent/5', {
      include_pt: includePt,
    })
  }

  async searchByYear(year: number, params?: SearchParams) {
    return this.get<BNVDResponse<Vulnerability[]>>(`/api/v1/search/year/${year}`, params)
  }

  async searchBySeverity(severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', params?: SearchParams) {
    return this.get<BNVDResponse<Vulnerability[]>>(`/api/v1/search/severity/${severity}`, params)
  }

  async searchByVendor(vendor: string, params?: SearchParams) {
    return this.get<BNVDResponse<Vulnerability[]>>(`/api/v1/search/vendor/${vendor}`, params)
  }

  // === Endpoints Públicos (KEV) descobertos no código fonte deles ===

  async getPublicRecentCVEs(params?: PaginationParams & { days?: number; include_pt?: boolean }) {
    return this.get<any>('/api/cves/recent', params)
  }

  async getPublicKEVCVEs() {
    return this.get<any>('/api/cves/kev') // KEV: Known Exploited Vulnerabilities catalog (CISA)
  }
}
