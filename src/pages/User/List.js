import React, { Fragment } from 'react';
import { Card, Divider, Table } from 'antd';
import { connect } from 'dva';
import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Filter from './Filter';
import EditForm from './EditForm';
import Brands from './Brands';

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
class List extends React.Component {

  state = {
    editVisible: false,
    brandsVisible: false,
    // current: {},
  };

  data = [
    {
      id: 1,
      name: '神级鉴定师',
      phone: '1858766909',
      profile: '迪奥，倩碧',
      requirement: '图片清晰',
      title: '手机号',
    },
  ];

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      dataIndex: 'phone',
    },
    {
      title: '个人简介',
      dataIndex: 'profile',
    },
    {
      title: '鉴别要求',
      dataIndex: 'requirement',
    },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          <Fragment>
            <a onClick={() => this.setBrandsVisible(true)}>鉴别品牌</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.setEditVisible(true)}>详情</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.showEdit(true, record)}>编辑</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.handleDelete(true, record)}>禁用</a>
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
      type: 'users/paging',
      payload: {
        ...params,
      },
    });
  };
  detail = (id, callback) => {
    this.props.dispatch({
      type: 'users/get',
      payload: {
        id: id,
      },
      callback: callback,
    });
  };
  handleSave = (fields) => {
    this.props.dispatch({
      type: 'users/save',
      payload: {
        ...this.state.current,
        ...fields,
      },
      callback: (item) => {
        this.setState({
          editVisible: false,
          // current: item,
        });
        this.search();
      },
    });
  };
  showEdit = (visible, user) => {
    if (visible) {
      this.detail(user.id, (item) => {
        this.setState({
          editVisible: visible,
          // current: item,
        });
      });
    } else {
      this.setState({
        editVisible: false,
        // current: item,
      });
    }

  };

  showBrandEdit = (visible) => {
    this.setState({
      brandsVisible: visible,
    });
  };


  render() {

    const parentMethods = {
      handleSave: this.handleSave,
      showEdit: this.showEdit,
      showBrandEdit: this.showBrandEdit,
    };
    return (
      <PageHeaderWrapper title="账号管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Filter {...parentMethods}/>
            <Table
              rowKey="id"
              columns={this.columns}
              // dataSource={this.data}
              dataSource={this.props.users.data.list}
            />
          </div>
        </Card>
        <EditForm
          {...parentMethods}
          visible={this.state.editVisible}
          current={this.props.users.current}
        />
        <Brands
          {...parentMethods}
          visible={this.state.brandsVisible}
        />
      </PageHeaderWrapper>)
      ;
  }

}

export default List;
