export interface BNVDConfig {
  baseUrl?: string
  timeout?: number
  headers?: Record<string, string>
}

export interface PaginationParams {
  page?: number
  per_page?: number
}

export interface SearchParams extends PaginationParams {
  year?: number
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  vendor?: string
  include_pt?: boolean
}

export interface RecentSearchParams extends PaginationParams {
  days?: number
  include_pt?: boolean
}

// --- DTOs das Vulnerabilidades ---

export interface CVEDescription {
  lang: string
  value: string
  value_pt?: string
}

export interface CVSSMetric {
  source?: string
  type?: string
  cvssData?: {
    version?: string
    vectorString?: string
    baseScore?: number
    baseSeverity?: string
  }
}

export interface CVEReference {
  url: string
  source?: string
  tags?: string[]
}

export interface CVEData {
  id: string
  sourceIdentifier?: string
  published?: string
  lastModified?: string
  vulnStatus?: string
  descriptions?: CVEDescription[]
  metrics?: {
    cvssMetricV31?: CVSSMetric[]
    cvssMetricV30?: CVSSMetric[]
    cvssMetricV2?: CVSSMetric[]
  }
  weaknesses?: Array<{
    source?: string
    type?: string
    description?: Array<{
      lang: string
      value: string
    }>
  }>
  references?: CVEReference[]
}

export interface Vulnerability {
  cve: CVEData
}

// --- DTOs de Estatísticas ---

export interface StatsData {
  total_vulnerabilities: number
  by_severity: {
    CRITICAL: number
    HIGH: number
    MEDIUM: number
    LOW: number
  }
  by_year: Record<string, number>
  last_updated: string
}

export interface YearStats {
  year: number
  total: number
  by_severity: {
    CRITICAL: number
    HIGH: number
    MEDIUM: number
    LOW: number
  }
  by_month: Record<string, number>
}

// --- Resposta Padrão da API ---

export interface BNVDResponse<T> {
  status: 'success' | 'error'
  data?: T
  message?: string
  pagination?: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}
