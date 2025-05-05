import { App, Button, Space, Table, Tag, Typography } from 'antd'
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

  const { Text } = Typography

  const getActiveSortAndFilters = () => {
    const activeFilters = Object.entries(filteredInfo)
      .filter(([, value]) => value && value.length > 0)
      .map(([key, value]) => ({
        key,
        value: value?.join(', '),
      }))

    const activeSort = sortedInfo.columnKey
      ? {
          column: String(sortedInfo.columnKey),
          order: sortedInfo.order === 'ascend' ? 'ascending' : 'descending',
        }
      : null

    return { activeFilters, activeSort }
  }

  // ========== Render ==========
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Space size="middle">
          {getActiveSortAndFilters().activeFilters.length > 0 && (
            <Space>
              <Text type="secondary">Filters:</Text>
              <Space size={[0, 8]} wrap>
                {getActiveSortAndFilters().activeFilters.map(
                  ({ key, value }) => (
                    <Tag key={key} color="blue" className="capitalize">
                      {key}: {value}
                    </Tag>
                  ),
                )}
              </Space>
            </Space>
          )}

          {getActiveSortAndFilters().activeSort && (
            <Space>
              <Text type="secondary">Sort:</Text>
              <Tag color="purple" className="capitalize">
                {getActiveSortAndFilters().activeSort?.column}
                {': '}
                {getActiveSortAndFilters().activeSort?.order}
              </Tag>
            </Space>
          )}
        </Space>

        {(Object.values(filteredInfo).some(
          (v) => v != null && (Array.isArray(v) ? v.length > 0 : true),
        ) ||
          (sortedInfo.columnKey && sortedInfo.order)) && (
          <Button type="link" onClick={clearFilters} size="small" danger>
            Clear all
          </Button>
        )}
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
