import React, { useState } from 'react';
import { Input, Select, DatePicker, Table, Typography, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  CalendarOutlined,
  UserOutlined,

} from '@ant-design/icons';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import { SearchOutlined } from '@mui/icons-material';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;


// 검색 핸들러
const handleSearch = (values: any) => {

};

const Search = () => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px', // 요소 간 간격 조정
        flexWrap: 'wrap',
      }}
    >
      <Select size="large" placeholder="프로세스" style={{ flex: 1, minWidth: '150px' }} allowClear prefix={<AccountTreeOutlinedIcon style={{ fontSize:'16px', color: '#c9c9c9' , verticalAlign: 'middle'}}/>}>
        <Option value="프로세스 1">프로세스 1</Option>
        <Option value="프로세스 2">프로세스 2</Option>
        <Option value="프로세스 3">프로세스 3</Option>
      </Select>
      <Select size="large" placeholder="파트" style={{ flex: 1, minWidth: '150px' }} allowClear prefix={<TuneIcon style={{ fontSize:'16px',color: '#c9c9c9' , verticalAlign: 'middle'}}/>}>
        <Option value="OS">OS</Option>
        <Option value="MW">미들웨어</Option>
        <Option value="DB">DB</Option>
        <Option value="NET">네트워크</Option>
        <Option value="SEC">보안</Option>
      </Select>
      <Select size="large" placeholder="담당자" style={{ flex: 1, minWidth: '150px' }} allowClear prefix={<UserOutlined style={{ color: '#c9c9c9' , verticalAlign: 'middle'}}/>} >
        <Option value="담당자 1">담당자 1</Option>
        <Option value="담당자 2">담당자 2</Option>
      </Select>
      <DatePicker size="large" placeholder="시작일" style={{ flex: 1, minWidth: '150px' }} prefix={<CalendarOutlined style={{ color: '#c9c9c9' , verticalAlign: 'middle'}}/>} suffixIcon={null}/>
      <DatePicker size="large" placeholder="마감일" style={{ flex: 1, minWidth: '150px' }} prefix={<CalendarOutlined style={{ color: '#c9c9c9' , verticalAlign: 'middle'}}/>} suffixIcon={null} />
      <Input size="large" placeholder="업무명" style={{ flex: 2, minWidth: '200px' }} prefix={<SearchOutlined style={{ fontSize:'16px',color: '#c9c9c9' , verticalAlign: 'middle'}}/>}/>
      <Button size="large" type="primary" onClick={handleSearch}>
        검색
      </Button>
    </div>
  )
}

export default Search