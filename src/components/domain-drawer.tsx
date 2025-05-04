import { Button, Drawer, Form, Input, Space } from 'antd'

type DomainDrawerProps = {
  open: boolean
  onClose: () => void
  onSubmit: (domain: string) => Promise<void>
  loading: boolean
  type?: 'add' | 'update'
  defaultValue?: string
  width?: number
}

export default function DomainDrawer({
  open,
  onClose,
  onSubmit,
  type = 'add',
  defaultValue = '',
  width = 600,
  loading,
}: DomainDrawerProps) {
  const [form] = Form.useForm()

  const handleFinish = async (values: { domain: string }) => {
    await onSubmit(values.domain)
    form.resetFields()
  }

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title={type == 'update' ? 'Edit Domain' : 'Add Domain'}
      width={width}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            {type === 'add' ? 'Add' : 'Update'}
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ domain: defaultValue }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="domain"
          label="Domain Name"
          rules={[{ required: true, message: 'Please enter a valid domain' }]}
        >
          <Input placeholder="yourdomain.com" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
