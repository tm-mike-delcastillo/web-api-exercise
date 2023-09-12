import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { fetchApi } from '../services/api'
import { GuruProvider } from '../types/guru'
import arrowUrl from '../assets/arrow.svg'
import { Link } from 'react-router-dom'
import { getProviderLink } from '../utils/domain'

const BASE_HEIGHT = 52
const PADDING = 18

type Props = {
  domain: string
}

export const ApiItem: FC<Props> = ({ domain }) => {
  const [providers, setProviders] = useState<GuruProvider[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(-1)
  const apiListRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const el = apiListRef.current
    if (contentHeight === -1 && loaded && el !== null) {
      setContentHeight(BASE_HEIGHT + PADDING + el.offsetHeight)
    }
  }, [contentHeight, loaded])

  const className = `api-list-item ${isOpen ? 'open' : 'closed'}`
  const style: CSSProperties = {
    height: `${isOpen ? contentHeight : BASE_HEIGHT}px`,
  }

  return (
    <div {...{ className, style }}>
      <div className="name-container" onClick={() => setIsOpen((b) => !b)}>
        <div className="domain">{domain}</div>
        <img className="arrow" src={arrowUrl} />
      </div>
      <div className="api-sub-items" ref={apiListRef}>
        {loaded &&
          providers !== null &&
          providers.map((provider) => (
            <Link
              to={getProviderLink(provider.id, provider.domain)}
              className="api-sub-item"
              key={provider.id}
            >
              <div
                className="logo"
                style={{ backgroundImage: `url(${provider.logoUrl})` }}
              ></div>
              <div className="title">{provider.title}</div>
            </Link>
          ))}
      </div>
    </div>
  )
}
