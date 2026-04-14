import { HTTPClient } from '../core/http-client.js'
import { BNVDResponse, StatsData, YearStats } from '../types/index.js'

export class StatisticsDomain extends HTTPClient {
  async getGeneral() {
    return this.get<BNVDResponse<StatsData>>('/api/v1/stats')
  }

  async getByYear() {
    return this.get<BNVDResponse<YearStats[]>>('/api/v1/stats/years')
  }
}
