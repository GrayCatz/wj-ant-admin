import React, { Fragment } from 'react';
import { Button, Card, Col, Divider, Dropdown, Form, Icon, Input, List, Modal, Row, Select, Table } from 'antd';

import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@Form.create()
class Brands extends React.Component {

  state = {
    loading: false,
  };

  data = [
    {
      id: 1,
      name: '迪奥',
      status: '已选择',
    },
  ];

  columns = [
    {
      title: '品牌名',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          <Fragment>
            <a onClick={() => this.setPermissionsVisible(true)}>权限设置</a>
          </Fragment>
        </div>


      ),
    },
  ];

  brandList = [
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },
    {
      name: '迪奥',
    },

  ];
  formItems = [
    {
      label: '用户名',
      key: 'username',
    },
    {
      label: '手机号',
      key: 'phone',
    },

  ];

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  handleOk = () => {
    this.props.setBrandsVisible(false);
  };

  handleCancel = () => {
    this.props.setBrandsVisible(false);
  };


  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>

        <Form.Item
          label="角色名称"
        >
          {getFieldDecorator('username', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input/>,
          )}
        </Form.Item>

        <Form.Item
          label="权限"
        >
          {getFieldDecorator('phone', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input/>,
          )}
        </Form.Item>

      </Form>
    );
  }

  render() {

    return (
      <div>
        <Modal
          width="1000px"
          visible={this.props.visible}
          title="品牌选择"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              保存
            </Button>,
          ]}
        >
          <Row>
            <Col span={14}>
              <Table
                rowKey="id"
                columns={this.columns}
                dataSource={this.data}/>
            </Col>
            <Col span={1}/>
            <Col span={9}>

              <div
              style={{
                height:"500px",
                overflow:"auto"
              }}
              >
                <List dataSource={this.brandList} renderItem={(item) => {

                  return (<div style={{
                    padding: '10px',
                    width: '150px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '10px',
                    marginRight: '10px',
                    float: 'left',
                    position:"relative"
                  }}>{item.name}
                    <Icon type="close"
                          style={{
                            position:"absolute",
                            right:"10px",
                            top:"14px"
                          }}
                          onClick={() => {
                          }}/></div>);
                }
                }/>

              </div>


            </Col>
          </Row>

        </Modal>
      </div>);
  }

}

export default Brands;
