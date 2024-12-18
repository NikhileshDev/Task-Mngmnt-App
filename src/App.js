import React, { useState } from 'react';
import { Input, Space, Button, Row, Col, Breadcrumb, Layout, theme, Dropdown, List } from 'antd';
import { FormOutlined, DownOutlined } from '@ant-design/icons';
import './App.css';
import { } from 'antd';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const items = [
  { key: '1', label: 'All' , disabled: true },
  { key: '2', label: 'Active' },
  { key: '3', label: 'Completed' },
];


const App = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const addTask = () => {
    if(!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false}]);
    setNewTask('');
  };


  return (
    <div className='main-div'>

      <Layout>
        <Header className = 'header' >
          Task Management App
        </Header>
        
        <Content style={{ padding: '0 48px' }} >
          <Breadcrumb style={{ margin: '16px 0' }} >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>


          <Row>
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
            >

            </Col>
            <Col
              xs={{ span: 11, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
            >
                <Space direction='vertical'>
                  <input
                    value = {newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder = 'Enter Task'
                  />
                  <Button type='primary' onClick={addTask}> Add </Button> 
                  <Search
                    placeholder='input search text'
                    enterButton='Search'
                    onSearch={onSearch}
                    size='large'
                  />
                </Space>  
            </Col>
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
            >
              <Dropdown
                menu = {{ items }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Button type='primary'>
                      Status <DownOutlined />
                    </Button>
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row>

          <div
            style={{
              background: colorBgContainer,
              minHeight: 500,
              padding: 24,
              borderRadius: borderRadiusLG,
              marginTop: 10
            }}
          >
            <h2>  Tasks <FormOutlined /> </h2>
            <List
             bordered
             dataSource = {tasks}
             renderItem={(task) => {
               <List.Item>
                 <div> {task.text} </div>
               </List.Item>
              }}
            />  
          </div>
        
        </Content>

        <Footer style = {{ textAlign: 'center' }} >
          A&T Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </div>
  );
};

export default App;

