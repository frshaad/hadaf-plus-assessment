import { App as AntApp } from 'antd'

import AddDomainButton from '@/components/add-domain-button'
import DomainTable from '@/components/domain-table'
import SearchInput from '@/components/search-input'
import SortFilter from '@/components/sort-filter'
import { useSearchDomains } from '@/hooks/use-search-domains'
import { useGetDomainsQuery } from '@/services/domain-api'

export default function App() {
  const { data: domains, isError, isLoading } = useGetDomainsQuery()

  const { searchTerm, setSearchTerm, filteredDomains } =
    useSearchDomains(domains)

  if (isError) {
    return <p>Error happened!</p>
  }

  return (
    <AntApp>
      <main className="container mx-auto mt-5 space-y-8 max-md:px-2">
        <h1 className="text-4xl font-bold">Domains</h1>

        <section className="flex items-center justify-between gap-2 max-sm:flex-col">
          <AddDomainButton />

          <div className="flex items-center gap-3 lg:gap-6">
            <SortFilter />
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>
        </section>

        <DomainTable domains={filteredDomains} isLoading={isLoading} />
      </main>
    </AntApp>
  )
}
