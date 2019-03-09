import React, { Fragment } from 'react';
import { Button, Card, Col, Dropdown, Form, Icon, Input, Modal, Row, Select, Table } from 'antd';

import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@Form.create()
class EditForm extends React.Component {

  state = {
    loading: false,
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
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  handleOk = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      let entity = this.props.role;
      entity.name = fieldsValue.name;
      this.props.handleSaveRole(entity);
    });

  };

  handleCancel = () => {
    this.props.showEdit(false);
  };

  getPermission = () => {
    if (!this.props.role.permissions) return;
    let text = '';
    console.log(this.props.role.permissions);
    this.props.role.permissions.map((item) => {
      text = text + item.name + ';';
    });
    return text;
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
          {getFieldDecorator('name', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.role.name,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Button
          style={{
            marginLeft: '100px',
            marginBottom: ' 20px',
          }}
          onClick={() => {
            this.props.showPermissionEdit(true, this.props.role, false);
          }}>权限设置</Button>
        <Form.Item
          label="权限"
        >
          {getFieldDecorator('permission', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.getPermission(),
          })(
            <Input disabled={true}/>,
          )}
        </Form.Item>
      </Form>
    );
  }

  render() {

    return (
      <div>
        <Modal
          destroyOnClose
          zIndex={1}
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
