import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import styles from '../product/TableList.less';
import ImageList from './ImageList';


let imgUrl;
let imgFile;

const ADD = 'image/add';
const PAGING = 'image/fetch';
const REMOVE = 'image/remove';
const GET = 'image/get';

const FormItem = Form.Item;
const { TextArea } = Input;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({ image, loading }) => ({
  image,
  loading: loading.models.image,
}))
@Form.create()
class ImageSelector extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '品牌',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '备注信息',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleDelete(true, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: PAGING,
      payload: {},
    });
    console.info('componentDidMount');
  }


  // 详情
  previewItem = id => {
    router.push(`/profile/basic/${id}`);
  };

  // 添加
  handleAdd = fields => {
    const { dispatch } = this.props;
    put(imgFile, (url) => {
      dispatch({
        type: ADD,
        payload: {
          name: fields.name,
          remark: fields.remark,
          url: url,
        },
        callback: () => {
          dispatch({
            type: PAGING,
            payload: {},
          });
        },
      });

      message.success('添加成功');
      this.handleModalVisible();
    });
  };

  // 删除
  handleDelete = (key, currentItem) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '删除项目',
      content: '确定删除该项目吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: REMOVE,
          payload: {
            id: currentItem.id,
          },
          callback: () => {
            dispatch({
              type: PAGING,
              payload: {},
            });
          },
        });
      },
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: PAGING,
        payload: values,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: PAGING,
      payload: {},
    });
  };


  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="品牌名">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {

    const { modalVisible, handleModalVisible } = this.props;
    const {
      image: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (

      <Modal
        title="选择图片"
        centered
        bodyStyle={{ height: '600px', overflow: 'auto' }}
        width="1000px"
        visible={modalVisible}
        onOk={() => handleModalVisible(false)}
        onCancel={() => handleModalVisible(false)}
      >
        <ImageList handleSelectImage={this.props.handleSelectImage}/>
      </Modal>
    );
  }
}

export default ImageSelector;
