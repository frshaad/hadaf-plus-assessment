import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps } from 'antd'
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
      render: (status: VerificationStatus) =>
        status == 'verified' ? (
          <span className="text-[#52c41a]">Verified</span>
        ) : (
          <span className="text-[#eb2f96]">Not Verified</span>
        ),
      filters: [
        { text: 'Verified', value: 'verified' },
        { text: 'Not Verified', value: 'rejected' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => {
        if (value === 'verified') return record.status === 'verified'
        if (value === 'rejected') return record.status !== 'verified'
        return false
      },
      sorter: (a, b) => (a.status > b.status ? 1 : -1),
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
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Not Active', value: 'inactive' },
      ],
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
