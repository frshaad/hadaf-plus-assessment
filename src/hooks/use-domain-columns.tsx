import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Radio, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

import { DomainTableProps } from '@/components/domain-table'
import type { Domain, VerificationStatus } from '@/types'

type UseDomainColumnsProps = {
  onEdit: (domain: Domain) => void
  onDelete: (domain: Domain) => void
  onToggleVerify: (domain: Domain) => void
  onToggleActivate: (domain: Domain) => void
  sortedInfo: SorterResult<Domain>
  filteredInfo: Record<string, FilterValue | null>
}

export function useDomainColumns({
  onDelete,
  onEdit,
  onToggleActivate,
  onToggleVerify,
  sortedInfo = {},
  filteredInfo = {},
}: UseDomainColumnsProps) {
  const columns: ColumnsType<DomainTableProps['domains'][number]> = [
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
      sorter: (a, b) => a.domain.localeCompare(b.domain),
      sortOrder: sortedInfo.columnKey === 'domain' ? sortedInfo.order : null,
    },
    {
      title: 'Verification Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: VerificationStatus) => {
        const statusMap = {
          pending: { text: 'Pending', color: '#faad14' }, // gold
          verified: { text: 'Verified', color: '#52c41a' }, // green
          rejected: { text: 'Rejected', color: '#ff4d4f' }, // red
        }
        const { text, color } = statusMap[status] || {
          text: status,
          color: '#d9d9d9',
        }
        return <span style={{ color }}>{text}</span>
      },
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Verified', value: 'verified' },
        { text: 'Rejected', value: 'rejected' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
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
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Radio.Group
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
              confirm()
            }}
          >
            <Space direction="vertical">
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Space>
          </Radio.Group>
          <div style={{ marginTop: 8 }}>
            <Button
              onClick={() => {
                if (clearFilters) {
                  clearFilters()
                }
                confirm()
              }}
              size="small"
              style={{ width: '100%' }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filteredValue: filteredInfo.isActive || null,
      onFilter: (value, record) => {
        if (value === 'active') return record.isActive === true
        if (value === 'inactive') return record.isActive === false
        return false
      },
      sorter: (a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1),
      sortOrder: sortedInfo.columnKey === 'isActive' ? sortedInfo.order : null,
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
      sorter: (a, b) => a.createdDate - b.createdDate,
      sortOrder:
        sortedInfo.columnKey === 'createdDate' ? sortedInfo.order : null,
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
