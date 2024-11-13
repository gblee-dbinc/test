import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Checkbox, Avatar, Space, Tag, Switch, Radio } from 'antd';
import { useLocation } from 'react-router-dom';
import { CalendarOutlined, AppstoreAddOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from '../styles/pages/EditTask.module.css';
import { getUserByProjectId } from '../api/user/getUserByProjectId';
import { getProjectsByProjectId } from '../api/user/getProjectsByProjectId';


const { Option } = Select;  // Option을 여기서 가져옵니다.
interface Task {
  taskName: string;
  status: number;
  startDate: string;
  dueDate: string;
  process: string;
  description: string;
  isRecurring: boolean;
  assignee: {
    asigneeId: string;
    name: string;
    profile: string;
  };
}

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

const EditTask = () => {
  const location = useLocation();
  const { task }: { task: Task } = location.state || {};

  const [form] = Form.useForm();

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
  
  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        taskName: task.taskName,
        process: task.process,
        startDate: dayjs(task.startDate),
        dueDate: dayjs(task.dueDate),
        assignee: task.assignee.name,
        description: task.description,
        isRecurring: task.isRecurring,
      });
    }
  }, [task, form]);

  const handleSubmit = (values: any) => {
    console.log('Updated task:', values);
    // 수정된 데이터를 서버로 전송하거나 상태 업데이트 등을 처리할 수 있습니다.
  };

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

const handleChange = (value: string[]) => {
    console.log('Selected users:', value);
  };

  const handleProjectChange = (value: string) => {
    fetchUsers(value);
  };

const fetchUsers = async (projectId: string) => {
  try {
    const resUserList = await getUserByProjectId(projectId);
    setUserList(resUserList || []);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <EditOutlined style={{ fontSize: '24px' }} />
    업무 수정
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
          rules={[{ required: true, message: `${task.taskName}` }]}
        >
          <Input placeholder="제목을 입력하세요" />
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
      <DatePicker placeholder="시작일 선택" />
    </Form.Item>
    <span>~</span>
    {/* 종료일 */}
    <Form.Item
      name="endDate"
      style={{ marginBottom: 0 }}
      rules={[{ required: true, message: '마감일을 선택하세요.' }]}
    >
      <DatePicker placeholder="마감일 선택" />
    </Form.Item>

    {/* 반복 여부 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>반복 여부:</span>
      <Switch checked={isRecurring} onChange={setIsRecurring} />
    </div>
  </div>
</Form.Item>

    


    {/* 반복 설정
    {isRecurring && (
      <>
        <Form.Item
          label=""
          name="frequencyType"
          
          rules={[{ required: true, message: '반복 유형을 선택하세요.' }]}
        >
          <Radio.Group
            onChange={(e) => setFrequencyType(e.target.value)}
            value={frequencyType}
          >
            <Radio.Button value="daily">매일</Radio.Button>
            <Radio.Button value="weekly">매주</Radio.Button>
            <Radio.Button value="monthly">매월</Radio.Button>
            <Radio.Button value="yearly">매년</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {handleFrequencyOptions()}
      </>
    )} */}

{/* 프로세스 */}
<Form.Item
  label="ITO 프로세스"
  name="processId"
  rules={[{ required: true, message: '프로세스를 선택하세요.' }]}
>
  <Select
    placeholder="프로세스를 선택하세요"
    value={processId}
    onChange={(value) => setProcessId(value)}
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
          <Input.TextArea rows={4} placeholder="내용을 입력하세요" />
        </Form.Item>

        {/* 버튼 */}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              수정
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              취소
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditTask;
