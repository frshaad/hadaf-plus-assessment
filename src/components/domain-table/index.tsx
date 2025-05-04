import { Table } from 'antd'

import { useDeleteDomainModal } from '@/hooks/use-delete-domain-modal'
import { useDomainColumns } from '@/hooks/use-domain-columns'
import { useEditDomain } from '@/hooks/use-edit-domain'
import type { Domain } from '@/types'

import DomainDrawer from '../domain-drawer'

export type DomainTableProps = {
  domains: Domain[]
  isLoading: boolean
}

export default function DomainTable({ domains, isLoading }: DomainTableProps) {
  const { showDeleteModal, DeleteModal } = useDeleteDomainModal()
  const {
    showDrawer: showEditDrawer,
    openDrawer,
    closeDrawer,
    onSubmit,
    currentDomain,
    contextHolder,
    loading: isEditing,
  } = useEditDomain()

  const columns = useDomainColumns({
    onEdit: showEditDrawer,
    onDelete: (domain: Domain) => {
      showDeleteModal(domain)
    },
    onToggleVerify: (domain) => console.log('verify', domain),
    onToggleActivate: (domain) => console.log('activate', domain),
  })

  return (
    <>
      {contextHolder}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={domains}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
      />
      <DeleteModal />
      <DomainDrawer
        open={openDrawer}
        onClose={closeDrawer}
        onSubmit={onSubmit}
        loading={isEditing}
        defaultValue={currentDomain?.domain}
        type="update"
      />
    </>
  )
}
