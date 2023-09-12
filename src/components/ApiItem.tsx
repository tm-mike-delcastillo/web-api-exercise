import { FC, useEffect, useState } from 'react'
import { fetchApi } from '../services/api'
import { GuruProvider } from '../types/guru'
import arrowUrl from '../assets/arrow.svg'

type Props = {
  domain: string
}

export const ApiItem: FC<Props> = ({ domain }) => {
  const [providers, setProviders] = useState<GuruProvider[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen && !loaded && !loading) {
      setLoading(true)
      fetchApi(domain)
        .then((fetchedProviders) => {
          setProviders(fetchedProviders)
          setLoaded(true)
        })
        .catch((err) => {
          alert(`There was a problem loading API: ${err.message}`)
          setIsOpen(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [domain, isOpen, loaded, loading])

  const className = `api-list-item ${isOpen ? 'open' : 'closed'}`

  return (
    <div {...{ className }}>
      <div className="name-container" onClick={() => setIsOpen((b) => !b)}>
        <div className="domain">{domain}</div>
        <img className="arrow" src={arrowUrl} />
      </div>
      {isOpen && (
        <div className="api-sub-items">
          {loaded &&
            providers !== null &&
            providers.map((provider) => (
              <div className="api-sub-item" key={provider.id}>
                <div
                  className="logo"
                  style={{ backgroundImage: `url(${provider.logoUrl})` }}
                ></div>
                <div className="title">{provider.title}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
