import React, { Component } from 'react';
import { Button, Card, Icon, List } from 'antd';
import ImageSelector from '../image/ImageSelector';
import styles from './BasicProfile.less';

class ProductImageList extends Component {

  state = {
    modalVisible: false,
    curItem: null,
    dataSource: this.props.dataSource,
  };

  // handleSelector = (file) => {
  //   console.log("handleSelector")
  // };
  handleModalVisible1 = (modalVisible, item) => {
    this.setState({ modalVisible });
    this.state.curItem = item;
    // this.props.handleCurItemChange(item);
  };

  handleModalVisible = (modalVisible) => {
    this.setState({ modalVisible });
  };

  handleSelectImage = (item) => {
    console.log(item);
    this.handleModalVisible(false);
    this.state.curItem.url = item.url;
    // this.props.handleSelectImage(item);
  };

  handleDelete = (item, index) => {
    // item.delete = true;
    console.log(index);
    console.log(item);
    item.delete = true;
    // for (const item2 in this.state.dataSource) {
    //   console.log(item2)
    //   if (item2.id == item.id) {
    //     item2.delete = true;
    //     console.log("true:"+item2)
    //   }
    // }
    this.state.dataSource.splice(index, 1);
    // this.state.dataSource.remove(item)
    this.setState({
      dataSource: this.state.dataSource,
    });
    // item.delete = 'none';
    this.props.handleDelete(item);
  };

  handleAdd = () => {
    this.state.dataSource.push({
      id: 0,
      example: { url: '' },
      name: '管体正面',
      realExample: { url: 'http://mz-dev-2.oss-cn-shenzhen.aliyuncs.com/20141226115820_hxv3N.thumb.700_0.jpeg' },
      type: this.props.type,
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  render() {
    const { profile = {}, loading, dataSource } = this.props;
    this.state.dataSource = dataSource;
    return (
      <div>
        <div className={styles.title}>{this.props.type=="REQUIRED"?"必填":"选填"} <Button type="primary" shape="circle" icon="plus" size="small"
                                                 onClick={() => this.handleAdd()}/></div>
        <List
          // grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.dataSource}
          renderItem={(item, index) => (
            <div
            >
              <List.Item
                // style={{
                //   border: '1px solid #ccc',
                //   textAlign: 'center',
                //   padding: '20px',
                //   position: 'relative',
                //   display: item.delete ? 'none' : '',
                // }}
                style={{ width: '200px', float: 'left', marginRight: '20px' }}
              >
                <div
                  style={{
                    width: '200px',
                    float: 'left',
                    margin: '0px 20px',
                    textAlign: 'center',
                    border: '1px solid #ccc',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{ lineHeight: '30px' }}
                  >{item.name}</div>
                  <div style={{ cursor: 'pointer', position: 'absolute', right: 15, top: 10 }}><Icon type="close"
                                                                                                     onClick={() => this.handleDelete(item, index)}/>
                  </div>
                  <Card hoverable
                        bodyStyle={{ padding: 0 }}
                    // style={{ width: '90%', margin: '5%' }}
                        style={{ width: '180px', margin: '10px' }}
                        cover={<img alt="example" src={item.example.url}
                                    style={{ height: '180px' }} onClick={() => {
                          this.handleModalVisible1(true, item.example);
                        }}/>}/>
                  <Card hoverable
                        bodyStyle={{ padding: 0 }}
                    // style={{ width: '90%', margin: '5%' }}
                        style={{ width: '180px', margin: '10px' }}
                        cover={<img alt="example" src={item.realExample.url}
                                    style={{ height: '180px' }} onClick={() => {
                          this.handleModalVisible1(true, item.realExample);
                        }}/>}/>
                </div>

              </List.Item>
              <ImageSelector modalVisible={this.state.modalVisible} handleModalVisible={this.handleModalVisible}
                             handleSelectImage={this.handleSelectImage}/>
            </div>
          )}
        />
      </div>
    );
  }
}

export default ProductImageList;
