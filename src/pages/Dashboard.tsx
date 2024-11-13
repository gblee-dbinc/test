import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import '../styles/pages/Dashboard.css'
const { Sider, Content } = Layout;


const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh', padding: '0' }}>
      {/* 사이드바 */}
      <Sider width={250} style={{backgroundColor: '#F8F7F1'}}>
        
      </Sider>

      {/* 오른쪽 컨텐츠 영역 */}
      <Layout style={{ padding: '20px' }}>
        <Content style={{  margin: 0, minHeight: 280 }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              {/* Stat 컴포넌트를 표시 */}
              
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard