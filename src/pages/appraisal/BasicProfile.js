import React, { Component } from 'react';
import { connect } from 'dva';
import { Badge, Card, Divider, Table,List } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功"/>
      ) : (
        <Badge status="processing" text="进行中"/>
      ),
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    console.log(params)
    dispatch({
      type: 'profile/fetchBasic',
      payload: {
        id: params.id || '1000000000',
      },
    });
  }

  render() {
    const { profile = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];

    const data = [
      {
        title: 'Title 1',
      },
      {
        title: 'Title 2',
      },
      {
        title: 'Title 3',
      },
      {
        title: 'Title 4',
      },
    ];
    return (
      <PageHeaderWrapper title="基础详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
            <Description term="鉴定单号">{application.serial}</Description>
            <Description term="创建人">{application.creator}</Description>
            <Description term="创建时间">{application.createTime}</Description>
            <Description term="状态">{application.status}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }}/>
          <DescriptionList size="large" title="产品信息" style={{ marginBottom: 32 }}>
            <Description term="品牌">{application.brand}</Description>
            <Description term="类别">{application.category}</Description>
            <Description term="产品示例">{application.delivery}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }}/>

          <div className={styles.title}>鉴别图必填</div>
          {/*<Table*/}
            {/*style={{ marginBottom: 24 }}*/}
            {/*pagination={false}*/}
            {/*loading={loading}*/}
            {/*dataSource={goodsData}*/}
            {/*columns={goodsColumns}*/}
            {/*rowKey="id"*/}
          {/*/>*/}

          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card hoverable
                      bodyStyle={{padding:0}}
                      style={{ width: "80%" }}
                      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{height:"180px"}}/>}/>

              </List.Item>
            )}
          />
          {/*<div className={styles.title}>退货进度</div>*/}
          {/*<Table*/}
            {/*style={{ marginBottom: 16 }}*/}
            {/*pagination={false}*/}
            {/*loading={loading}*/}
            {/*dataSource={basicProgress}*/}
            {/*columns={progressColumns}*/}
          {/*/>*/}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
