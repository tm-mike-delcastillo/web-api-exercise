import { useEffect, useState } from 'react'
import defaultLogo from '../assets/no-logo.svg'

/*
Because some of API Guru's images don't load properly,
this hook checks if the image is valid before it is displayed.
*/

export const useLogoImage = (sourceUrl?: string | null) => {
  const [logoUrl, setLogoUrl] = useState(defaultLogo)

  useEffect(() => {
    if (typeof sourceUrl === 'string') {
      const image = new Image()
      image.src = sourceUrl
      image.onload = () => setLogoUrl(sourceUrl)
    }
  }, [sourceUrl])

  return { logoUrl }
}
