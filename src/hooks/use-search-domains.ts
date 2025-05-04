import { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Domain } from '@/types'

export function useSearchDomains(domains: Domain[] | undefined) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounceValue(searchTerm, 300)

  const filteredDomains = useMemo(() => {
    if (!domains) return []

    const lower = debouncedSearch.toLowerCase()

    if (!lower.trim()) return domains

    return domains.filter((domain) =>
      domain.domain.toLowerCase().includes(lower),
    )
  }, [debouncedSearch, domains])

  return { filteredDomains, searchTerm, setSearchTerm }
}
