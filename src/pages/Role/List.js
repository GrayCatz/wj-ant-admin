import React, { Fragment } from 'react';
import { Button, Card, Divider, Dropdown, Icon, message, Table, Modal } from 'antd';
import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Filter from './Filter';
import EditForm from './EditForm';
import Permissions from './Permissions';
import { connect } from 'dva';

const confirm = Modal.confirm;

@connect(({ role, loading }) => ({
  role,
  loading: loading.models.role,
}))
class List extends React.Component {

  state = {
    editVisible: false,
    permissionEditVisible: false,
    needSave: false,
    role: {},
  };

  data = [
    // {
    //   id: 1,
    //   name: '鉴别时',
    //   phone: '图库，订单管理，产品管理',
    // },
  ];

  columns = [
    {
      title: '角色名',
      dataIndex: 'name',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      render:(text,record)=>{
        // console.log(text,record)
        return text.map((item)=>{
            return item.name+";";
          })
      }
    },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          <Fragment>
            <a onClick={() => this.showPermissionEdit(true, record, true)}>权限设置</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.showEdit(true, false, record)}>编辑</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.handleRemoveRole(record.id)}>删除</a>
          </Fragment>
        </div>


      ),
    },
  ];

  componentDidMount() {
    this.search();
  }

  search = (params) => {
    this.props.dispatch({
      type: 'role/paging',
      payload: {
        ...params,
      },
    });
  };

  showPermissionEdit = (visible, role, needSave) => {
    if (visible) {
      this.props.dispatch({
        type: 'role/permissions',
        payload: {
          roleId: this.state.role.id,
        },
      });
    }
    this.setState({
      permissionEditVisible: visible,
      needSave,
    });
    if (role) {
      this.setState({
        role,
      });
    }
    if (visible && needSave) {
      this.setState({
        needSave,
      });
    }


  };

  showEdit = (visible, create, role) => {
    this.setState({
      editVisible: visible,
    });
    if (create) {
      this.setState({
        role: {},
      });
    }
    if (role) {
      this.setState({
        role,
      });
    }

  };


  handleSaveRole = (role) => {
    this.props.dispatch({
      type: 'role/saveRole',
      payload: role,
      callback: () => {
        message.success('保存成功');
        this.showPermissionEdit(false);
        this.showEdit(false);
        this.props.dispatch({
          type: 'role/paging',
          payload: {},
        });
      },
    });
  };

  handleRemoveRole = (roleId) => {
    confirm({
      title: '确定删除该角色？',
      // content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => {
        this.props.dispatch({
          type: 'role/remove',
          payload: {
            id: roleId,
          },
          callback: () => {
            message.success('删除成功');
            this.props.dispatch({
              type: 'role/paging',
              payload: {},
            });
          },
        });
        // return new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
      },
    });

  };


  handlePermissionChangeAll = (permissions) => {
    // if (selected) {
    //   let arr = [];
    //   for (const index in rows) {
    //     arr.push(rows[index].id);
    //   }
    //   this.state.role.permissions = arr;
    // } else {
    //   this.state.role.permissions = [];
    // }
    this.state.role.permissions = permissions;
    this.setState({
      role: this.state.role,
    });
    // console.log(this.state.role);
  };

  handlePermissionChange = (item, selected) => {
    if (selected) {
      this.state.role.permissions.push(item.id);
      // this.state.permission += `;${item.name}`;
    } else {
      this.state.role.permissions.splice(this.state.role.permissions.indexOf(item.id), 1);
    }

    this.setState({
      role: this.state.role,
    });
    console.log(this.state.role);
  };

  render() {
    const parentMethods = {
      search: this.search,
      showPermissionEdit: this.showPermissionEdit,
      handleSaveRole: this.handleSaveRole,
      handlePermissionChangeAll: this.handlePermissionChangeAll,
      handlePermissionChange: this.handlePermissionChange,
      showEdit: this.showEdit,
      setPermissionsVisible: this.setPermissionsVisible,
    };
    return (
      <PageHeaderWrapper title="角色管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Filter {...parentMethods}/>
            <Table
              rowKey="id"
              columns={this.columns}
              dataSource={this.props.role.data.list}/>
          </div>
        </Card>

        <Permissions
          {...parentMethods}
          visible={this.state.permissionEditVisible}
          dataSource={this.props.role.permission.list}
          role={this.state.role}
          needSave={this.state.needSave}
        />
        <EditForm
          {...parentMethods}
          visible={this.state.editVisible}
          role={this.state.role}
        />
      </PageHeaderWrapper>);
  }

}

export default List;
