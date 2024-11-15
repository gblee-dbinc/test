import { Typography, Card ,Layout, Button} from 'antd';
import AddTaskIcon from '@mui/icons-material/AddTask';
import '../styles/pages/Dashboard.css'
import Stat from "../components/Stat";
import TaskList from "../components/List";
import CalendarList from "../components/CalendarList";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    
  const navigation = useNavigate();
  const goToAddTaskPage = () => {
    navigation('/tasks/add');
  }

  //전체업무에서 사용자가 속한 프로젝트들의 업무 중 마감일 임박한 5개 업무 가져오기

  //기본 일자는 오늘, calendar에서 날짜 선택하면 마감일 기준 해당 날짜의 업무 리스트 조회

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection:'row'  }}>
    {/* 왼쪽 고정 영역 */}
    <Stat/>

    {/* 오른쪽 컨텐츠 영역 */}
    <Layout style={{ flex: 1,  overflowY: 'auto' }}>
      <Content
        style={{
          padding: '20px 100px',
          backgroundColor: '#fff',
          minHeight: '100vh',
          display: 'flex',
          overflowY: 'auto',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        
      {/* 상단 버튼 */}
      <div style={{ textAlign: 'right'}}>
              <Button
              size="large"
                type="primary"
                icon={<AddTaskIcon />}
                style={{ marginRight: '8px' }}
                onClick={goToAddTaskPage}
              >
                업무 추가하기
              </Button>
            </div>
      
      {/* 상단 업무 리스트 */}
      <Card style={{ flex: 1, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
        <Title level={4} style={{ margin:0 }}>업무 리스트</Title>
        <TaskList/>
      </Card>

      {/* 하단 캘린더와 업무 리스트 */}
      <CalendarList/>
      </Content>
    </Layout>
  </Layout>
  )
}

export default Dashboard