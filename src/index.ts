import { BNVDConfig } from './types/index.js'
import { MitreDomain } from './domains/mitre.js'
import { NoticiasDomain } from './domains/noticias.js'
import { StatisticsDomain } from './domains/statistics.js'
import { VulnerabilitiesDomain } from './domains/vulnerabilities.js'

export * from './types/index.js'

export class BNVDClient {
  public readonly mitre: MitreDomain
  public readonly noticias: NoticiasDomain
  public readonly statistics: StatisticsDomain
  public readonly vulnerabilities: VulnerabilitiesDomain

  constructor(config?: BNVDConfig) {
    this.mitre = new MitreDomain(config)
    this.noticias = new NoticiasDomain(config)
    this.statistics = new StatisticsDomain(config)
    this.vulnerabilities = new VulnerabilitiesDomain(config)
  }
}
