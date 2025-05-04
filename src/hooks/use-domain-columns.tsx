import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { DomainTableProps } from '@/components/domain-table'
import type { Domain, VerificationStatus } from '@/types'

type UseDomainColumnsProps = {
  onEdit: (domain: Domain) => void
  onDelete: (domain: Domain) => void
  onToggleVerify: (domain: Domain) => void
  onToggleActivate: (domain: Domain) => void
}

export function useDomainColumns({
  onDelete,
  onEdit,
  onToggleActivate,
  onToggleVerify,
}: UseDomainColumnsProps) {
  const columns: ColumnsType<DomainTableProps['domains'][number]> = [
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Verification Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: VerificationStatus) =>
        status == 'verified' ? (
          <span className="text-[#52c41a]">Verified</span>
        ) : (
          <span className="text-[#eb2f96]">Not Verified</span>
        ),
    },
    {
      title: 'Active Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) =>
        isActive ? (
          <span className="text-[#52c41a]">Active</span>
        ) : (
          <span className="text-[#eb2f96]">Not Active</span>
        ),
    },
    {
      title: 'Date Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (timestamp: number) =>
        new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(timestamp * 1000)),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text, record) => {
        const verifyActionText =
          record.status === 'verified' ? 'Invalidate' : 'Verify'
        const activateActionText = record.isActive ? 'Deactivate' : 'Activate'

        const items: MenuProps['items'] = [
          {
            key: 'edit',
            label: 'Edit Domain',
            onClick: () => onEdit(record),
          },
          {
            key: 'verify',
            label: verifyActionText,
            onClick: () => onToggleVerify(record),
          },
          {
            key: 'activate',
            label: activateActionText,
            onClick: () => onToggleActivate(record),
          },
          {
            type: 'divider',
          },
          {
            key: 'delete',
            label: <span className="text-red-500">Delete</span>,
            onClick: () => onDelete(record),
          },
        ]

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        )
      },
    },
  ]

  return columns
}
