import { App as AntApp, Button, Result } from 'antd'

import AddDomainButton from '@/components/add-domain-button'
import DomainTable from '@/components/domain-table'
import SearchInput from '@/components/search-input'
import { useSearchDomains } from '@/hooks/use-search-domains'
import { useGetDomainsQuery } from '@/services/domain-api'

export default function App() {
  const { data: domains, isError, isLoading, refetch } = useGetDomainsQuery()

  const { searchTerm, setSearchTerm, filteredDomains } =
    useSearchDomains(domains)

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Result
          status="error"
          title="Failed to load domains"
          subTitle="Something went wrong. Please try again."
          extra={[
            <Button type="primary" onClick={() => refetch()} key="retry">
              Retry
            </Button>,
          ]}
        />
      </div>
    )
  }

  return (
    <AntApp>
      <main className="container mx-auto mt-5 space-y-8 max-md:px-2">
        <h1 className="text-4xl font-bold">Domains</h1>

        <section className="flex items-center justify-between gap-2 max-sm:flex-col">
          <AddDomainButton />
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </section>

        <DomainTable domains={filteredDomains} isLoading={isLoading} />
      </main>
    </AntApp>
  )
}
