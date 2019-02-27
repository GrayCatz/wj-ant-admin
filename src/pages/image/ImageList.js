import React, { Fragment, PureComponent } from 'react';
import OSS from 'ali-oss';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, Col, Dropdown, Form, Icon, Input, List, message, Modal, Row, Select,Upload} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '../../components/Ellipsis';
import styles from './Projects.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

let imgUrl ;
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

const uploadProps = {
  action: '/upload.do',
  multiple: false,
  data: { a: 1, b: 2 },
  headers: {
    Authorization: '$prefix $token',
  },
  onStart(file) {
    console.log('onStart', file, file.name);

    // 实例化OSS Client,具体的参数可参文档配置项
    const client = new OSS({
      // region: 'http://oss-cn-shenzhen.aliyuncs.com',
      region: 'oss-cn-shenzhen',
      accessKeyId: 'LTAIavN8qvYKCn7A',
      accessKeySecret: 'RTzP3aP5QSV0SqL9TMKlwWVp0wNP5G',
      bucket: 'mz-dev-2'
    });

    async function put () {
      console.log(file)
      try {
        // object表示上传到OSS的名字，可自己定义
        // file浏览器中需要上传的文件，支持HTML5 file 和 Blob类型
        let r1 = await client.put(file.name, file);
        console.log('put success: %j', r1);
        let r2 = await client.get('object');
        console.log('get success: %j', r2);
      } catch (e) {
        console.error('error: %j', e);
      }
    }

    put();
  },
  onSuccess(ret, file) {
    console.log('onSuccess', ret, file.name);
    imgUrl= ret.url;
    // https://mz-dev-2.oss-cn-shenzhen.aliyuncs.com/u%3D3377302992%2C3361149372%26fm%3D26%26gp%3D0.jpg
  },
  onError(err) {
    console.log('onError', err);
  },
  onProgress({ percent }, file) {
    console.log('onProgress', `${percent}%`, file.name);
  },
  customRequest({
                  action,
                  data,
                  file,
                  filename,
                  headers,
                  onError,
                  onProgress,
                  onSuccess,
                  withCredentials,
                }) {
    // EXAMPLE: post form-data with 'axios'
    const formData = new FormData();
    if (data) {
      Object.keys(data).map(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    // axios
    //   .post(action, formData, {
    //     withCredentials,
    //     headers,
    //     onUploadProgress: ({ total, loaded }) => {
    //       onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
    //     },
    //   })
    //   .then(({ data: response }) => {
    //     onSuccess(response, file);
    //   })
    //   .catch(onError);

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  },
};


class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="//jsonplaceholder.typicode.com/posts/"
        // beforeUpload={beforeUpload}
        // onChange={this.handleChange}
        {...uploadProps}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{width:'150px',height:'150px'}} /> : uploadButton}
      </Upload>
    );
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

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      form.setFieldsValue('url',imgUrl);
      // fieldsValue.url = imgUrl;
      console.log(fieldsValue)
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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="品牌名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '名称不能为空！' }],
        })(<Input placeholder="请输入"/>)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="品牌名">
        {form.getFieldDecorator('approver2', {
          rules: [{ required: true, message: '请选择审批员' }],
        })(
          <Select placeholder="请选择审批员" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} style={{width:'width: 300px'}}>
            <Select.Option value="xiao">付晓晓</Select.Option>
            <Select.Option value="mao">周毛毛</Select.Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="url">
        {form.getFieldDecorator('url', {
          // rules: [{ required: true, message: '名称不能为空！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('remark', {
          // rules: [{ required: true  ,message: '！}],
        })(<Avatar />)}
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
    dispatch({
      type: ADD,
      payload: {
        name: fields.name,
        remark: fields.remark,
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

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
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

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
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
      <PageHeaderWrapper title="查询表格">
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
              renderItem={item => (
                <List.Item>
                  <Card
                    className={styles.card}
                    hoverable
                    cover={<img alt={item.name} src={item.url}/>}
                  >
                    <Card.Meta
                      title={<a>{item.name}</a>}
                      description={<Ellipsis lines={2}>{item.type}</Ellipsis>}
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
