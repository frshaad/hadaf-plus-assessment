import DomainTable from '@/components/domain-table'
import SortFilter from '@/components/sort-filter'
import { useGetDomainsQuery } from '@/services/domain-api'

import AddDomainButton from './components/add-domain-button'
import SearchInput from './components/search-input'

export default function App() {
  const { data: domains, isError, isLoading } = useGetDomainsQuery()

  if (isError) {
    return <p>Error happened!</p>
  }

  return (
    <main className="container mx-auto mt-5 space-y-8 max-md:px-2">
      <h1 className="text-4xl font-bold">Domains</h1>

      <section className="flex items-center justify-between gap-2 max-sm:flex-col">
        <AddDomainButton />

        <div className="flex items-center gap-3 lg:gap-6">
          <SortFilter />
          <SearchInput />
        </div>
      </section>

      <DomainTable domains={domains ?? []} isLoading={isLoading} />
    </main>
  )
}
