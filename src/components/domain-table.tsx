import {
  CheckCircleTwoTone,
  EllipsisOutlined,
  StopTwoTone,
  WarningTwoTone,
} from '@ant-design/icons'
import { Button, Dropdown, Menu, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import type { Domain, VerificationStatus } from '@/types'

type DomainTableProps = {
  domains: Domain[]
  isLoading: boolean
}

const handleEdit = (domain: Domain) => {
  console.log('Edit domain:', domain)
  // Open drawer for edit, etc.
}

const handleDelete = (domain: Domain) => {
  console.log('Delete domain:', domain)
  // Show confirmation, then call delete mutation
}

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
      const menu = (
        <Menu
          items={[
            {
              key: 'edit',
              label: 'Edit',
              onClick: () => handleEdit(record),
            },
            {
              key: 'delete',
              label: 'Delete',
              onClick: () => handleDelete(record),
              danger: true,
            },
          ]}
        />
      )

      return (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      )
    },
  },
]

export default function DomainTable({ domains, isLoading }: DomainTableProps) {
  const richDomains = domains.map((item) => {
    if (item.isActive && item.status == 'verified') {
      return {
        ...item,
        domain: (
          <span className="flex items-center gap-2">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            {item.domain}
          </span>
        ),
      }
    }

    if (!item.isActive && item.status != 'verified') {
      return {
        ...item,
        domain: (
          <span className="flex items-center gap-2">
            <StopTwoTone twoToneColor="#eb2f96" />
            {item.domain}
          </span>
        ),
      }
    }

    return {
      ...item,
      domain: (
        <span className="flex items-center gap-2">
          <WarningTwoTone twoToneColor="#eed202" />
          {item.domain}
        </span>
      ),
    }
  })

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={richDomains}
      loading={isLoading}
      bordered
      pagination={{ pageSize: 10 }}
    />
  )
}
