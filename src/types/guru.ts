import { CONTACT_KEYS } from '../utils/guru'

export type RawGuruProviders = {
  data: string[]
}

export type ProviderContactKeys = (typeof CONTACT_KEYS)[number]
export type RawGuruProviderContact = {
  [key in ProviderContactKeys]?: string
}

export type RawGuruProvider = {
  apis: Record<
    string,
    {
      added: string
      info: {
        contact: RawGuruProviderContact
        description: string
        title: string
        version: string
        'x-apisguru-categories': string[]
        'x-logo': { url: string }
        'x-origin': Array<{ format: string; url: string; version: string }>
        'x-providerName': string
        'x-serviceName': string
        'x-unofficialSpec': boolean
      }
      updated: string
      swaggerUrl: string
      swaggerYamlUrl: string
      openapiVer: string
      link: string
    }
  >
}

export type GuruProvider = {
  id: string
  domain: string
  title: string
  description: string
  swaggerUrl: string
  contact: RawGuruProviderContact
  logoUrl: string
}
