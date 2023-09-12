import { FC, useEffect, useMemo, useState } from 'react'
import { ExploreButton } from '../components/ExploreButton'
import { useParams } from 'react-router-dom'
import { fetchApi } from '../services/api'
import { GuruProvider, ProviderContactKeys } from '../types/guru'
import { CONTACT_KEYS_TO_LABEL } from '../constants/guru'

type Params = {
  domain: string
  id: string
}

type ContactItem = {
  label: string
  value: string
}

export const Provider: FC = () => {
  const params = useParams<Params>()
  const id = params.id!
  const domain = params.domain!

  const [provider, setProvider] = useState<GuruProvider | null>(null)

  useEffect(() => {
    fetchApi(domain)
      .then((fetchedProviders) => {
        const matchProvider = fetchedProviders.find((prov) => prov.id === id)
        if (typeof matchProvider === 'undefined')
          throw new Error('API not found')
        setProvider(matchProvider)
      })
      .catch((err) => {
        alert(`There was a problem loading API: ${err.message}`)
      })
  }, [domain, id])

  const contactItems = useMemo(() => {
    if (typeof provider?.contact !== 'object') return []

    const contactItems: ContactItem[] = []
    const keys = Object.keys(provider.contact) as ProviderContactKeys[]
    for (const key of keys) {
      const value = provider.contact[key]
      const label = CONTACT_KEYS_TO_LABEL[key]
      if (value?.trim()) {
        contactItems.push({ label, value })
      }
    }

    return contactItems
  }, [provider?.contact])

  if (provider === null) return null

  return (
    <div id="view-provider">
      <div className="content-container">
        <div className="logo-container">
          <img src={provider.logoUrl} className="logo" />
          <div className="title">{provider.title}</div>
        </div>
      </div>

      <div className="text-group">
        <div className="heading">Description</div>
        <p dangerouslySetInnerHTML={{ __html: provider.description }}></p>
      </div>

      <div className="text-group">
        <div className="heading">Swagger</div>
        <a
          href={provider.swaggerUrl}
          target="_blank"
          rel="no-referrer"
          className="swagger-link"
        >
          {provider.swaggerUrl}
        </a>
      </div>

      {contactItems.length > 0 && (
        <div className="text-group">
          <div className="heading">Contact</div>
          <table className="contact-">
            <tbody>
              {contactItems.map((item) => (
                <tr key={item.label}>
                  <td>{item.label}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="explore-button-container">
        <ExploreButton />
      </div>
    </div>
  )
}
