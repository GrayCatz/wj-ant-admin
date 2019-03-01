import React, { Fragment, PureComponent } from 'react';
import OSS from 'ali-oss';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, Col, Dropdown, Form, Icon, Input, List, message, Modal, Row, Select } from 'antd';
import AvatarUpload from './AvatarUpload';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';


let imgUrl;
let imgFile;


// 实例化OSS Client,具体的参数可参文档配置项
const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAIavN8qvYKCn7A',
  accessKeySecret: 'RTzP3aP5QSV0SqL9TMKlwWVp0wNP5G',
  bucket: 'mz-dev-2',
});

async function put(file, callback) {
  console.log(file);
  try {
    // object表示上传到OSS的名字，可自己定义
    // file浏览器中需要上传的文件，支持HTML5 file 和 Blob类型
    let r1 = await client.put(file.name, file);
    console.log('put success: %j', r1);
    let r2 = await client.get(file.name);
    console.log('get success: %j', r2);
    callback(r1.url);
  } catch (e) {
    console.error('error: %j', e);
  }
}

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
let setImgFile = (file) => {
  imgFile = file;
};
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    // put();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="添加"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '图片名不能为空！' }],
        })(<Input placeholder="请输入"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择图片类型' }],
        })(
          <Select
            style={{ width: '32%' }}
          >
            <Select.Option value="1">产品图</Select.Option>
            <Select.Option value="2">产品鉴别图标</Select.Option>
            <Select.Option value="3">产品鉴别示例图</Select.Option>
          </Select>,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上传图片">
        {form.getFieldDecorator('image', {
          // rules: [{ required: true  ,message: '！}],
        })(<AvatarUpload setImgFile={setImgFile}/>)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ image, loading }) => ({
  image,
  loading: loading.models.image,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
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

  // 分页事件
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: PAGING,
      payload: params,
    });
  };

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
          type: fields.type,
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
    console.log(currentItem);
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

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
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

    console.log('props:', this.props);
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      total: 50,
      onChange: (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
          const newObj = { ...obj };
          newObj[key] = getValue(filtersArg[key]);
          return newObj;
        }, {});

        const params = {
          page: pagination.current,
          size: pagination.pageSize,
          ...formValues,
          ...filters,
        };
        // if (sorter.field) {
        //   params.sorter = `${sorter.field}_${sorter.order}`;
        // }

        dispatch({
          type: PAGING,
          payload: params,
        });
      },
    };

    const {
      image: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="图片管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down"/>
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              dataSource={data.list}
              pagination={paginationProps}
              renderItem={item => (
                <List.Item>
                  <Card
                    className={styles.card}
                    bodyStyle={{ padding: '5px', textAlign: 'center', height: '30px' }}
                    hoverable
                    cover={<a href={item.url} target="blank" style={{ width: '100%' }}><img alt={item.name}
                                                                                            src={item.url} style={{
                      height: '180px',
                      width: '100%',
                    }}/></a>}
                  >
                    <Card.Meta
                      style={{}}
                      title={<span> {item.name}</span>}
                    />
                  </Card>
                </List.Item>

              )}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
