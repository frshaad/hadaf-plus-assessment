import type { MessageInstance } from 'antd/es/message/interface'

import { useUpdateDomainMutation } from '@/services/domain-api'
import type { Domain } from '@/types'

export function useToggleDomain(messageApi: MessageInstance) {
  const [updateDomain] = useUpdateDomainMutation()

  const toggleVerification = async (domain: Domain) => {
    try {
      messageApi.open({
        type: 'loading',
        content:
          domain.status === 'verified' ? 'Invalidating...' : 'Verifying...',
        duration: 0,
      })

      await updateDomain({
        id: domain.id,
        data: {
          status: domain.status === 'verified' ? 'rejected' : 'verified',
        },
      }).unwrap()

      messageApi.destroy()
      messageApi.success(
        domain.status === 'verified' ? 'Domain invalidated' : 'Domain verified',
      )
    } catch (error) {
      console.error(error)
      messageApi.destroy()
      messageApi.error('Error toggling verification')
    }
  }

  const toggleActivation = async (domain: Domain) => {
    try {
      messageApi.open({
        type: 'loading',
        content: domain.isActive ? 'Deactivating...' : 'Activating...',
        duration: 0,
      })

      await updateDomain({
        id: domain.id,
        data: {
          isActive: !domain.isActive,
        },
      }).unwrap()

      messageApi.destroy()
      messageApi.success(
        domain.isActive ? 'Domain deactivated' : 'Domain activated',
      )
    } catch (error) {
      console.error(error)
      messageApi.destroy()
      messageApi.error('Error toggling activation')
    }
  }

  return {
    toggleVerification,
    toggleActivation,
  }
}
