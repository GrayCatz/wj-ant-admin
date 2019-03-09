import React, { Fragment } from 'react';
import { Button, Card, Col, Divider, Dropdown, Form, Icon, Input, Modal, Row, Select, Table } from 'antd';

import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@Form.create()
class Permissions extends React.Component {

  state = {
    loading: false,
  };

  data = [
    {
      id: 1,
      name: '鉴别时',
      status: '已选择',
    },
  ];

  columns = [
    {
      title: '权限名',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'selected',
      // render:(field,item )=> field=="TRUE"?"已选择":"未选择"
      render: (field, item) => this.props.role.permissions.indexOf(item.id) !== -1 ? '已选择' : '未选择',
    }
    ,
// {
//   title: '操作',
//   render: (text, record) => (
//     <div>
//       <Fragment>
//         <a onClick={() => this.setPermissionsVisible(true)}>权限设置</a>
//       </Fragment>
//     </div>
//
//
//   ),
// },
  ]
  ;

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
    this.props.setPermissionsVisible(false);
  };

  handleCancel = () => {
    this.props.setPermissionsVisible(false);
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
    const rowSelection = {
      fixed: false,
      selectedRowKeys: this.props.role.permissions,
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        this.props.handlePermissionChange(record,selected)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.props.handlePermissionChangeAll(selectedRows,selected)
      },
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div>
        <Modal
          zIndex={2}
          visible={this.props.visible}
          title="权限设置"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={()=>this.props.handleSaveRole()}>
              保存
            </Button>,
          ]}
        >
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.props.dataSource}
          />
        </Modal>
      </div>);
  }

}

export default Permissions;
