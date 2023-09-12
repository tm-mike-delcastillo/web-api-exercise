import { GuruProvider, RawGuruProvider, RawGuruProviders } from '../types/guru'

export const fetchApis = async () => {
  const response = await fetch('https://api.apis.guru/v2/providers.json')
  const json: RawGuruProviders = await response.json()
  return json.data
}

export const fetchApi = async (domain: string) => {
  const response = await fetch(`https://api.apis.guru/v2/${domain}.json`)
  const json: RawGuruProvider = await response.json()
  const apis: GuruProvider[] = []

  for (const [id, rawProvider] of Object.entries(json.apis)) {
    const provider: GuruProvider = {
      id,
      domain,
      title: rawProvider.info.title,
      description: rawProvider.info.description,
      swaggerUrl: rawProvider.swaggerUrl,
      contact: rawProvider.info.contact,
      logoUrl: rawProvider.info['x-logo'].url,
    }
    apis.push(provider)
  }

  return apis
}
