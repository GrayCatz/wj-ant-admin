import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider, Form, Input, message, Select } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ProductImageList from './ProductImageList';
import { List } from 'antd/lib/list';
import ImageSelector from '../image/ImageSelector';

const { Description } = DescriptionList;

const FormItem = Form.Item;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
@Form.create()
class ProductProfile extends Component {

  state = {
    enable: false,
    modalVisible: false,
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

  handleModalVisible = (modalVisible) => {
    this.setState({ modalVisible });
  };


  handleCurItemChange = (item) => {
    console.log(item);
    // this.state.curItem = item;
  };

  handleSelectImage = (item) => {
    console.log(item);
    this.props.profile.application.img = item.url;
    this.handleModalVisible(false);
  };


  // handleDelete = (item) => {
  //   item.delete = true;
  // };

  // 查询
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form, profile } = this.props;
    const { application = {} } = profile;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('fieldsValue:', fieldsValue);
      console.log(application);
      dispatch({
        type: 'profile/saveProfile',
        payload: {
          ...fieldsValue,
          img: application.img,
          status: this.state.enable?"ENABLE":application.status,
          remove: application.remove,
          required: application.required,
          optional: application.optional,
        },
        callback: (bSuccess) => {
          console.log('callback');
          message.success(bSuccess ? '保存成功' : '保存失败');
          const { dispatch, match } = this.props;
          const { params } = match;
          dispatch({
            type: 'profile/fetchBasic',
            payload: {
              id: params.id || '1000000000',
            },
          });
        },
      });
    });
  };

  handleDelete = (item) => {
    console.log("handleDelete")
    if (item.id == 0) return;
    let remove = this.props.profile.application.remove;
    if (!remove) {
      remove = [];
    }
    remove.push(item);
    this.props.profile.application.remove = remove;
  };

  handleSave(e,enable){
    console.log( this.props.form);
    this.state.enable = enable;
    // this.props.form.submit(e,()=>{});
  }

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
              <Description term="">
                <Card hoverable
                      bodyStyle={{ padding: 0 }}
                      style={{ width: '90%', margin: '5%' }}
                      cover={<img alt="example" src={application.img}
                                  style={{ height: '180px' }} onClick={() => {
                        this.handleModalVisible(true);
                      }}/>}/>
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }}/>

            <ProductImageList dataSource={application.required} handleSelectImage={this.handleSelectImage}
                              handleCurItemChange={this.handleCurItemChange} handleDelete={this.handleDelete}
                              type='REQUIRED'/>

            <ProductImageList dataSource={application.optional} handleSelectImage={this.handleSelectImage}
                              handleCurItemChange={this.handleCurItemChange} type='OPTIONAL'/>
            <div>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button type="primary" htmlType="submit" onClick={(e)=>this.handleSave(e,true)}>保存并立刻启用</Button>
            </div>
          </Card>
        </Form>
        <ImageSelector modalVisible={this.state.modalVisible} handleModalVisible={this.handleModalVisible}
                       handleSelectImage={this.handleSelectImage}/>
      </PageHeaderWrapper>
    );
  }
}

export default ProductProfile;
