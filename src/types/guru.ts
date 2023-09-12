import { CONTACT_KEYS } from '../constants/guru'

export type RawGuruProviders = {
  data: string[]
}

export type ProviderContactKeys = (typeof CONTACT_KEYS)[number]

export type RawGuruProvider = {
  apis: Record<
    string,
    {
      added: string
      info: {
        contact: {
          [key in ProviderContactKeys]?: string
        }
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
  contact: RawGuruProvider['apis'][string]['info']['contact']
  logoUrl: string
}
