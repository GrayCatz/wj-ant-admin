import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider, Icon, List } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import ImageSelector from './ImageSelector';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class ProductProfile extends Component {

  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    console.log(params);
    dispatch({
      type: 'profile/fetchBasic',
      payload: {
        id: params.id || '1000000000',
      },
    });
  }

  setModal2Visible = (modalVisible) => {
    console.log('ssdd:', this);
    this.setState({ modalVisible });
  };

  render() {
    const { profile = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;
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
      <PageHeaderWrapper title="产品详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="产品信息" style={{ marginBottom: 32 }}>
            <Description term="产品名">{application.name}</Description>
            <Description term="品牌">{application.brand}</Description>
            <Description term="类别">{application.category}</Description>
            <Description term="状态">{application.status}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }}/>
          <DescriptionList size="large" title="产品示例图" style={{ marginBottom: 32 }}>
            <Description term="品牌">{application.brand}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }}/>

          <div className={styles.title}>必填</div>

          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item
                style={{ border: '1px solid #ccc', textAlign: 'center', padding: '20px', position: 'relative' }}>
                <div>
                  <span>管体正面</span>
                  <div style={{ cursor: 'pointer', position: 'absolute', right: 15, top: 10 }}><Icon type="close"/>
                  </div>
                </div>
                <Card hoverable
                      bodyStyle={{ padding: 0 }}
                      style={{ width: '90%', margin: '5%' }}
                      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                  style={{ height: '180px' }}/>}/>
                <Card hoverable
                      bodyStyle={{ padding: 0 }}
                      style={{ width: '90%', margin: '5%' }}
                      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                  style={{ height: '180px' }}/>}/>
              </List.Item>
            )}
          />

        </Card>

        <Button type="primary" onClick={() => this.setModal2Visible(true)}>Vertically centered modal dialog</Button>

        <ImageSelector modalVisible={this.state.modalVisible} handleModalVisible={this.setModal2Visible}/>
      </PageHeaderWrapper>
    );
  }
}

export default ProductProfile;
