import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { useAddDomain } from '@/hooks/use-add-domain'

import DomainDrawer from './domain-drawer'

export default function AddDomainButton() {
  const {
    openDrawer,
    showDrawer,
    closeDrawer,
    onSubmit,
    loading,
    contextHolder,
  } = useAddDomain()

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        className="max-sm:w-full"
        onClick={showDrawer}
      >
        Add Domain
      </Button>

      <DomainDrawer
        open={openDrawer}
        onClose={closeDrawer}
        onSubmit={onSubmit}
        loading={loading}
      />
    </>
  )
}
