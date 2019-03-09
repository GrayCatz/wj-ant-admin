import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import Avatar from './Avatar';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@Form.create()
class EditForm extends React.Component {

  state = {
    loading: false,
    // current: {},
  };

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
    // labelCol: {
    //   xs: { span: 24 },
    //   sm: { span: 7 },
    // },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 16 },
    // },
  };

  handleOk = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.handleSave(fieldsValue);
    });

  };

  handleCancel = () => {
    this.props.showEdit(false);
  };


  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          style={{display:"none"}}
          label="id"
        >
          {getFieldDecorator('id', {
            initialValue: this.props.current.id,
          })(
            <Input/>,
          )}
        </Form.Item>
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
            <Avatar url={this.props.current.portrait}/>,
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
            initialValue: this.props.current.username,
          })(
            <Input/>,
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
            initialValue: this.props.current.password,
          })(
            <Input/>,
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
            initialValue: this.props.current.realName,
          })(
            <Input/>,
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
            initialValue: this.props.current.phone,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          label="角色"
        >
          {getFieldDecorator('roleId', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.roleId,
          })(
            <Select style={{ width: 120 }}>
              <Option value="1">Jack</Option>
              <Option value="2">Lucy</Option>
              <Option value="3">yiminghe</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label="个人简介（可鉴别）"
        >
          {getFieldDecorator('profile', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.profile,
          })(
            <TextArea/>,
          )}
        </Form.Item>
        <Form.Item
          label="鉴别要求"
        >
          {getFieldDecorator('requirement', {
            rules: [],
            initialValue: this.props.current.requirement,
          })(
            <TextArea/>,
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
