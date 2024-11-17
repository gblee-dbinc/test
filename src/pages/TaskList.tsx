import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import Search from '../components/Search';
import List from '../components/List';
import { getAllTask } from "../api/task/getAllTask";
import { searchTask } from "../api/task/searchTask";

const { Title } = Typography;

// // 더미 데이터
// const tasks = Array.from({ length: 50 }, (_, index) => ({
//   id: index + 1,
//   taskName: `업무 ${index + 1}`,
//   assignee: `담당자 ${index + 1}`,
//   process: `프로세스 ${index % 3 + 1}`,
//   part: `파트 ${index % 5 + 1}`,
//   startDate: '2024-11-01',
//   dueDate: '2024-11-30',
// }));


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

const TaskList: React.FC = () => {
  const [filteredData, setFilteredData] = useState();

  // 테이블 컬럼 정의
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '업무명',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (text: string) => (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            padding: '4px 8px',
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
      align: 'center',
    },
    {
      title: 'ITO 프로세스',
      dataIndex: 'process',
      key: 'process',
      align: 'center',
    },
    {
      title: '파트',
      dataIndex: 'part',
      key: 'part',
      align: 'center',
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
    },
    {
      title: '마감일',
      dataIndex: 'dueDate',
      key: 'dueDate',
      align: 'center',
    },
  ];


  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [filters, setFilters] = useState<{
    projectIds?: string[];
    itoProcessId?: string;
    unit?: string;
    assigneeId?: string;
    startDate?: string;
    dueDate?: string;
    taskName?: string;
  }>({});

  const userInfo = sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo") as string)
    : null;

  const fetchTasks = async (page: number, size: number) => {
    if (!userInfo || !userInfo.projectId) return;

    setLoading(true);
    try {
      const response = await getAllTask(userInfo.projectId, page, size);
      setTaskList(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredTasks = async () => {
    setLoading(true);
    try {
      const result = await searchTask({ ...filters, projectIds: userInfo.projectId }, page, size);
      setTaskList(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to search tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      fetchTasks(page, size);
    } else {
      fetchFilteredTasks();
    }
  }, [page, size, filters]);

  const handleSearch = async (newFilters: {
    projectIds?: string[];
    itoProcessId?: string;
    unit?: string;
    assigneeId?: string;
    startDate?: string;
    dueDate?: string;
    taskName?: string;
  }) => {
    setFilters(newFilters);
    setPage(0); // 검색 조건이 변경되면 페이지를 첫 페이지로 초기화
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };


  return (
    <div
    style={{
      padding: '40px 100px',
      backgroundColor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
    >
      <Title level={3} style={{margin:0}}>업무 조회</Title>

      <Search onSearch={handleSearch} />
      {/* 테이블 */}
      <List taskList={taskList} loading={loading} />
    </div>
  );
};

export default TaskList;
