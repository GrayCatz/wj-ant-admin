import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, Col, Dropdown, Form, Icon, Input, List, message, Modal, Row, Select, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';
import CreateForm from './CreateForm';
import BatchImport from './BatchImport';

const FormItem = Form.Item;

const ADD = 'image/add';
const BATCH_ADD = 'image/batchAdd';
const PAGING = 'image/fetch';
const REMOVE = 'image/remove';
const GET = 'image/get';

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
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    batchImportVisible: false,
    selectedRows: [],
    formValues: {},
    previewVisible: false,
    previewItem: null,
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

  // 添加
  handleAddSuccess = (fields, url) => {
    const { dispatch } = this.props;
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
  };

  // 添加
  handleBatchAddSuccess = (req) => {
    console.log('handleBatchAddSuccess');
    const { dispatch } = this.props;
    dispatch({
      type: BATCH_ADD,
      payload: req,
      callback: () => {
        message.success('导入成功');
        this.handleBatchImportVisible(false);
        dispatch({
          type: PAGING,
          payload: {},
        });
      },
    });
  };

  // 删除
  handleDelete = (item) => {
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
            id: item.id,
          },
          callback: () => {
            message.success('删除成功');
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

  handleBatchImportVisible = flag => {
    this.setState({
      batchImportVisible: !!flag,
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
            <FormItem label="图片名称">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="图片类型">
              {getFieldDecorator('type', {
                initialValue: '',
              })(
                <Select placeholder="" style={{ width: '100%' }}>
                  <Select.Option value="">请选择</Select.Option>
                  <Select.Option value="PRODUCT">产品图</Select.Option>
                  <Select.Option value="PRODUCT_EXAMPLE">产品鉴别图标</Select.Option>
                  <Select.Option value="PRODUCT_REAL_EXAMPLE">产品鉴别示例图</Select.Option>
                </Select>,
              )}
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


    const {
      image: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    // console.log("data:",data)
    let paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 1,
      defaultPageSize: 20,
      ...data.pagination,
      // pageSize: 10,
      // total: 50,
      onChange: (page, pageSize) => {
        console.log('data:', page);
        console.log('data:', pageSize);
        const { dispatch } = this.props;
        const params = {
          page: page,
          size: pageSize,
        };
        dispatch({
          type: PAGING,
          payload: params,
        });
      },
      onShowSizeChange: (page, pageSize) => {
        const { dispatch } = this.props;
        const params = {
          page: page,
          size: pageSize,
        };
        dispatch({
          type: PAGING,
          payload: params,
        });
      },
    };


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleAddSuccess: this.handleAddSuccess,
      handleBatchAddSuccess: this.handleBatchAddSuccess,
      handleBatchImportVisible: this.handleBatchImportVisible,
    };
    let card = (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button icon="plus" type="primary" onClick={() => this.handleBatchImportVisible(true)}>
                批量导入
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
              grid={{ gutter: 20, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              dataSource={data.list}
              pagination={paginationProps}
              renderItem={item => (
                <List.Item style={{ width: '182px', height: '150px', float: 'left', margin: '30px 20px' }}>
                  <Card
                    className={styles.card}
                    extra={<Icon type="close"
                                 onClick={() => this.handleDelete(item)}/>}
                    // loading={true}
                    headStyle={{
                      height: '0px',
                      position: 'absolute',
                      right: '10px',
                      color: 'red',
                      border: '0',
                      padding: '0',
                    }}
                    bodyStyle={{ padding: '5px', textAlign: 'center', height: '30px' }}
                    hoverable
                    // cover={<a href={item.url} target="blank" style={{ width: '100%' }} onClick={()=>{this.props.handleSelectImage(item)}}><img alt={item.name}
                    //                                                                         src={item.url} style={{
                    //   height: '180px',
                    //   width: '100%',
                    // }}/></a>}
                    // cover={<img alt={item.name} src={item.url}
                    //   // style={{height: '180px',width: '100%',}}
                    //             style={{ width: '180px', height: '150px' }}
                    //             onClick={() => {
                    //               this.props.handleSelectImage ? this.props.handleSelectImage(item) : window.open(item.url);
                    //             }}/>}
                    cover={<img alt={item.name} src={item.url}
                      // style={{height: '180px',width: '100%',}}
                                style={{ width: '180px', height: '150px' }}
                                onClick={() => {
                                  this.props.handleSelectImage ? this.props.handleSelectImage(item) : this.showPreview(true, item);
                                }}/>}
                  >
                    <Card.Meta
                      style={{}}
                      title={
                        <Tooltip title={item.name}>
                          <span>{item.name}</span>
                        </Tooltip>}
                    />
                  </Card>
                </List.Item>

              )}
            />
          </div>
        </Card>
        <Modal title={this.state.previewItem==null?"":this.state.previewItem.name} visible={this.state.previewVisible} footer={null} onCancel={() => this.showPreview(false)}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewItem==null?"":this.state.previewItem.url}/>
        </Modal>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
        <BatchImport {...parentMethods} modalVisible={this.state.batchImportVisible}/>

      </div>
    );
    return (
      this.props.isSelector ? card :
        <PageHeaderWrapper title="图片管理">
          {card}
        </PageHeaderWrapper>
    );
  }
}

export default TableList;
