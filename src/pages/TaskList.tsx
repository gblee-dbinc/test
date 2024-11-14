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
import Search from '../components/Search';
import List from '../components/List';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

// 더미 데이터
const tasks = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `업무 ${index + 1}`,
  assignee: `담당자 ${index + 1}`,
  process: `프로세스 ${index % 3 + 1}`,
  part: `파트 ${index % 5 + 1}`,
  startDate: '2024-11-01',
  dueDate: '2024-11-30',
}));

const TaskList: React.FC = () => {
  const [filteredData, setFilteredData] = useState(tasks);

  // 테이블 컬럼 정의
  const columns: ColumnsType<typeof tasks[0]> = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '업무명',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (text: string) => (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            padding: '4px 8px',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: '담당자',
      dataIndex: 'assignee',
      key: 'assignee',
      align: 'center',
    },
    {
      title: 'ITO 프로세스',
      dataIndex: 'process',
      key: 'process',
      align: 'center',
    },
    {
      title: '파트',
      dataIndex: 'part',
      key: 'part',
      align: 'center',
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
    },
    {
      title: '마감일',
      dataIndex: 'dueDate',
      key: 'dueDate',
      align: 'center',
    },
  ];

  

  return (
    <div
    style={{
      padding: '40px 100px',
      backgroundColor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
    >
      <Title level={3} style={{margin:0}}>업무 조회</Title>

      <Search/>
      {/* 테이블 */}
      <List/>
    </div>
  );
};

export default TaskList;
