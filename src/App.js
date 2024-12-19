import React, { useEffect } from 'react';
import { Input, Space, Button, Row, Col, Breadcrumb, Layout, theme, Dropdown, List, Modal, DatePicker, Form, message } from 'antd';
import { FormOutlined, DownOutlined, DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, toggleTaskCompletion, editTask, setCategory } from './Redux/action';
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
  // Redux state
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const selectedCategory = useSelector((state) => state.category);
  const editingTask = useSelector((state) => state.editingTask);
  
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    // Reset category if needed, for example:
    dispatch(setCategory('1'));
  }, [dispatch]);

  const handleAddTask = (newTask) => {
    if (!newTask.trim()) {
      message.error('Please enter a task name!');
      return;
    }

    const task = { id: Date.now(), text: newTask, completed: false, description: '', dueDate: null };
    dispatch(addTask(task));
  };

  const handleToggleTaskCompletion = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  const handleCategoryChange = ({ key }) => {
    dispatch(setCategory(key));
  };

  const handleEditTask = (task) => {
    dispatch(editTask(task)); // Pass the task to Redux
  };

  const handleSaveEditedTask = (values) => {
    const updatedTask = { ...editingTask, ...values };
    dispatch(editTask(updatedTask));
    message.success('Task updated successfully');
  };

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
            <Breadcrumb.Item> Home </Breadcrumb.Item>
            <Breadcrumb.Item> List </Breadcrumb.Item>
            <Breadcrumb.Item> App </Breadcrumb.Item>
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
                  onChange={(e) => handleAddTask(e.target.value)}
                  placeholder="Enter Task"
                  size="large"
                />
                <Button type="primary" onClick={handleAddTask}>Add Task</Button>
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
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </Button>,
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEditTask(task)} />,
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveTask(task.id)}
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
          visible={editingTask !== null}
          onCancel={() => dispatch(editTask(null))}
          onOk={() => form.submit()}
        >
          <Form
            initialValues={editingTask}
            onFinish={handleSaveEditedTask}
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
