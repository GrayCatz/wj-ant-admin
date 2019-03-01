import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import ImageSelector from '../image/ImageSelector';
import ProductImageList from './ProductImageList';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class ProductProfile extends Component {

  state = {
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

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
          <ProductImageList dataSource={data}/>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default ProductProfile;
