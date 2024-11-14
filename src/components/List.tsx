import React from 'react';
import { Table, Tag, Avatar, Typography } from 'antd';
import '../styles/components/List.css'; // CSS 파일 추가

const { Text } = Typography;

const tasks = [
  {
    id: 1,
    title: '업무 1',
    assignee: { name: '김철수', profile: 'https://i.pravatar.cc/40?img=1' },
    status: '진행 중',
    dueDate: '2024-11-15',
  },
  {
    id: 2,
    title: '업무 2',
    assignee: { name: '이영희', profile: 'https://i.pravatar.cc/40?img=2' },
    status: '완료',
    dueDate: '2024-11-14',
  },
  {
    id: 3,
    title: '업무 3',
    assignee: { name: '박민수', profile: 'https://i.pravatar.cc/40?img=3' },
    status: '시작 전',
    dueDate: '2024-11-18',
  },
  {
    id: 4,
    title: '업무 4',
    assignee: { name: '최가영', profile: 'https://i.pravatar.cc/40?img=4' },
    status: '지연',
    dueDate: '2024-11-10',
  },
  {
    id: 5,
    title: '업무 5',
    assignee: { name: '홍길동', profile: 'https://i.pravatar.cc/40?img=5' },
    status: '진행 중',
    dueDate: '2024-11-20',
  },
];

const List = () => {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as 'center',
      render: (text: number) => <Text>{text}</Text>,
    },
    {
      title: '업무명',
      dataIndex: 'title',
      align: 'center' as 'center',
      key: 'title',
      render: (text: string) => (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            width:'100%',
            borderRadius: '8px',
            padding: '4px 8px',
            textAlign: 'center',
            display: 'inline-block',
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
      align: 'center' as 'center',
      render: (assignee: { name: string; profile: string }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', gap: '8px' }}>
          <Avatar src={assignee.profile} size="small" />
          <Text>{assignee.name}</Text>
        </div>
      ),
    },
    {
      title: '진행상태',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as 'center',
      render: (status: string) => (
        <Tag
          color={
            status === '진행 중'
              ? 'blue'
              : status === '완료'
              ? 'green'
              : status === '시작 전'
              ? 'gray'
              : 'red'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: '마감일',
      dataIndex: 'dueDate',
      key: 'dueDate',
      align: 'center' as 'center',
      render: (date: string) => <Text>{date}</Text>,
    },
  ];

  return (
    <Table
      dataSource={tasks}
      columns={columns}
      pagination={false}
      rowKey="id"
      bordered={false}
      className="custom-table"
    />
  );
};

export default List;
