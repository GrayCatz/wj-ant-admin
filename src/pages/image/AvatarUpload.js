import React from 'react';
import { Icon, Upload } from 'antd';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class AvatarUpload extends React.Component {
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
      this.props.setImgFile(info.file.originFileObj);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        action="/"
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="//jsonplaceholder.typicode.com/posts/"
        // beforeUpload={beforeUpload}
        onChange={this.handleChange}
  >
  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '150px', height: '150px' }}/> : uploadButton}
  </Upload>
  )
  }
}


export default AvatarUpload;
