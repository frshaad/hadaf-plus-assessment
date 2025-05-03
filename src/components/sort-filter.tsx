import { SortAscendingOutlined } from '@ant-design/icons'
import { Select } from 'antd'

const sortOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
  { value: 'active', label: 'Activation' },
  { value: 'verified', label: 'Verification' },
]

function handleChange(value: string) {
  console.log(`selected ${value}`)
}

export default function SortFilter() {
  return (
    <Select
      prefix="Order by"
      suffixIcon={<SortAscendingOutlined />}
      defaultValue="asc"
      onChange={handleChange}
      options={sortOptions}
      size="large"
      style={{ width: '340px' }}
    />
  )
}
