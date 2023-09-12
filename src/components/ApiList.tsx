import { FC, useEffect, useState } from 'react'
import { fetchApis } from '../services/api'
import { ApiItem } from './ApiItem'
import { useNavigate } from 'react-router-dom'

export const ApiList: FC = () => {
  const navigate = useNavigate()

  const [domains, setDomains] = useState<string[]>([])

  useEffect(() => {
    fetchApis()
      .then((fetchedDomains) => {
        setDomains(fetchedDomains)
      })
      .catch((err) => {
        alert(`There was a problem loading APIs: ${err.message}`)
        navigate('/')
      })
  }, [navigate])

  return (
    <div className="api-list">
      {domains.map((domain) => (
        <ApiItem domain={domain} key={domain} />
      ))}
    </div>
  )
}
