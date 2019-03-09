import React, { Component } from 'react';
import { connect } from 'dva';
import { Badge, Button, Card, Col, Divider, List, Modal, Row } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

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

@connect(({ detail, loading }) => ({
  detail,
  loading: loading.effects['detail/fetchBasic'],
}))
class BasicProfile extends Component {

  state={
    previewVisible: false,
    previewItem: null,
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    console.log(params);
    dispatch({
      type: 'detail/fetchBasic',
      payload: {
        id: params.id || '1000000000',
      },
    });
  }

  showPreview = (previewVisible, previewItem) => {
    this.setState({
      previewVisible,
    });
    if(previewItem){
      this.setState({
        previewItem,
      });
    }
  };

  handleResult(id, result) {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'detail/changeResult',
      payload: {
        id: id,
        result: result,
      },
      callback: () => {
        dispatch({
          type: 'detail/fetchBasic',
          payload: {
            id: id,
          },
        });
      },
    });
  }

  render() {
    const { detail = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = detail;
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

    return (
      <PageHeaderWrapper title="订单详情" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
            <Description term="鉴定单号">{application.serial}</Description>
            <Description term="创建人">{application.creator}</Description>
            <Description term="创建时间">{application.createTime}</Description>
            <Description term="状态">{application.status}</Description>
            <Description term="鉴定结果">{application.result}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }}/>

          <DescriptionList size="large" title="产品信息" style={{ marginBottom: 32 }}>
            <Description term="">
              <Card hoverable
                    bodyStyle={{ padding: 0 }}
                    style={{ width: '200px', margin: '5%' }}
                    cover={<img alt="example" src={application.productImage}
                                style={{ height: '180px' }} onClick={() => {
                      this.showPreview(true, {name:'',url:application.productImage})
                    }}/>}/>
            </Description>
            <Description term="品牌">{application.brand}</Description>
            <Description term="类别">{application.category}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }}/>

          <DescriptionList size="large" title="鉴别图必填" style={{ marginBottom: 32 }}>
            <List
              // grid={{ gutter: 16, column: 4 }}
              dataSource={application.required}
              renderItem={item => (
                <List.Item style={{ width: '180px', float: 'left', margin: '0px 20px' }}>
                  <Card hoverable
                        bodyStyle={{ padding: 0 }}
                        cover={<img alt="example" src={item.image}
                                    style={{ height: '180px' }} onClick={() => {
                          this.showPreview(true, {name:item.name,url:item.image})
                        }}/>}/>
                </List.Item>
              )}
            />
          </DescriptionList>
          <DescriptionList size="large" title="鉴别图选填" style={{ marginBottom: 32 }}>
            <List
              // grid={{ gutter: 16, column: 4 }}
              dataSource={application.optional}
              renderItem={item => (
                <List.Item style={{ width: '180px', float: 'left', margin: '0px 20px' }}>
                  <Card hoverable
                        bodyStyle={{ padding: 0 }}
                        cover={<img alt="example" src={item.image}
                                    style={{ height: '180px' }} onClick={() => {
                          this.showPreview(true, {name:item.name,url:item.image})
                        }}/>}/>
                </List.Item>
              )}
            />
          </DescriptionList>
          <div>
            <Row gutter={16}>
              <Col className="gutter-row" span={5}>
                <div className="gutter-box"></div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div className="gutter-box"><Button type="primary"
                                                    onClick={() => this.handleResult(application.id, 'REAL')}>鉴定为真</Button>
                </div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div className="gutter-box"><Button type="primary"
                                                    onClick={() => this.handleResult(application.id, 'FAKE')}>鉴定为假</Button>
                </div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div className="gutter-box"><Button type="danger"
                                                    onClick={() => this.handleResult(application.id, 'ILLEGAL')}>违规</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        <Modal title={this.state.previewItem==null?"":this.state.previewItem.name} visible={this.state.previewVisible} footer={null} onCancel={() => this.showPreview(false)}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewItem==null?"":this.state.previewItem.url}/>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
