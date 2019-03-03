import React from 'react';
import { Button, Icon, Upload } from 'antd';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const props = {
  // action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  // beforeUpload={this.props.beforeUpload}
  // defaultFileList: [...fileList],
};

class BatchUpload extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    // console.log(info)
    // console.log(info.file.status)

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
      this.props.setImgFile(info.file.originFileObj);
    }
  };

  render() {

    return (

      <Upload {...props} directory onChange={this.handleChange} accept=".jpg, .jpeg" beforeUpload={this.props.beforeUpload}>
        <Button>
          <Icon type="upload"/> 选择文件夹
        </Button>
      </Upload>
    );
  }
}


export default BatchUpload;
