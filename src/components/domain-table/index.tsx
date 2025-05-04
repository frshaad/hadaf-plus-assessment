import { Table } from 'antd'

import type { Domain } from '@/types'

import { useDeleteDomainModal } from './use-delete-domain-modal'
import { useDomainColumns } from './use-domain-columns'

export type DomainTableProps = {
  domains: Domain[]
  isLoading: boolean
}

export default function DomainTable({ domains, isLoading }: DomainTableProps) {
  const { showDeleteModal, DeleteModal } = useDeleteDomainModal()
  const columns = useDomainColumns({
    onDelete: showDeleteModal,
    onEdit: () => console.log('Edit'),
  })

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={domains}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
      />
      <DeleteModal />
    </>
  )
}
