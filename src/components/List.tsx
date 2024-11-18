import React from 'react';
import { Table, Tag, Avatar, Typography, Tooltip } from 'antd';
import '../styles/components/List.css'; // CSS 파일 추가
import StatusTag from "./StatusTag";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface Assignee {
  assigneeId: string;
  assigneeName: string;
  assigneeProfile: string;
}
interface Task {
  taskId: string;
  projectId: number;
  taskName: string;
  description: string;
  assignees: Assignee[];
  createdDate: string;
  startDate: string;
  dueDate: string;
  frequencyId: number;
  commentCount: number;
  status: number;
  itoProcessId: number;
  assigneeConfirmation: string;
}

interface ListProps {
  taskList: Task[];
  loading: boolean;
}

const List: React.FC<ListProps> = ({ taskList, loading }) => {
  
  const navigate = useNavigate(); // navigate 함수 사용

  const columns = [
    {
      title: 'No.',
      key: 'index',
      align: 'center' as 'center',
      render: (_: any, __: any, index: number) => <Text>{index + 1}</Text>,
    },
    {
      title: '업무명',
      dataIndex: 'taskName',
      align: 'center' as 'center',
      key: 'taskName',
      render: (taskName: string) => (
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
          {taskName}
        </div>
      ),
    },
    {
      title: '담당자',
      dataIndex: 'assignees',
      key: 'assignees',
      align: 'center' as 'center',
      render: (assignees: Assignee[]) => {
        if (assignees.length === 1) {
          // 담당자가 1명일 경우 기존 방식
          const { assigneeProfile, assigneeName } = assignees[0];
          return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Avatar src={assigneeProfile} size="small" />
              <Text>{assigneeName}</Text>
            </div>
          );
        }

        // 담당자가 2명 이상일 경우 Avatar.Group 사용
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <Avatar.Group
              maxCount={2}
              maxStyle={{ color: '#f56a00' }}
            >
              {assignees.map((assignee, index) => (
                <Tooltip key={index} title={assignee.assigneeName} placement="top">
                  <Avatar src={assignee.assigneeProfile} size="small"/>
                </Tooltip>
              ))}
            </Avatar.Group>
            <Text>
              {assignees[0]?.assigneeName} 외 {assignees.length - 1}명
            </Text>
          </div>
        );
      },
    },
    {
      title: '진행상태',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as 'center',
      render: (status: number) => (
      <div>
        {StatusTag(status)}
      </div>
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

  // 행 클릭 이벤트 처리 함수
  const handleRowClick = (record: { taskId: string }) => {
    navigate(`/tasks/detail?taskId=${record.taskId}`); // 해당 taskId로 이동
  };

  return (
    <Table
      dataSource={taskList}
      columns={columns}
      pagination={false}
      rowKey="taskId"
      bordered={false}
      className="custom-table"
      locale={{ emptyText: '등록된 업무가 없습니다.' }} // 데이터가 없을 때 표시할 메시지
      onRow={(record) => ({
        onClick: () => handleRowClick(record), // 행 클릭 시 이벤트 호출
      })}
    />
  );
};

export default List;
