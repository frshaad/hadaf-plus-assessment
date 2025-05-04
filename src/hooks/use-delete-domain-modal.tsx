import { Modal } from 'antd'
import { useState } from 'react'

import { useDeleteDomainMutation } from '@/services/domain-api'
import type { Domain } from '@/types'

export function useDeleteDomainModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const [deleteDomain, { isLoading }] = useDeleteDomainMutation()

  const showDeleteModal = (domain: Domain) => {
    setSelectedDomain(domain)
    setIsVisible(true)
  }

  const cancelDeletion = () => {
    setIsVisible(false)
    setSelectedDomain(null)
  }

  const confirmDeletion = async () => {
    if (selectedDomain) {
      try {
        await deleteDomain(selectedDomain.id).unwrap()
        console.log('Deleted successfully')
      } catch (error) {
        console.error('Failed to delete domain:', error)
      }
    }
    setIsVisible(false)
    setSelectedDomain(null)
  }

  const DeleteModal = () => (
    <Modal
      title="Confirm Delete"
      open={isVisible}
      onOk={confirmDeletion}
      onCancel={cancelDeletion}
      okText="Delete"
      okButtonProps={{ danger: true, loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <p>
        Are you sure you want to delete the domain "{selectedDomain?.domain}"?
      </p>
    </Modal>
  )

  return { showDeleteModal, DeleteModal }
}
