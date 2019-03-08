import React, { Component } from 'react';
import { Button, Card, Icon, List } from 'antd';
import ImageSelector from '../image/ImageSelector';
import styles from './BasicProfile.less';
import NameForm from './NameForm';

class ProductImageList extends Component {

  state = {
    modalVisible: false,
    curItem: null,
    dataSource: this.props.dataSource,
    nameFormVisible: false,
    namedItem: null,
  };

  handleNameFormVisible = (nameFormVisible, namedItem) => {
    this.setState({ nameFormVisible, namedItem });
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

  handleAdd = (fieldValues, namedItem) => {
    if (namedItem) {
      namedItem.name = fieldValues.name;
    } else {
      this.state.dataSource.push({
        id: 0,
        example: { url: '' },
        name: fieldValues.name,
        realExample: { url: '' },
        type: this.props.type,
      });
      this.setState({
        dataSource: this.state.dataSource,
      });
    }
  };

  render() {
    const { profile = {}, loading, dataSource } = this.props;
    const { nameFormVisible } = this.state;
    // console.log(nameFormVisible)

    this.state.dataSource = dataSource;
    return (
      <div>
        <div className={styles.title} style={{ paddingLeft: '20px' }}>{this.props.type == 'REQUIRED' ? '必填' : '选填'}
          <Button type="primary"
                  shape="circle" icon="plus"
                  style={{ marginLeft: '20px' }}
                  size="small"
                  onClick={() => this.handleAdd({ name: '' })}/>
          <NameForm visible={this.state.nameFormVisible}
                    handleModalVisible={this.handleNameFormVisible}
                    handleAdd={this.handleAdd}
                    namedItem={this.state.namedItem}/>
        </div>
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
                    style={{
                      lineHeight: '35px',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                      height: '35px',
                    }}
                    onClick={() => this.handleNameFormVisible(true, item)}
                  >{item.name}</div>
                  <div style={{ cursor: 'pointer', position: 'absolute', right: 15, top: 10 }}><Icon type="close"
                                                                                                     onClick={() => this.handleDelete(item, index)}/>
                  </div>
                  <Card hoverable
                        bodyStyle={{ height: '30px', lineHeight: '35px', padding: 0, borderTop: '1px solid #ccc' }}
                    // style={{ width: '90%', margin: '5%' }}
                        style={{ width: '180px', margin: '10px' }}
                        cover={<img alt="example" src={item.example.url}
                                    style={{ height: '180px' }} onClick={() => {
                          this.handleModalVisible1(true, item.example);
                        }}/>}
                  >
                    <Card.Meta
                      title="鉴别图标"
                    />
                  </Card>
                  <Card hoverable
                        bodyStyle={{ height: '30px', lineHeight: '35px', padding: 0, borderTop: '1px solid #ccc' }}
                    // style={{ width: '90%', margin: '5%' }}
                        style={{ width: '180px', margin: '10px' }}
                        cover={<img alt="example" src={item.realExample.url}
                                    style={{ height: '180px' }} onClick={() => {
                          this.handleModalVisible1(true, item.realExample);
                        }}/>}>
                    <Card.Meta
                      title="鉴别示例图"
                    />

                  </Card>
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
