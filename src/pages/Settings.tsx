import React, { useState } from 'react';
import { Card, Form, Input, Button, Avatar, Upload, message, Typography, Space, Divider, Tag, Select } from 'antd';
import TuneIcon from '@mui/icons-material/Tune';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd';
import { Option } from 'antd/es/mentions';

const { Title, Text } = Typography;

const Settings = () => {
  const [form] = Form.useForm<FormInstance>(); // 명시적 타입 설정
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    position: '프로',
    projects: ['프로젝트 A', '프로젝트 B'],
    part: '네트워크',
  });

  const handleFinish = (values: any) => {
    setUserInfo(values);
    setEditing(false);
    message.success('회원정보가 수정되었습니다.');
  };

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Card bordered={false}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar
            size={100}
            src={profileImage || 'https://via.placeholder.com/100'}
            icon={!profileImage && <UserOutlined />}
            style={{ marginRight: '20px' }}
          />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {userInfo.name} {userInfo.position}님, 안녕하세요!
            </Title>
            {editing && (
              <Upload showUploadList={false} onChange={handleUpload} accept="image/*">
                <Button icon={<UploadOutlined />} size="small" style={{ marginTop: '10px' }}>
                  프로필 이미지 변경
                </Button>
              </Upload>
            )}
          </div>
        </div>

        <Divider />

        {editing ? (
          <Form form={form} initialValues={userInfo} onFinish={handleFinish} layout="vertical">
            <Form.Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
              <Input size="large"/>
            </Form.Item>
            <Form.Item label="직급" name="position" rules={[{ required: true, message: '직급을 입력해주세요.' }]}>
              <Input size="large"/>
            </Form.Item>
            <Form.Item
              label="이메일"
              name="email"
              rules={[
                { required: true, message: '이메일을 입력해주세요.' },
                { type: 'email', message: '유효한 이메일을 입력해주세요.' },
              ]}
            >
              <Input size="large"/>
            </Form.Item>
            <Form.Item label="소속 프로젝트" name="projects" rules={[{ required: true }]}>
              <Select
                mode="multiple"
                size="large"
                defaultValue={userInfo}
                style={{ width: '100%' }}
                disabled
              />
            </Form.Item>
            <Form.Item label="파트" name="part" rules={[{ required: true }]}>
              <Select size="large" style={{ flex: 1, minWidth: '150px' }} allowClear>
                <Option value="OS">OS</Option>
                <Option value="MW">미들웨어</Option>
                <Option value="DB">DB</Option>
                <Option value="NET">네트워크</Option>
                <Option value="SEC">보안</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="전화번호"
              name="phone"
              rules={[
                { required: true, message: '전화번호를 입력해주세요.' },
                { pattern: /^010-\d{4}-\d{4}$/, message: '010-1234-5678 형식으로 입력해주세요.' },
              ]}
            >
              <Input size="large"/>
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                저장
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                size="large"
                onClick={() => {
                  setEditing(false);
                  form.resetFields(); // 필드 리셋
                }}
              >
                취소
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Text strong>이메일:</Text> {userInfo.email}
            </div>
            <div>
              <Text strong>소속 프로젝트:</Text>{' '}
              {userInfo.projects.map((project, index) => (
                <Tag key={index} color="blue" style={{ marginBottom: '5px' }}>
                  {project}
                </Tag>
              ))}
            </div>
            <div>
              <Text strong>파트:</Text> {userInfo.part}
            </div>
            <div>
              <Text strong>전화번호:</Text> {userInfo.phone}
            </div>
            <Button type="default" onClick={() => setEditing(true)}>
              수정
            </Button>
          </Space>
        )}
      </Card>
    </div>
  );
};

export default Settings;
