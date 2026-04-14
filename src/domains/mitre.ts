import { BNVDResponse } from '../types/index.js'
import { HTTPClient } from '../core/http-client.js'

export interface MitreParams {
  matrix?: 'enterprise' | 'mobile' | 'ics' | 'pre-attack'
  tactic?: string
  platform?: string
  translate?: boolean
}

export class MitreDomain extends HTTPClient {
  async getInfo() {
    return this.get<BNVDResponse<any>>('/api/v1/mitre')
  }

  async listMatrices() {
    return this.get<BNVDResponse<any>>('/api/v1/mitre/matrices')
  }

  async getMatrix(matrixType: string, translate: boolean = false) {
    return this.get<BNVDResponse<any>>(`/api/v1/mitre/matrix/${matrixType}`, { translate })
  }

  async listTechniques(params?: MitreParams) {
    return this.get<BNVDResponse<any>>('/api/v1/mitre/techniques', params)
  }

  async getTechnique(techniqueId: string, params?: Record<string, any>) {
    return this.get<BNVDResponse<any>>(`/api/v1/mitre/technique/${techniqueId}`, params)
  }

  async listSubtechniques(params?: MitreParams) {
    return this.get<BNVDResponse<any>>('/api/v1/mitre/subtechniques', params)
  }

  async listGroups(params?: MitreParams) {
    return this.get<BNVDResponse<any>>('/api/v1/mitre/groups', params)
  }

  async getGroup(groupId: string, params?: Record<string, any>) {
    return this.get<BNVDResponse<any>>(`/api/v1/mitre/group/${groupId}`, params)
  }

  async listMitigations(params?: MitreParams) {
    return this.get<BNVDResponse<any>>('/api/v1/mitre/mitigations', params)
  }

  async getMitigation(mitigationId: string, params?: Record<string, any>) {
    return this.get<BNVDResponse<any>>(`/api/v1/mitre/mitigation/${mitigationId}`, params)
  }
}
