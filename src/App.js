import React, { useState } from 'react';
import { Input, Space, Button, Row, Col, Breadcrumb, Layout, theme, Dropdown, List, Modal, DatePicker, Form, message } from 'antd';
import { FormOutlined, DownOutlined, DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { TextArea } = Input;

const items = [
  { key: '1', label: 'All' },
  { key: '2', label: 'Active' },
  { key: '3', label: 'Completed' },
];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form instance for editing task modal
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Add a new task
  const addTask = () => {
    // Validate the newTask input and make sure it is not empty
    if (!newTask.trim()) {
      message.error('Please enter a task name!');
      return;
    }

    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, description: '', dueDate: null }]);
    setNewTask(''); // Reset the input after adding the task
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle task category filter
  const handleCategoryChange = ({ key }) => {
    setSelectedCategory(key);
  };

  // Edit a task (open modal)
  const editTask = (task) => {
    setEditingTask(task);
    form.setFieldsValue(task); // Set values for the form fields
    setModalVisible(true);
  };

  // Save edited task
  const saveEditedTask = (values) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, ...values } : task
    );
    setTasks(updatedTasks);
    setModalVisible(false);
    setEditingTask(null);
    message.success('Task updated successfully');
  };

  // Filter tasks based on the selected category
  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === '1') return true; // Show all tasks
    if (selectedCategory === '2') return !task.completed; // Show active tasks
    if (selectedCategory === '3') return task.completed; // Show completed tasks
  });

  return (
    <div className="main-div">
      <Layout>
        <Header className="header">Task Management App</Header>

        <Content style={{ padding: '0 48px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Dropdown
                menu={{
                  items,
                  onClick: handleCategoryChange,
                }}
              >
                <Button type="primary">
                  Status <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col span={6}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)} // Ensure state is updated correctly
                  placeholder="Enter Task"
                  size="large"
                />
                <Button type="primary" onClick={addTask}>Add Task</Button>
              </Space>
            </Col>
            <Col span={6}>
              <Search placeholder="Search tasks" enterButton="Search" size="large" />
            </Col>
          </Row>

          <div
            style={{
              background: colorBgContainer,
              minHeight: 480,
              padding: 24,
              borderRadius: borderRadiusLG,
              marginTop: 10,
            }}
          >
            <h2>
              Tasks <FormOutlined />
            </h2>
            <List
              bordered
              dataSource={filteredTasks}
              renderItem={(task) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      icon={<CheckCircleOutlined />}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </Button>,
                    <Button type="link" icon={<EditOutlined />} onClick={() => editTask(task)} />,
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      onClick={() => removeTask(task.id)}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    <strong>{task.text}</strong>
                    <p>{task.description}</p>
                    <p>{task.dueDate ? `Due Date: ${task.dueDate}` : ''}</p>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          A&T Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>

      {/* Modal for editing task */}
      {editingTask && (
        <Modal
          title="Edit Task"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={() => form.submit()} // Trigger form submission on "OK"
        >
          <Form
            initialValues={editingTask}
            onFinish={saveEditedTask}
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="Task Name"
              name="text"
              rules={[{ required: true, message: 'Please input the task name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Due Date" name="dueDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default App;