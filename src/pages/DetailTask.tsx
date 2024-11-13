import React, { useState } from 'react';
import { Card, Tag, Avatar, Input, Button, Space, Typography, List, Popconfirm, Tooltip } from 'antd';
import {
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  HeartFilled,
  HeartOutlined,
  SyncOutlined, 
  FlagOutlined
} from '@ant-design/icons';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StatusTag from '../components/StatusTag';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Title, Text } = Typography;



const processColors: { [key: string]: string } = {
  리포팅: 'geekblue', // 진한 파랑
  보안: 'orange',      // 주황색
  용량: 'lime',        // 연두색
  변경: 'gold',        // 황금색
  가용성: 'purple',    // 보라색
  감사지원: 'magenta', // 자홍색
  구성: 'cyan',        // 청록색
  배포: 'volcano',     // 화산색 (붉은 주황색)
};

const DetailTask: React.FC = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '홍길동',
      authorId: 'user1', // 작성자 ID
      avatar: 'https://via.placeholder.com/40',
      content: '첫 번째 댓글입니다!',
      date: '2024-11-12',
      isLiked: false, // 좋아요 상태
      likeCount: 1
    },
    {
      id: 2,
      author: '김영희',
      authorId: 'user2', // 작성자 ID
      avatar: 'https://via.placeholder.com/40',
      content: '두 번째 댓글입니다!',
      date: '2024-11-12',
      isLiked: false, // 좋아요 상태
      likeCount: 0
    },
  ]);

  const handleLike = (commentId:number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, isLiked: true }
          : comment
      )
    );
  };
  
  const currentUserId = 'user1'; // 현재 로그인된 사용자 ID

  const [task, setTask] = useState({
    taskName: '주간 리포팅 작성',
    status: 2,
    startDate: '2024-11-01',
    dueDate: '2024-11-15',
    process: '리포팅',
    description: '매주 진행 상황에 대한 리포트를 작성합니다.',
    isRecurring: true,
    assignee: {
      assigneeId: 'test',
      name: '이수진',
      profile: 'https://via.placeholder.com/40',
    },
    confirmationAssignee: 'Y'
  });

  const handleAddComment = (value: string) => {
    // if (!value.trim()) return;
    // setComments((prev) => [
    //   ...prev,
    //   {
    //     id: prev.length + 1,
    //     author: '현재 사용자',
    //     avatar: 'https://via.placeholder.com/40',
    //     content: value,
    //     date: new Date().toISOString().split('T')[0],
    //   },
    // ]);
  };

  const handleChangeStatusToComplete = () => {
    
  };

  const navigate = useNavigate();
  const handleEdit = () => {
    console.log(typeof(task.dueDate))
    navigate('/tasks/edit', { state: { task } }); // task 데이터 전달
  };

  const handleDelete = () => {
    console.log('Delete task logic here');
  };

  const handleEditComment = (commentId:number) => {
    console.log('Edit Comment logic here');
  };

  const handleDeleteComment = (commentId:number) => {
    console.log('Delete Comment logic here');
  };

  return (
     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
    
      {/* 카드 상단 */}
      <Card bordered={false} style={{ marginBottom: '20px' }}>
        {/* 프로세스 태그 */}
        <Space
  align="center"
  style={{
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }}
>
  {/* ITO 프로세스 태그 */}
  <Space align="center" style={{ display: 'flex', alignItems: 'center' }}>
    

    {/* 제목 */}
    <Title level={2} style={{ fontWeight:'bold', margin:0}}>
      {task.taskName}
    </Title>
    {task.isRecurring && (
    <SyncOutlined
    style={{
      fontSize: '20px',
      color: '#c9c9c9',
      marginLeft: '8px',
      verticalAlign: 'middle', // 아이콘 수직 중앙 정렬
    }}
  />

  )}
  </Space>

  {/* 상태 */}
  
</Space>


        {/* 상세정보 */}
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space align="center">
            <CalendarOutlined style={{ fontSize: '18px', color: '#F37920' }} />
            <Space>
            <Text style={{ fontSize: '16px', fontWeight:'bold'}}>기간</Text> 
              <Text> {task.startDate} ~ {task.dueDate}</Text>
            </Space>
          </Space>

          <Space align="center">
          <AccountTreeOutlinedIcon style={{ fontSize: '18px', color: '#52c41a' , verticalAlign: 'middle'}} />
            <Space>
            <Text style={{ fontSize: '16px', fontWeight:'bold'}}>ITO 프로세스</Text>
              <Tag
                color={processColors[task.process]}
                style={{
                    padding: '3px 6px',
                    borderRadius: '3px',
                    margin: '0 12px',
                }}
                >
                {task.process}
                </Tag>
            </Space>
          
          </Space>

          <Space align="center" style={{ display: 'flex', alignItems: 'center' }}
          >
            <UserOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
            <Space>
            <Text style={{ fontSize: '16px', fontWeight:'bold'}}>담당자</Text>
              <Avatar src={task.assignee.profile} />
              <Text> {task.assignee.name}</Text>
              {task.confirmationAssignee==='N'
              ?<Tooltip title="담당자 확인 전" color={'#c9c9c9'} placement="right">
                <RadioButtonUncheckedIcon style={{color:'#c9c9c9', verticalAlign: 'middle'}}/>
              </Tooltip>
              :<Tooltip title="담당자 확인 완료" color={'#006AFF'} placement="right">
                <CheckCircleIcon style={{color:'#006AFF', verticalAlign: 'middle'}}/>
            </Tooltip>
            }
              
            </Space>
          </Space>

          <Space>
          <FlagOutlined style={{ fontSize: '18px', color: '#00844A' }} />
            <Space>
            <Text style={{ fontSize: '16px', fontWeight:'bold'}}>상태</Text>
              <div>
     {StatusTag(task.status)}
  </div>
            </Space>
</Space>
          <Space align="center">
            <FileTextOutlined style={{ fontSize: '18px', color: '#722ed1' }} />
            <Space>
            <Text style={{ fontSize: '16px', fontWeight:'bold'}}>내용</Text>
              <Text> {task.description}</Text>
            </Space>
          </Space>
        </Space>

        {/* 버튼 */}
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
        {
            task.status!==2?
                <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleChangeStatusToComplete}
                style={{ marginRight: '8px' }}
                >
                완료
                </Button>
              :<></>
        }
          

          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={handleEdit}
            style={{ marginRight: '8px' }}
          >
            수정
          </Button>
          <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={handleDelete}>
            <Button type="default" danger icon={<DeleteOutlined />}>
              삭제
            </Button>
          </Popconfirm>
        </div>
      </Card>

      {/* 댓글 섹션 */}
      <Card bordered={false} title={<h3><MessageOutlined /> 댓글</h3>}>
        <List
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item style={{ display: 'flex', alignItems: 'flex-start' }}>
  {/* 프로필 */}
  <Avatar src={comment.avatar} size={48} style={{ marginRight: '16px' }} />

  {/* 댓글 내용 */}
  <div style={{ flex: 1 }}>
    {/* 작성자와 날짜 */}
    <div>
      <Text strong>{comment.author}</Text>
      <Text type="secondary" style={{ marginLeft: '8px' }}>
        {comment.date}
      </Text>
    </div>

    {/* 댓글 내용 */}
    <div style={{ marginTop: '8px' }}>{comment.content}</div>

    {/* 좋아요 버튼 */}
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
      <Button
        type="text"
        icon={comment.isLiked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
        onClick={() => handleLike(comment.id)}
      />
      <Text style={{ marginLeft: '8px' }}>{comment.likeCount}</Text>
    </div>
  </div>

  {/* 삭제 버튼 (작성자만 표시) */}
  {comment.authorId === currentUserId && (
    <div style={{ marginLeft: '16px' }}>
      <Popconfirm
        title="댓글을 삭제하시겠습니까?"
        onConfirm={() => handleDeleteComment(comment.id)}
      >
        <Button type="text" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </div>
  )}
</List.Item>

          

          )}
        />
        <Space direction="vertical" style={{ width: '100%', marginTop: '20px', textAlign: 'right' }}>
          <TextArea rows={3} placeholder="댓글을 작성하세요..." />
          <Button type="primary" onClick={() => handleAddComment('새 댓글')}>
            댓글 작성
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default DetailTask;
