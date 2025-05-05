import type { InputRef } from 'antd'
import { Button, Drawer, Form, Input, Space } from 'antd'
import { useEffect, useRef } from 'react'

const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/i

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

  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

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
          rules={[
            { required: true, message: 'Please enter a domain name.' },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve()
                }

                if (!domainRegex.test(value)) {
                  return Promise.reject(
                    new Error('Please enter a valid domain, e.g., example.com'),
                  )
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          <Input ref={inputRef} autoFocus placeholder="yourdomain.com" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
