import { FC, useEffect, useState } from 'react'
import { fetchApis } from '../services/api'
import { ApiItem } from './ApiItem'

export const ApiList: FC = () => {
  const [domains, setDomains] = useState<string[]>([])

  useEffect(() => {
    fetchApis()
      .then((fetchedDomains) => {
        setDomains(fetchedDomains)
      })
      .catch((err) => {
        alert(`There was a problem loading APIs: ${err.message}`)
      })
  }, [])

  return (
    <div className="api-list">
      {domains.map((domain) => (
        <ApiItem domain={domain} key={domain} />
      ))}
    </div>
  )
}
