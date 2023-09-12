const dotEscapeValue = '_-_'
const dotRegex = new RegExp(dotEscapeValue, 'gm')

/*
Domains are encoded because of a development issue with vite
GitHub Issue: https://github.com/vitejs/vite/issues/2415
*/

export const encodeDomain = (domain: string) =>
  domain.replace(/\./gm, dotEscapeValue)
export const decodeDomain = (encodedDomain: string) =>
  encodedDomain.replace(dotRegex, '.')
export const generateDomainLink = (id: string, domain: string) =>
  `/${encodeDomain(domain)}/${encodeDomain(id)}`
export const getDecodedDomain = (id?: string, domain?: string) => {
  return {
    id: typeof id === 'string' ? decodeDomain(id) : '',
    domain: typeof domain === 'string' ? decodeDomain(domain) : '',
  }
}
