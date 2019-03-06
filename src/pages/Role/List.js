import React, { Fragment } from 'react';
import { Button, Card, Divider, Dropdown, Icon, Table } from 'antd';
import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Filter from './Filter';
import EditForm from './EditForm';

class List extends React.Component {

  state = {
    editVisible: false,
  };

  data = [
    {
      id: 1,
      name: '鉴别时',
      phone: '图库，订单管理，产品管理',
    },
  ];

  columns = [
    {
      title: '角色名',
      dataIndex: 'name',
    },
    {
      title: '权限',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          <Fragment>
            <a onClick={() => this.handleDelete(true, record)}>权限设置</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.handleDelete(true, record)}>详情</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.handleDelete(true, record)}>编辑</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.handleDelete(true, record)}>删除</a>
          </Fragment>
        </div>


      ),
    },
  ];

  setEditVisible = (editVisible) => {
    this.setState({
      editVisible,
    });
  };

  render() {

    const parentMethods = {
      setEditVisible: this.setEditVisible,
    };
    return (
      <PageHeaderWrapper title="角色管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Filter {...parentMethods}/>
            <Table
              rowKey="id"
              columns={this.columns}
              dataSource={this.data}/>
          </div>
        </Card>
        <EditForm
          {...parentMethods}
          visible={this.state.editVisible}
        />
      </PageHeaderWrapper>);
  }

}

export default List;
