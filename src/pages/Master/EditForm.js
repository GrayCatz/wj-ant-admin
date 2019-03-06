import React, { Fragment } from 'react';
import {Button, Card, Col, Dropdown, Form, Icon, Input, Modal, Row, Select, Table } from 'antd';

import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Avatar from './Avatar';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@Form.create()
class EditForm extends React.Component {

  state={
    loading :false
  }

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
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  handleOk=()=>{
    this.props.setEditVisible(false);
  }

  handleCancel=()=>{
    this.props.setEditVisible(false);
  }


  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label="头像"
        >
          {getFieldDecorator('avatar', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Avatar />
          )}
        </Form.Item>
        <Form.Item
          label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="真实姓名"
        >
          {getFieldDecorator('realName', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="电话号码"
        >
          {getFieldDecorator('phone', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="角色"
        >
          {getFieldDecorator('role', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue:"lucy",
          })(
            <Select style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="个人简介（可鉴别）"
        >
          {getFieldDecorator('p0rofile', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <TextArea />
          )}
        </Form.Item>
        <Form.Item
          label="鉴别要求"
        >
          {getFieldDecorator('requirement', {
            rules: [],
          })(
            <TextArea />
          )}
        </Form.Item>
      </Form>
    );
  }

  render() {

    return (
      <div>
        <Modal
          visible={this.props.visible}
          title="创建用户"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              保存
            </Button>,
          ]}
        >
          {this.renderForm()}
        </Modal>
      </div>);
  }

}

export default EditForm;
