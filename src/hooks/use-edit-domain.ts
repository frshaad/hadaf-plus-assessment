import type { MessageInstance } from 'antd/es/message/interface'
import { useState } from 'react'

import { useUpdateDomainMutation } from '@/services/domain-api'
import { Domain } from '@/types'

export function useEditDomain(messageApi: MessageInstance) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [currentDomain, setCurrentDomain] = useState<Domain | null>(null)
  const [updateDomain, { isLoading }] = useUpdateDomainMutation()

  const showDrawer = (domain: Domain) => {
    setCurrentDomain(domain)
    setOpenDrawer(true)
  }

  const closeDrawer = () => {
    setCurrentDomain(null)
    setOpenDrawer(false)
  }

  const onSubmit = async (updatedDomain: string) => {
    if (!currentDomain) return

    try {
      messageApi.open({
        type: 'loading',
        content: 'Updating domain...',
        duration: 0,
      })

      await updateDomain({
        id: currentDomain.id,
        data: { domain: updatedDomain, isActive: true },
      }).unwrap()

      messageApi.destroy()
      messageApi.success('Domain updated')

      closeDrawer()
    } catch (error) {
      console.error(error)
      messageApi.destroy()
      messageApi.error('Error happened!')
    }
  }

  return {
    openDrawer,
    showDrawer,
    closeDrawer,
    onSubmit,
    loading: isLoading,
    currentDomain,
  }
}
