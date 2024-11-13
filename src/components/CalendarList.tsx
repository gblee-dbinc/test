import React, { useEffect, useState } from 'react';
import { List, Avatar, Tag, Typography, Calendar, Card ,Layout} from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../styles/pages/Dashboard.css'
import Stat from "../components/Stat";
import TaskList from "../components/TaskList";

const { Content } = Layout;
const { Text, Title } = Typography;

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

const CalendarList = () => {
  return (
    <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
    {/* 캘린더 */}
    <Card style={{ flex: 1, overflow: 'hidden', maxHeight: '400px' }}>
    <Calendar fullscreen={false} />
    </Card>

    {/* 선택 날짜의 업무 리스트 */}
    <Card style={{ flex: 1, maxHeight: '400px'}}>
    <Title level={4} style={{margin: '0 0 5px 0'}}>
        11/14 (목)
    </Title>
    <div
        style={{
        maxHeight: '300px', // 스크롤 가능한 최대 높이 설정
        overflowY: 'auto', // 세로 스크롤 활성화
        }}
    >
        <List
        itemLayout="horizontal"
        dataSource={tasks} // 더미 데이터 사용
        renderItem={(task) => (
            <List.Item>
            <List.Item.Meta
                title={<Text>{task.title}</Text>}
                description={<Text>{task.assignee.name}</Text>}
            />
            <Tag
                color={
                task.status === '진행 중'
                    ? 'blue'
                    : task.status === '완료'
                    ? 'green'
                    : task.status === '시작 전'
                    ? 'gray'
                    : 'red'
                }
            >
                {task.status}
            </Tag>
            </List.Item>
        )}
        />
    </div>
    </Card>

</div>
  )
}

export default CalendarList