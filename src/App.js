import React, { useState } from 'react';
import { Input, Space, Button, Row, Col, Breadcrumb, Layout, theme, Dropdown, List, Modal, DatePicker, Form, message } from 'antd';
import { FormOutlined, DownOutlined, DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import './App.css';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, toggleTaskComplete, editTask } from './Redux/taskSlice';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { TextArea } = Input;

const items = [
  { key: '1', label: 'All' },
  { key: '2', label: 'Active' },
  { key: '3', label: 'Completed' },
];

const App = () => {

  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const [form] = Form.useForm();
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // ADD TASK
  const handleAddTask = () => {
    // Validate and make sure input is not empty
    if (!newTask.trim()) {
      message.error('Please enter a task name!');
      return;
    }
    dispatch(addTask({ text: newTask, completed: false, description: '', dueDate: null }));
    setNewTask('');  // Reset the input after adding the task
  };

  // TOGGLE TASK
  const toggleTaskCompletion = (id) => {
    dispatch(toggleTaskComplete(id));
  };

  // REMOVE TASK
  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };


  const handleCategoryChange = ({ key }) => {
    setSelectedCategory(key);
  };

  // Open modal to edit a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      text: task.text,
      description: task.description,
      dueDate: task.dueDate ? dayjs(task.dueDate).startOf('day') : null,  // Ensure date is handled correctly
    });
    setModalVisible(true);
  };


  const saveEditedTask = (values) => {
    const formattedDueDate = values.dueDate && values.dueDate.isValid() ? values.dueDate.startOf('day').format('YYYY-MM-DD') : null;
  
    dispatch(editTask({ 
      id: editingTask.id, 
      text: values.text, 
      description: values.description, 
      dueDate: formattedDueDate
    }));
    
    setModalVisible(false);
    setEditingTask(null);
    message.success('Task updated successfully.');
  };
  
  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === '1') return true; // Show all tasks
    if (selectedCategory === '2') return !task.completed; // Show active tasks
    if (selectedCategory === '3') return task.completed; // Show completed tasks
    return;
  });


  return (
    <div className="main-div">
      <Layout>
        <Header className="header"> Task Management App </Header>

        <Content style={{ padding: '0 48px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
              { title: 'Home' },
              { title: 'List' },
              { title: 'App' },
            ]}
          />

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

            <Col span={12}>
              <Space style={{ width: '100%' }}>
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)} // Ensure state is updated correctly
                  placeholder="Enter Task"
                  size="large"
                />
                <Button type="primary" onClick={handleAddTask}> Add Task </Button>
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
            <h2> Tasks <FormOutlined /> </h2>

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

                    {/* Render Due Date */}
                    <p>
                      {task.dueDate && dayjs(task.dueDate).isValid()
                        ? `Due Date: ${dayjs(task.dueDate).format('DD-MM-YYYY')}`
                        : 'No Due Date'}
                    </p>
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
          open={modalVisible}  // use open instead of visible
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
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                value={editingTask?.dueDate ? dayjs(editingTask.dueDate) : null}  // Ensure correct value is passed to the DatePicker
                onChange={(date) => {
                  if (date) {
                    form.setFieldValue('dueDate', date.startOf('day'));
                  } else {
                    form.setFieldValue('dueDate', null);
                  }
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default App;
