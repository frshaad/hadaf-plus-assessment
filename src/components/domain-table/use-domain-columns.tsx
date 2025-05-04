import { Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { DomainTableProps } from '@/components/domain-table'
import type { Domain, VerificationStatus } from '@/types'

type DomainActions = {
  onEdit: (domain: Domain) => void
  onDelete: (domain: Domain) => void
}

export function useDomainColumns({ onDelete, onEdit }: DomainActions) {
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
      render: (_text, record) => (
        <div className="flex gap-2">
          <Button type="link" size="small" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            size="small"
            danger
            onClick={() => onDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return columns
}
