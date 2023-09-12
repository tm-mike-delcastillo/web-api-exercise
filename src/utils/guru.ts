import { ProviderContactKeys } from '../types/guru'

export const CONTACT_KEYS = ['email', 'name', 'x-twitter', 'url'] as const

export const CONTACT_KEYS_TO_LABEL: Record<ProviderContactKeys, string> = {
  email: 'Email',
  name: 'Name',
  url: 'URL',
  'x-twitter': 'Twitter',
}
