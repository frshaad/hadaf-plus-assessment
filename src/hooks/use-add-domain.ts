import { message } from 'antd'
import { useState } from 'react'

import { useCreateDomainMutation } from '@/services/domain-api'
import { DomainPayload } from '@/types'

export function useAddDomain() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [createDomain, { isLoading }] = useCreateDomainMutation()
  const [messageApi, contextHolder] = message.useMessage()

  const showDrawer = () => setOpenDrawer(true)
  const closeDrawer = () => setOpenDrawer(false)

  const onSubmit = async (domain: string) => {
    try {
      messageApi.open({
        type: 'loading',
        content: 'Creating domain...',
        duration: 0,
      })

      const data: DomainPayload = {
        domain,
        isActive: false,
        status: 'pending',
        createdDate: Math.floor(Date.now() / 1000),
      }

      await createDomain(data).unwrap()

      messageApi.destroy()
      messageApi.success('Domain created')

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
    contextHolder,
  }
}
