import { Table } from 'antd'

import type { Domain } from '@/types'

import { useDeleteDomainModal } from '../../hooks/use-delete-domain-modal'
import { useDomainColumns } from '../../hooks/use-domain-columns'

export type DomainTableProps = {
  domains: Domain[]
  isLoading: boolean
  onEditDomain: (domain: Domain) => void
  onToggleVerify: (domain: Domain) => void
  onToggleActivate: (domain: Domain) => void
}

export default function DomainTable({
  domains,
  isLoading,
  onEditDomain,
  onToggleVerify,
  onToggleActivate,
}: DomainTableProps) {
  const { showDeleteModal, DeleteModal } = useDeleteDomainModal()

  const columns = useDomainColumns({
    onEdit: onEditDomain,
    onDelete: (domain: Domain) => {
      showDeleteModal(domain)
    },
    onToggleVerify,
    onToggleActivate,
  })
  return (
    <>
      <Table
        rowKey="_id"
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
