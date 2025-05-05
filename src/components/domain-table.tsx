import { App, Button, Table } from 'antd'
import type {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface'
import { useState } from 'react'

import DomainDrawer from '@/components/domain-drawer'
import { useDeleteDomainModal } from '@/hooks/use-delete-domain-modal'
import { useDomainColumns } from '@/hooks/use-domain-columns'
import { useEditDomain } from '@/hooks/use-edit-domain'
import { useToggleDomain } from '@/hooks/use-toggle-domain'
import type { Domain } from '@/types'

export type DomainTableProps = {
  domains: Domain[]
  isLoading: boolean
}

export default function DomainTable({ domains, isLoading }: DomainTableProps) {
  // ========== State ==========
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({})
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Domain>>({})

  // ========== Hooks ==========
  const { message } = App.useApp()

  const { showDeleteModal, DeleteModal } = useDeleteDomainModal()

  const {
    showDrawer: showEditDrawer,
    openDrawer,
    closeDrawer,
    onSubmit: handleUpdateDomain,
    currentDomain,
    loading: isEditing,
  } = useEditDomain(message)

  const { toggleVerification, toggleActivation } = useToggleDomain(message)

  const columns = useDomainColumns({
    onEdit: showEditDrawer,
    onDelete: showDeleteModal,
    onToggleVerify: toggleVerification,
    onToggleActivate: toggleActivation,
    sortedInfo,
    filteredInfo,
  })

  // ========== Handlers ==========
  const handleChange = (
    _pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Domain> | SorterResult<Domain>[],
    // Add extra parameter to match the expected signature
  ) => {
    setFilteredInfo(filters)
    setSortedInfo(Array.isArray(sorter) ? sorter[0] : sorter)
  }

  const clearFilters = () => {
    setFilteredInfo({})
    setSortedInfo({})
  }

  // ========== Render ==========
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={clearFilters}>Clear filters and sorters</Button>
      </div>

      {/* Main Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={domains}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
        onChange={handleChange}
      />

      {/* Modals */}
      <DeleteModal />

      {/* Drawers */}
      <DomainDrawer
        open={openDrawer}
        onClose={closeDrawer}
        onSubmit={handleUpdateDomain}
        loading={isEditing}
        defaultValue={currentDomain?.domain}
        type="update"
      />
    </>
  )
}
