import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider, Form, Input, Select } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import ProductImageList from './ProductImageList';

const { Description } = DescriptionList;

const FormItem = Form.Item;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
@Form.create()
class ProductProfile extends Component {

  state = {};

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

  // 查询
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form,profile } = this.props;
    const { application = {} } = profile;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('fieldsValue:', fieldsValue);
      //
      // const values = {
      //   ...fieldsValue,
      //   updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      // };
      //
      // this.setState({
      //   formValues: values,
      // });
      //
      // dispatch({
      //   type: PAGING,
      //   payload: values,
      // });
      console.log(application)
      dispatch({
        type: 'profile/saveProfile',
        payload: {
          ...fieldsValue,
          required: application.required,
          optional: application.optional,
        },
      });

    });
  };

  handleSave = () => {
    const { dispatch, match, application } = this.props;
    const { params } = match;
    console.log(this.props.profile.application);
    dispatch({
      type: 'profile/saveProfile',
      payload: this.props.profile.application,
    });
  };

  mapPropsToFields = (props) => {
    const { profile = {}, loading } = props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;
    console.log(application);
    return {
      name: Form.createFormField({
        ...application.name,
        value: application.name,
      }),
    };
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { profile = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;
    const fields = this.state.fields;
    // const data = [
    //   {
    //     title: 'Title 1',
    //   },
    //   {
    //     title: 'Title 2',
    //   },
    //   {
    //     title: 'Title 3',
    //   },
    //   {
    //     title: 'Title 4',
    //   },
    // ];
    return (
      <PageHeaderWrapper title="产品详情页" loading={loading}>
        <Form onSubmit={this.handleSearch} layout="inline">

          <Card bordered={false}>
            <DescriptionList size="large" title="产品信息" style={{ marginBottom: 32 }}>
              <Description term="" style={{ display: 'none' }}>
                <FormItem label="">
                  {getFieldDecorator('id', {
                    initialValue: application.id,
                  })(<Input placeholder="请输入"/>)}
                </FormItem>
              </Description>
              <Description term="">
                <FormItem label="产品名">
                  {getFieldDecorator('name', {
                    initialValue: application.name,
                  })(<Input placeholder="请输入"/>)}
                </FormItem>
              </Description>
              <Description term="">
                <FormItem label="品牌">
                  {getFieldDecorator('brand', {
                    initialValue: application.brand,
                  })(<Input placeholder="请输入"/>)}
                </FormItem>
              </Description>
              <Description term="">
                <FormItem label="类别">
                  {getFieldDecorator('category', {
                    initialValue: application.category,
                  })(<Input placeholder="请输入"/>)}
                </FormItem>
              </Description>
              <Description term="">
                <Form.Item label="状态">
                  {getFieldDecorator('status', {
                    initialValue: application.status,
                    rules: [{ required: true, message: '请输入状态' }],
                  })(
                    <Select>
                      <Select.Option value="ENABLE">启用</Select.Option>
                      <Select.Option value="DISABLE">禁用</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }}/>
            <DescriptionList size="large" title="产品示例图" style={{ marginBottom: 32 }}>
              <Description term="品牌">{application.brand}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }}/>

            <div className={styles.title}>必填</div>
            <ProductImageList dataSource={application.required}/>
            <div className={styles.title}>选填</div>
            <ProductImageList dataSource={application.optional}/>
            <div>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button type="primary">保存并立刻启用</Button>
            </div>
          </Card>
        </Form>

      </PageHeaderWrapper>
    );
  }
}

export default ProductProfile;
