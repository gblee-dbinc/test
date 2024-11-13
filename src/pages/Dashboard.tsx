import React, { useEffect, useState } from 'react';
import { List, Avatar, Tag, Typography, Calendar, Card ,Layout, Button} from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../styles/pages/Dashboard.css'
import Stat from "../components/Stat";
import TaskList from "../components/TaskList";
import CalendarList from "../components/CalendarList";

const { Content } = Layout;
const { Text, Title } = Typography;

const Dashboard = () => {
    
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection:'row' }}>
    {/* 왼쪽 고정 영역 */}
    <Stat/>

    {/* 오른쪽 컨텐츠 영역 */}
    <Layout style={{ flex: 1, overflow: 'hidden' }}>
      <Content
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          minHeight: '100vh',
          display: 'flex',
          overflowY: 'auto',
        }}
      >
        {/* 오른쪽 영역 내용 */}
        <div
      style={{
        padding: '0 20px',
        backgroundColor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* 상단 버튼 */}
      <div style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
              >
                업무 추가하기
              </Button>
            </div>
      
      {/* 상단 업무 리스트 */}
      <Card style={{ flex: 1}}>
        <Title level={4} style={{ margin:0 }}>업무 리스트</Title>
        <TaskList/>
      </Card>

      {/* 하단 캘린더와 업무 리스트 */}
      <CalendarList/>
    </div>
      </Content>
    </Layout>
  </Layout>
  )
}

export default Dashboard