import { App, Table } from 'antd'

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
  const { message } = App.useApp()
  // ========== Hooks ==========
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
  })

  // ========== Render ==========
  return (
    <>
      {/* Toasts / Messages */}

      {/* Main Table */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={domains}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
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
