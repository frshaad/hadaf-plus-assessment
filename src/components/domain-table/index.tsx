import { Table } from 'antd'

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
  const { showDeleteModal, DeleteModal } = useDeleteDomainModal()
  const {
    showDrawer: showEditDrawer,
    openDrawer,
    closeDrawer,
    onSubmit,
    currentDomain,
    contextHolder: editContextHolder,
    loading: isEditing,
  } = useEditDomain()

  const {
    toggleVerification,
    toggleActivation,
    contextHolder: toggleContextHolder,
  } = useToggleDomain()

  const columns = useDomainColumns({
    onEdit: showEditDrawer,
    onDelete: showDeleteModal,
    onToggleVerify: toggleVerification,
    onToggleActivate: toggleActivation,
  })

  return (
    <>
      {editContextHolder}
      {toggleContextHolder}
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
