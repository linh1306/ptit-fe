"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  Statistic,
  Table,
  Tag,
  Button,
  Typography,
  Spin,
  Alert,
  Space,
  Tabs,
  Flex
} from 'antd';
import {
  ApiOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
const { Title } = Typography;
const { TabPane } = Tabs;

// Mock data
const services = [
  { id: 1, name: 'User Service', status: 'healthy', uptime: '99.9%', instances: 3, cpu: '12%', memory: '42%', lastIssue: '3 days ago' },
  { id: 2, name: 'Auth Service', status: 'healthy', uptime: '99.7%', instances: 2, cpu: '8%', memory: '35%', lastIssue: '12 hours ago' },
  { id: 3, name: 'Product Service', status: 'degraded', uptime: '98.5%', instances: 4, cpu: '45%', memory: '78%', lastIssue: '1 hour ago' },
  { id: 4, name: 'Order Service', status: 'healthy', uptime: '99.8%', instances: 3, cpu: '15%', memory: '50%', lastIssue: '2 days ago' },
  { id: 5, name: 'Payment Service', status: 'unhealthy', uptime: '96.2%', instances: 2, cpu: '89%', memory: '92%', lastIssue: 'Now' },
  { id: 6, name: 'Notification Service', status: 'healthy', uptime: '99.9%', instances: 2, cpu: '5%', memory: '30%', lastIssue: '5 days ago' },
];

const recentAlerts = [
  { id: 1, service: 'Payment Service', type: 'critical', message: 'High CPU usage detected', time: '12 minutes ago' },
  { id: 2, service: 'Product Service', type: 'warning', message: 'API response time above threshold', time: '1 hour ago' },
  { id: 3, service: 'Auth Service', type: 'info', message: 'New deployment successful', time: '12 hours ago' },
  { id: 4, service: 'User Service', type: 'info', message: 'Auto-scaling triggered', time: '1 day ago' },
];

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'green';
      case 'degraded': return 'orange';
      case 'unhealthy': return 'red';
      default: return 'blue';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <CloseCircleOutlined />;
      case 'warning': return <WarningOutlined />;
      case 'info': return <CheckCircleOutlined />;
      default: return <InfoCircleOutlined />;
    }
  };

  const columns = [
    {
      title: 'Service',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Uptime',
      dataIndex: 'uptime',
      key: 'uptime',
    },
    {
      title: 'Instances',
      dataIndex: 'instances',
      key: 'instances',
    },
    {
      title: 'CPU',
      dataIndex: 'cpu',
      key: 'cpu',
    },
    {
      title: 'Memory',
      dataIndex: 'memory',
      key: 'memory',
    },
    {
      title: 'Actions',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button size="small">Details</Button>
          <Button size="small" type="primary">Restart</Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <Flex vertical className="min-h-screen p-6">
      <Title level={3} className="mb-6">Microservice Dashboard</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <Statistic
            title="Total Services"
            value={services.length}
            prefix={<ApiOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Healthy Services"
            value={services.filter(s => s.status === 'healthy').length}
            valueStyle={{ color: '#3f8600' }}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Degraded Services"
            value={services.filter(s => s.status === 'degraded').length}
            valueStyle={{ color: '#faad14' }}
            prefix={<WarningOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Unhealthy Services"
            value={services.filter(s => s.status === 'unhealthy').length}
            valueStyle={{ color: '#cf1322' }}
            prefix={<CloseCircleOutlined />}
          />
        </Card>
      </div>

      <Card className="mb-6">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Services Status" key="1">
            <Table
              columns={columns}
              dataSource={services}
              rowKey="id"
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Recent Deployments" key="2">
            <Table
              columns={[
                { title: 'Service', dataIndex: 'name', key: 'name' },
                { title: 'Last Deployed', dataIndex: 'lastIssue', key: 'lastIssue' },
                {
                  title: 'Status', dataIndex: 'status', key: 'status',
                  render: (status) => (
                    <Tag color={getStatusColor(status)}>
                      {status.toUpperCase()}
                    </Tag>
                  )
                }
              ]}
              dataSource={services}
              rowKey="id"
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Alerts" className="mb-6">
          {recentAlerts.map(alert => (
            <Alert
              key={alert.id}
              message={alert.service}
              description={
                <div className="flex justify-between">
                  <span>{alert.message}</span>
                  <span className="text-gray-400 text-sm">{alert.time}</span>
                </div>
              }
              type={alert.type === 'critical' ? 'error' : alert.type === 'warning' ? 'warning' : 'info'}
              showIcon
              icon={getAlertIcon(alert.type)}
              className="mb-2"
            />
          ))}
          <div className="text-right mt-4">
            <Button type="link">View all alerts</Button>
          </div>
        </Card>

        <Card title="System Health" className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            {services.map(service => (
              <Card
                key={service.id}
                size="small"
                title={service.name}
                className="mb-0"
                extra={
                  <Tag color={getStatusColor(service.status)}>
                    {service.status.toUpperCase()}
                  </Tag>
                }
              >
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>CPU:</span>
                    <span className={
                      parseInt(service.cpu) > 80 ? 'text-red-500' :
                        parseInt(service.cpu) > 60 ? 'text-yellow-500' : 'text-green-500'
                    }>{service.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className={
                      parseInt(service.memory) > 80 ? 'text-red-500' :
                        parseInt(service.memory) > 60 ? 'text-yellow-500' : 'text-green-500'
                    }>{service.memory}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </Flex>
  );
};

export default DashboardPage;