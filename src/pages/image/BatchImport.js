import React, { PureComponent } from 'react';
import OSS from 'ali-oss';
import { Form, message, Modal } from 'antd';
import BatchUpload from './BatchUpload';

const FormItem = Form.Item;

let imgUrl;
let imgFile = [];

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
    console.log('sdfsdf: %j', client);
    let r1 = await client.put(file.name, file);
    console.log('put success: %j', r1);
    let r2 = await client.get(file.name);
    console.log('get success: %j', r2);
    callback(file, r1.url);
    console.info('单个上传完成：', r1);
  } catch (e) {
    console.error('error: %j', e);
  }
}

async function putBatch(fileList, callback) {
  let req = {
    images: [],
  };
  // console.log('fileList:');
  // console.log(fileList);
  for (const index in fileList) {
    console.info('单个上传：', index);
    await put(fileList[index], (file, url) => {
      req.images.push({
        name: file.name,
        url: url,
      });
    });
  }
  console.info('批量上传结束');
  if (callback) callback(req);
  return req;
};


@Form.create()
class BatchImport extends PureComponent {
  // 添加
  handleAdd = (fields) => {
    put(imgFile, (url) => {
      this.props.handleAddSuccess(fields, url);
    });
  };
  setImgFile = (file) => {
    imgFile.push(file);
  };
  // 添加

  handleBatchAdd = (fields) => {
    if (imgFile == null || imgFile.length == 0) {
      message.error('请先选择图片');
      return;
    }
    // console.log('handleBatchAdd:');
    // console.log(imgFile);
    let req = putBatch(imgFile, (req) => {
      // this.props.handleAddSuccess(fields, url);
      this.props.handleBatchAddSuccess(req);
    });
  };


  render() {
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const okHandle = () => {
      // put();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        this.handleBatchAdd(fieldsValue);
      });
    };
    return (
      <Modal
        destroyOnClose
        title="批量导入"
        visible={modalVisible}
        okText="开始导入"
        onOk={okHandle}
        onCancel={() => this.props.handleBatchImportVisible(false)}
      >
        <div>
          <p>导入规则：</p>
          <p style={{ paddingLeft: '20px' }}>若导入<span style={{ color: 'red' }}>产品图</span>，例如dior烈焰蓝金口红，</p>
          <p style={{ paddingLeft: '40px' }}>图片命名需为：Dior/迪奥，烈焰蓝金口红-<span style={{ color: 'red' }}>产品图</span></p>
          <p style={{ paddingLeft: '40px' }}>导入格式：<span style={{ color: 'red' }}>品牌-产品-产品图</span></p>
          <p style={{ paddingLeft: '20px' }}>若导入<span style={{ color: 'red' }}>产品鉴别图标</span>，例如dior烈焰蓝金口红，</p>
          <p style={{ paddingLeft: '40px' }}>图片命名需为：Dior/迪奥，烈焰蓝金口红-<span style={{ color: 'red' }}>产品鉴别图标</span></p>
          <p style={{ paddingLeft: '40px' }}>导入格式：<span style={{ color: 'red' }}>品牌-产品-产品鉴别图标</span></p>
          <p style={{ paddingLeft: '20px' }}>若导入<span style={{ color: 'red' }}>产品鉴别示例图</span>，例如dior烈焰蓝金口红，</p>
          <p style={{ paddingLeft: '40px' }}>图片命名需为：Dior/迪奥，烈焰蓝金口红-<span style={{ color: 'red' }}>产品鉴别示例图</span></p>
          <p style={{ paddingLeft: '40px' }}>导入格式：<span style={{ color: 'red' }}>品牌-产品-产品鉴别示例图</span></p>
          <p>导入图片格式需要：JPG</p>
        </div>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="">
          {form.getFieldDecorator('image', {
            // rules: [{ required: true  ,message: '！}],
          })(<BatchUpload setImgFile={this.setImgFile}></BatchUpload>)}
        </FormItem>
      </Modal>
    );
  }

}

export default BatchImport;
