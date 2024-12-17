import React, { useState, useEffect } from 'react';
import { Input, Space, Button, Row, Col, Breadcrumb, Layout, theme, Dropdown } from 'antd';
import { FormOutlined, DownOutlined } from '@ant-design/icons';
import './App.css';
import { } from 'antd';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" >
        ALL
      </a>
    ),
  },

  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" >
        Active
      </a>
    ),
  },

  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" >
        Completed
      </a>
    ),
    disabled: true,
  },
];


const App = () => {
  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const addTask = () => { }
  return (
    <div className='main-div'>

      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >


        </Header>
        <Content
          style={{
            padding: '0 48px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>


          <Row>
            <Col
              xs={{
                span: 5,
                offset: 1,
              }}
              lg={{
                span: 6,
                offset: 2,
              }}
            >

            </Col>
            <Col
              xs={{
                span: 11,
                offset: 1,
              }}
              lg={{
                span: 6,
                offset: 2,
              }}
            >
              <Space direction='vertical'>
                <Search
                  placeholder='input search text'
                  enterButton='Search'
                  onSearch={onSearch}
                  size='large'
                />
              </Space>
            </Col>
            <Col
              xs={{
                span: 5,
                offset: 1,
              }}
              lg={{
                span: 6,
                offset: 2,
              }}
            >
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Button type='primary'>
                      Select<DownOutlined />
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
            Tasks <FormOutlined />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          An Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
