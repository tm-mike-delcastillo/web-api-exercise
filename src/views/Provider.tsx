import { FC, useEffect, useMemo, useState } from 'react'
import { ExploreButton } from '../components/ExploreButton'
import { useParams } from 'react-router-dom'
import { fetchApi } from '../services/api'
import { GuruProvider, ProviderContactKeys } from '../types/guru'
import { CONTACT_KEYS_TO_LABEL } from '../utils/guru'
import { getDecodedDomain } from '../utils/domain'
import { useLogoImage } from '../hooks/useLogoImage'

type Params = {
  domain: string
  id: string
}

type ContactItem = {
  key: ProviderContactKeys
  label: string
  value: string
}

export const Provider: FC = () => {
  const params = useParams<Params>()
  const { id, domain } = getDecodedDomain(params.id, params.domain)

  const [provider, setProvider] = useState<GuruProvider | null>(null)
  const { logoUrl } = useLogoImage(provider?.logoUrl)

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
        contactItems.push({ key, label, value })
      }
    }

    return contactItems
  }, [provider?.contact])

  if (provider === null) return null

  return (
    <div id="view-provider">
      <div className="content-container">
        <div className="logo-container">
          <img src={logoUrl} className="logo" />
          <div className="title">{provider.title}</div>
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
            rel="noopener noreferrer"
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
                  <tr key={item.key}>
                    <td>{item.label}</td>
                    <td>
                      {item.key === 'url' ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </td>
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
    </div>
  )
}
