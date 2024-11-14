import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Switch,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Avatar,
  FormInstance
} from 'antd';
import { addTask } from '../api/task/addTask';
import { getUserByProjectId } from '../api/user/getUserByProjectId';
import { getProjectsByProjectId } from '../api/user/getProjectsByProjectId';
import dayjs from 'dayjs';
import styles from '../styles/pages/AddTask.module.css';
import '../styles/pages/AddTask.css';
import { useNavigate } from "react-router-dom";
import addTaskIcon from '../styles/images/AddtaskIcon.png'


const { Option } = Select;

// 예제 유저 데이터
const userListData = [
  {
    userId: '1',
    userName: 'John Doe',
    profileImage: 'https://via.placeholder.com/40', // 예제 프로필 이미지 URL
  },
  {
    userId: '2',
    userName: 'Jane Smith',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    userId: '3',
    userName: 'Alice Brown',
    profileImage: 'https://via.placeholder.com/40',
  },
];



interface Project {
  
  projectId: string;
  name: string;
  description: string;
  smtpUrl?: string;
  smtpId?: string;
  smtpPw?: string;

}

const AddTask: React.FC = () => {

  const [form] = Form.useForm<FormInstance>(); //


  const [taskName, setTaskName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [processId, setProcessId] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
    
    
  // userList의 타입을 User[]로 설정
  const [userList, setUserList] = useState<User[]>(userListData);
  const [projectList, setProjectList] = useState<Project[]>([]); // 여러 프로젝트 지원을 위한 배열
  


  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [frequencyType, setFrequencyType] = useState<string>('daily');
  const [hasEndDate, setHasEndDate] = useState(false);
  const [frequencyInterval, setFrequencyInterval] = useState<number>(1);
  const [dailyFrequencyInterval, setDailyFrequencyInterval] = useState<string>('1');
  const [weeklyFrequencyInterval, setWeeklyFrequencyInterval] = useState<string>('1');
  const [monthlyFrequencyInterval, setMonthlyFrequencyInterval] = useState<string>('1');
  const [weeklyDay, setWeeklyDay] = useState<string[]>([]);
  const [monthlyDayOfMonth, setMonthlyDayOfMonth] = useState<number | null>(null);
  const [monthlyWeekOfMonth, setMonthlyWeekOfMonth] = useState<number | null>(null);
  const [monthlyDayOfWeek, setMonthlyDayOfWeek] = useState<string>('');
  const [yearlyMonth, setYearlyMonth] = useState<number | null>(null);
  const [yearlyDayOfMonth, setYearlyDayOfMonth] = useState<number | null>(null);
  const [yearlyWeekOfMonth, setYearlyWeekOfMonth] = useState<number | null>(null);
  const [yearlyDayOfWeek, setYearlyDayOfWeek] = useState<string>('');

    const navigate = useNavigate();

    interface User {
      userId: string;
      userName: string;
      profileImage: string;
      // 필요에 따라 추가 속성 정의 가능
    }
    
    

    


    const dayMapping: Record<string, string> = {
      '일': 'SUNDAY',
      '월': 'MONDAY',
      '화': 'TUESDAY',
      '수': 'WEDNESDAY',
      '목': 'THURSDAY',
      '금': 'FRIDAY',
      '토': 'SATURDAY',
  };
  
  const numberToDay: Record<number, string> = {
      0: '일',
      1: '월',
      2: '화',
      3: '수',
      4: '목',
      5: '금',
      6: '토',
  };
  

  const fetchProjects = async () => {
    try {
      const userInfo = sessionStorage.getItem('userInfo')
        ? JSON.parse(sessionStorage.getItem('userInfo') as string)
        : null;
      const resProjectList = await getProjectsByProjectId(userInfo.projectId);
      setProjectList(resProjectList);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async (projectId: string) => {
    try {
      const resUserList = await getUserByProjectId(projectId);
      setUserList(resUserList || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (value: string[]) => {
    console.log('Selected users:', value);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectChange = (value: string) => {
    fetchUsers(value);
  };

  function getWeekOfMonthForSpecificDay(date:Date) {
    const dayOfWeek = date.getDay(); // 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    let count = 0;
  
    // 해당 월의 첫 날부터 날짜를 증가시키며 해당 요일에 도달할 때마다 count 증가
    for (let d = 1; d <= date.getDate(); d++) {
        const currentDay = new Date(date.getFullYear(), date.getMonth(), d);
        
        if (currentDay.getDay() === dayOfWeek) {
            count++;
        }
  
        if (currentDay.getDate() === date.getDate()) {
            break;
        }
    }
  
    return count;
  }
  
  function getDayOfWeek(date:Date) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()];
  }

  const handleFrequencyOptions = () => {
    switch (frequencyType) {
      case 'daily':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', border:'1px solid #000', justifyContent:'center' }}>
             {/* "일 마다" 입력 필드 한 줄로 배치 */}
      <Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          <Form.Item
            name="dailyInterval"
            initialValue={1}
            noStyle
            rules={[{ required: true, message: '일 수를 입력하세요.' }]}
          >
            <Input size="large" type="number" min={1} placeholder="1" style={{ width: '100px' }} />
            <label style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>일 마다</label>
          </Form.Item>
        </div>
      </Form.Item>

      {/* 종료일 옵션과 DatePicker 한 줄로 배치 */}
      <Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          

          <Radio.Group
            value={hasEndDate}
            onChange={(e) => setHasEndDate(e.target.value)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Radio value={false}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 없음</span></Radio>
            <Radio value={true}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 있음</span></Radio>
          </Radio.Group>

          {hasEndDate && (
            <Form.Item
              name="endDate"
              noStyle
              rules={[{ required: true, message: '종료일을 선택하세요.' }]}
            >
              <DatePicker size="large" placeholder="종료일 선택" />
            </Form.Item>
          )}
        </div>
      </Form.Item>
          </div>
        );
      case 'weekly':
        return (
          <>
          <Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          <Form.Item
            name="weeklyInterval"
            initialValue={1}
            noStyle
            rules={[{ required: true, message: '주 수를 입력하세요.' }]}
          >
            <Input size="large" type="number" min={1} placeholder="1" style={{ width: '100px' }} />
            <label style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>주 마다</label>
          </Form.Item>
        </div>
      </Form.Item>
          <Form.Item name="weeklyDays" style={{ width: '100%', display:'flex', justifyContent: 'center' }}>
            <Checkbox.Group
              options={[
                { label: '일', value: 'SUNDAY' },
                { label: '월', value: 'MONDAY' },
                { label: '화', value: 'TUESDAY' },
                { label: '수', value: 'WEDNESDAY' },
                { label: '목', value: 'THURSDAY' },
                { label: '금', value: 'FRIDAY' },
                { label: '토', value: 'SATURDAY' },
              ]}
              value={weeklyDay}
              onChange={(checkedValues: string[]) => setWeeklyDay(checkedValues)}
            />
          </Form.Item>
          {/* 종료일 옵션과 DatePicker 한 줄로 배치 */}
      <Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Radio.Group
            value={hasEndDate}
            onChange={(e) => setHasEndDate(e.target.value)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Radio value={false}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 없음</span></Radio>
            <Radio value={true}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 있음</span></Radio>
          </Radio.Group>

          {hasEndDate && (
            <Form.Item
              name="endDate"
              noStyle
              rules={[{ required: true, message: '종료일을 선택하세요.' }]}
            >
              <DatePicker size="large" placeholder="종료일 선택" />
            </Form.Item>
          )}
        </div>
      </Form.Item>
          </>
        );
      case 'monthly':
        return (
          <>
          <Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          <Form.Item
            name="monthlyInterval"
            initialValue={1}
            noStyle
            rules={[{ required: true, message: '개월 수를 입력하세요.' }]}
          >
            <Input size="large" type="number" min={1} placeholder="1" style={{ width: '100px' }} />
            <label style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>개월 마다</label>
          </Form.Item>
        </div>
      </Form.Item>
          <Form.Item name="monthlyOption">
            <Radio.Group>
              <Space direction="horizontal">
                <Radio value="dayOfMonth">{`${new Date(startDate).getDate()}일`}</Radio>
                <Radio value="weekOfMonth">{`${getWeekOfMonthForSpecificDay(new Date(startDate))}번째 ${getDayOfWeek(new Date(startDate))}요일`}</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          {/* 종료일 옵션과 DatePicker 한 줄로 배치 */}
      <Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Radio.Group
            value={hasEndDate}
            onChange={(e) => setHasEndDate(e.target.value)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Radio value={false}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 없음</span></Radio>
            <Radio value={true}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 있음</span></Radio>
          </Radio.Group>

          {hasEndDate && (
            <Form.Item
              name="endDate"
              noStyle
              rules={[{ required: true, message: '종료일을 선택하세요.' }]}
            >
              <DatePicker size="large" placeholder="종료일 선택" />
            </Form.Item>
          )}
        </div>
      </Form.Item>
          </>
        );
      case 'yearly':
        return (
        <>
          <Form.Item name="yearlyOption">
            <Radio.Group>
              <Space direction="horizontal">
                <Radio value="yearlyDayOfMonth">{`${new Date(startDate).getMonth()+1}월 ${new Date(startDate).getDate()}일`}</Radio>
                <Radio value="yearlyWeekOfMonth">{`${new Date(startDate).getMonth()+1}월 ${getWeekOfMonthForSpecificDay(new Date(startDate))}번째 ${getDayOfWeek(new Date(startDate))}요일`}</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          {/* 종료일 옵션과 DatePicker 한 줄로 배치 */}
      <Form.Item>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Radio.Group
            value={hasEndDate}
            onChange={(e) => setHasEndDate(e.target.value)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Radio value={false}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 없음</span></Radio>
            <Radio value={true}><span style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>종료일 있음</span></Radio>
          </Radio.Group>

        {hasEndDate && (
          <Form.Item
            name="endDate"
            noStyle
            rules={[{ required: true, message: '종료일을 선택하세요.' }]}
          >
            <DatePicker size="large" placeholder="종료일 선택" />
          </Form.Item>
        )}
      </div>
    </Form.Item>
    </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const taskData = {
        ...values,
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        dueDate: values.dateRange[1].format('YYYY-MM-DD'),
        recurring: isRecurring,
        frequencyType,
        hasEndDate,
      };

      console.log('Task Data:', taskData);
      const response = await addTask(taskData);
      console.log('Task added successfully:', response);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img src={addTaskIcon} alt="ICON" style={{ height: '24px' }} />
    업무 생성
  </div>
</h1>
      
        <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit}
        initialValues={{
          dateRange: [dayjs(), dayjs()],
          frequencyType: 'daily',
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left" // 레이블 왼쪽 정렬
        style={{ margin: '0 auto', textAlign: 'left' }}
      >

        {/* 제목 */}
        <Form.Item
          label="제목"
          name="taskName"
          rules={[{ required: true, message: '제목을 입력하세요.' }]}
        >
          <Input placeholder="제목을 입력하세요" size="large"/>
        </Form.Item>

      {/* 시작일 및 종료일 */}
      <Form.Item
  label="기간"
  required
  style={{ marginBottom: '16px' }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    {/* 시작일 */}
    <Form.Item
      name="startDate"
      style={{ marginBottom: 0 }}
      rules={[{ required: true, message: '시작일을 선택하세요.' }]}
    >
      <DatePicker size="large" placeholder="시작일 선택" />
    </Form.Item>
    <span>~</span>
    {/* 종료일 */}
    <Form.Item
      name="endDate"
      style={{ marginBottom: 0 }}
      rules={[{ required: true, message: '마감일을 선택하세요.' }]}
    >
      <DatePicker size="large" placeholder="마감일 선택" />
    </Form.Item>

    {/* 반복 여부 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>반복 여부:</span>
      <Switch checked={isRecurring} onChange={setIsRecurring} />
    </div>
  </div>
</Form.Item>

    


    {/* 반복 설정 */}
    {isRecurring && (
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '16px', 
        border: '1px solid #000', 
        justifyContent: 'center' 
    }}>
      <Form.Item
        label=""
        name="frequencyType"
        rules={[{ required: true, message: '반복 유형을 선택하세요.' }]}
        style={{ width: '100%', display:'flex', justifyContent: 'center' }}
      >
          
          <Radio.Group
            onChange={(e) => setFrequencyType((e.target.value))}
            value={frequencyType}
            style={{
              width: '100%',
              display: 'flex', // 버튼들을 한 줄로 정렬
              
            }}
          >
            <Radio.Button  style={{ flex: '1', textAlign: 'center', whiteSpace:'nowrap' }} value="daily">매일</Radio.Button>
            <Radio.Button  style={{ flex: '1', textAlign: 'center', whiteSpace:'nowrap' }} value="weekly">매주</Radio.Button>
            <Radio.Button  style={{ flex: '1', textAlign: 'center', whiteSpace:'nowrap' }} value="monthly">매월</Radio.Button>
            <Radio.Button  style={{ flex: '1', textAlign: 'center', whiteSpace:'nowrap' }} value="yearly">매년</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {handleFrequencyOptions()}
      </div>
    )}

{/* 프로세스 */}
<Form.Item
  label="ITO 프로세스"
  name="processId"
  rules={[{ required: true, message: '프로세스를 선택하세요.' }]}
>
  <Select
    placeholder="프로세스를 선택하세요"
    size="large"
    value={processId}
    onChange={(value:string) => setProcessId(value)}
    allowClear
  >
    <Select.Option value="1">리포팅</Select.Option>
    <Select.Option value="2">보안</Select.Option>
    <Select.Option value="3">용량</Select.Option>
    <Select.Option value="4">변경</Select.Option>
    <Select.Option value="5">가용성</Select.Option>
    <Select.Option value="6">감사지원</Select.Option>
    <Select.Option value="7">구성</Select.Option>
    <Select.Option value="8">배포</Select.Option>
  </Select>
</Form.Item>


        {/* 프로젝트 */}
        <Form.Item
          label="프로젝트"
          name="projectId"
          rules={[{ required: true, message: '프로젝트를 선택하세요.' }]}
        >
          <Select
          size="large"
            placeholder="프로젝트를 선택하세요"
            onChange={handleProjectChange}
          >
            {projectList.map((project: any) => (
              <Option key={project.projectId} value={project.projectId}>
                {project.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 담당자 */}
        <Form.Item
          label="담당자"
          name="assigneeIds"
          rules={[{ required: true, message: '담당자를 선택하세요.' }]}
        >
          <Select
          size="large"
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Select users"
      onChange={handleChange}
    >
      {userList.map((user) => (
        <Option key={user.userId} value={user.userId}>
          <Space>
            <Avatar src={user.profileImage} />
            {user.userName}
          </Space>
        </Option>
      ))}
    </Select>
        </Form.Item>

        {/* 설명 */}
        <Form.Item
          label="내용"
          name="description"
          rules={[{ required: true, message: '내용을 입력하세요.' }]}
        >
          <Input.TextArea rows={4} placeholder="내용을 입력하세요" size="large"/>
        </Form.Item>

        {/* 버튼 */}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" size="large">
              등록
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()} size="large">
              취소
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTask;
