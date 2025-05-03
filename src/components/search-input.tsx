import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

export default function SearchInput() {
  return <Input size="large" placeholder="Search" prefix={<SearchOutlined />} />
}
