import { Avatar, Tag, Typography, Calendar, Card , Table} from 'antd';
import '../styles/pages/Dashboard.css'
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 반드시 추가해야 함
import '../styles/components/CalendarList.css'

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
    {
      id: 6,
      title: '업무 5',
      assignee: { name: '홍길동', profile: 'https://i.pravatar.cc/40?img=5' },
      status: '진행 중',
      dueDate: '2024-11-20',
    },
    {
      id: 7,
      title: '업무 5',
      assignee: { name: '홍길동', profile: 'https://i.pravatar.cc/40?img=5' },
      status: '진행 중',
      dueDate: '2024-11-20',
    },
    {
      id: 8,
      title: '업무 5',
      assignee: { name: '홍길동', profile: 'https://i.pravatar.cc/40?img=5' },
      status: '진행 중',
      dueDate: '2024-11-20',
    },
  ];


  interface Task {
    taskId: number;
    projectId: number;
    taskName: string;
    description: string;
    assigneeId: string;
    createdDate: string;
    startDate: string;
    dueDate: string;
    frequencyId: number;
    commentCount: number;
    status: number;
    itoProcessId: number;
    assigneeConfirmation: string;
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]// 'YYYY-MM-DD' 형식으로 변환
  };
const CalendarList = () => {

  // useState의 타입을 명시적으로 지정
  const [selectedDateEvents, setSelectedDateEvents] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));
  const [eventList, setEventList] = useState<Task[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');
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
  ];
  

  const handleDatesSet = async (dateInfo: any) => {
    const month = dateInfo.view.currentStart.getMonth() + 1;
    const year = dateInfo.view.currentStart.getFullYear();
    const formattedMonth = `${year}-${month < 10 ? '0' : ''}${month}`;
    setCurrentMonth(formattedMonth);


    // const userInfo = sessionStorage.getItem("userInfo")
    //     ? JSON.parse(sessionStorage.getItem("userInfo") as string)
    //     : null;

    // const projectIds = userInfo ? userInfo.projectId : []; // 유저의 프로젝트 ID 배열 가져오기

    // try {
    //   // `getTaskByMonth` 호출하여 데이터를 가져옴
    //   const tasksForMonth = await getTaskByMonth(year, month, projectIds);
    //   setEventList(tasksForMonth || []); // tasksForMonth가 undefined면 빈 배열로 설정
    // } catch (error) {
    //   console.error("Error fetching tasks:", error);
    //   setEventList([]); // 오류 발생 시 빈 배열로 설정
    // }
};

const handleDateClick = (info: any) => {
  setSelectedDate(info.dateStr);
  
  //console.log(selectedDate)
  //const selectedDate = info.dateStr; // 클릭한 날짜 (YYYY-MM-DD 형식)
  const eventsForSelectedDate = eventList.filter(event => event.dueDate === selectedDate);
  setSelectedDateEvents(eventsForSelectedDate);
};



// 날짜를 'MM/DD' 형식으로 변환하는 함수
const formatToMMDD = (date: string) => {
  //return new Date(date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }); // 'MM/DD/YYYY' 형식
  return new Date(date)
  .toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short', // 요일을 짧은 형식으로 표시
  }).replace(/\.\s/g, '/') // '.' 뒤의 공백을 '/'로 변경
  .replace(/\/\(/g, ' ('); // 요일 앞의 불필요한 '/' 제거
  
};

// 날짜 셀에 이벤트 개수 표시
const renderDayCellContent = (cellInfo: any) => {
  const cellDate = formatDate(new Date(cellInfo.date)); // 'YYYY-MM-DD' 형식으로 변환
  const dateEvents = eventList.filter(event => formatDate(new Date(event.dueDate as string)) === cellDate); // 해당 날짜의 이벤트 필터링
  
  const eventCount = dateEvents.length; // 이벤트 개수

  return (
    <div style={{ textAlign: 'center'}}>
      <p style={{cursor: 'pointer'}}>{cellInfo.dayNumberText}</p> {/* 날짜 표시 */}
      {eventCount > 0 && (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      
      <span style={{ color: '#000000', fontSize:'0.8em' }}>+{eventCount}</span> {/* 이벤트 개수 표시 */}
    </div>
      )}
    </div>
  );
};

// 이벤트를 렌더링하지 않도록 처리
const renderEventContent = () => {
  return null; // 이벤트 제목을 숨기고 커스텀 렌더링 비활성화
};


  return (
    <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',padding: '8px' }}>
     <div style={{ display: 'flex', gap: '40px', height: '100%' }}>
    
     <div style={{ flex: 1, 
  display: 'flex',
    flexDirection: 'column',width: '100%', height: '100%',
    boxSizing: 'border-box', 
    overflow: 'hidden'}}>
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={eventList}
      dateClick={handleDateClick}
      headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next',
      }}
      titleFormat={{
        month: '2-digit',
      }}
      eventContent={renderEventContent}
      dayCellContent={renderDayCellContent}
      height="auto" // 높이를 자동으로 설정
      contentHeight="auto" // 콘텐츠 높이를 자동 조정
      handleWindowResize={true} // 창 크기에 맞게 자동 조정
      datesSet={handleDatesSet}
    />
  </div>

  <div style={{ flex: 1, display: 'flex',
    flexDirection: 'column',width: '100%', height: '100%',
    boxSizing: 'border-box', 
    overflow: 'hidden'}}>
    <Title level={4} style={{margin: '0 0 5px 0'}}>
        11/14 (목)
    </Title>
    <div
        style={{
        maxHeight: '400px', // 스크롤 가능한 최대 높이 설정
        overflowY: 'auto', // 세로 스크롤 활성화
        }}
    >
        

      <Table
        dataSource={tasks}
        columns={columns}
        pagination={false}
        rowKey="id"
        bordered={false}
        className="custom-table"
      /> 
    </div>
    </div>
  </div>
 
</Card>

  )
}

export default CalendarList