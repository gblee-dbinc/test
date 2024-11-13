import React from 'react';
import { Card, Typography, Grid, Badge } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

// Chart.js의 기본 요소를 등록합니다.
ChartJS.register(ArcElement, Tooltip, Legend);

const Stat: React.FC = () => {
  const screens = useBreakpoint(); // 화면 크기 감지
  const hasData = true; // 더미 데이터 유무
  const data = {
    labels: ['시작 전', '진행 중', '완료', '지연'],
    datasets: [
      {
        data: hasData ? [30, 40, 20, 10] : [1],
        backgroundColor: ['#CECECE', '#0887C9', '#86C440', '#DB4A26'],
        borderColor: ['#FFF'],
        borderWidth: 1,
        cutout: '75%',
      },
    ],
  };

  const badgeStatus = ['#CECECE', '#0887C9', '#86C440', '#DB4A26']

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: hasData },
    },
    maintainAspectRatio: false,
  };

  // 반응형 스타일
  const containerStyle: React.CSSProperties = screens.lg
    ? {
        width: '260px',
        backgroundColor: '#F8F7F1',
        height: '100vh',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }
    : {
        width: '100%',
        backgroundColor: '#F8F7F1',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      };

      const cardStyle: React.CSSProperties = screens.lg
    ? {
        marginTop: '40px'
      }
    : {
        width: '100%',
        display:'flex',
        flexDirection: 'column'
        
      };

      

  return (
    <div style={containerStyle}>
      <Title level={2} style={{ margin: '0 0 4px 0' }}>
        오늘의 통계
      </Title>
      <Text type="secondary" style={{fontSize:'larger'}}>2024/11/13 11:05:24</Text>

      <Card style={cardStyle}>
        <div style={{ width: '100%', height: '200px', position: 'relative', marginBottom:'30px'}}>
          <Title level={4} style={{ margin: 0 }}>
            이번 달 진행률
          </Title>
          <Doughnut data={data} options={options} />
        </div>

        {hasData ? (
          <ul style={{ padding: 0, marginTop: '20px', listStyle: 'none' }}>
            {['시작 전', '진행 중', '완료', '지연'].map((label, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <div>
                <Badge color={badgeStatus[index]} text={label}/>
                  
                </div>
                <div>
                  <span>%</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Text>현재 등록된 업무가 없습니다.</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Stat;
