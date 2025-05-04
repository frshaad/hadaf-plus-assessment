import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Input
      size="large"
      placeholder="Search"
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
    />
  )
}
