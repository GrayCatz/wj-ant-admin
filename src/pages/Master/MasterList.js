import React, { Fragment } from 'react';
import { Button, Card, Divider, Dropdown, Icon, Table } from 'antd';
import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Filter from './Filter';
import EditForm from './EditForm';
import Brands from './Brands';

class MasterList extends React.Component {

  state = {
    editVisible: false,
    brandsVisible: false,
  };

  data = [
    {
      id: 1,
      name: '神级鉴定师',
      phone: '1858766909',
      profile: '迪奥，倩碧',
      requirement: '图片清晰',
    },
  ];

  columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
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
            <a onClick={() => this.setEditVisible(true)}>编辑</a>
          </Fragment>
          <Divider type="vertical"/>
          <Fragment>
            <a onClick={() => this.handleDelete(true, record)}>禁用</a>
          </Fragment>
        </div>


      ),
    },
  ];

  setEditVisible = (editVisible) => {
    this.setState({
      editVisible,
    });
  }

  setBrandsVisible = (brandsVisible) => {
    this.setState({
      brandsVisible,
    });
  }



  render() {

    const parentMethods = {
      setEditVisible: this.setEditVisible,
      setBrandsVisible: this.setBrandsVisible,
    };
    return (
      <PageHeaderWrapper title="账号管理">
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
        <Brands
          {...parentMethods}
          visible={this.state.brandsVisible}
        />
      </PageHeaderWrapper>);
  }

}

export default MasterList;
