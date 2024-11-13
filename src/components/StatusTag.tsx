import { Tag } from 'antd';
import { ClockCircleOutlined, SyncOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// 상태 태그 렌더링 함수
const StatusTag= (status:number) => {
  switch (status) {
    case 0:
      return (
        <Tag
          icon={<ClockCircleOutlined />}
          color="default"
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          시작전
        </Tag>
      );
    case 1:
      return (
        <Tag
          icon={<SyncOutlined spin />}
          color="processing"
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          진행중
        </Tag>
      );
    case 2:
      return (
        <Tag
          icon={<CheckCircleOutlined />}
          color="success"
          style={{
            padding: '4px 12px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          완료
        </Tag>
      );
    case 3:
      return (
        <Tag
          icon={<ExclamationCircleOutlined />}
          color="#DB4A26"
          style={{
            padding: '4px 12px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          지연
        </Tag>
      );
    default:
      return null;
  }
};

export default StatusTag;