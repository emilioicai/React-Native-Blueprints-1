import React from "react";
import prompt from "react-native-prompt-android";
import { AsyncStorage } from "react-native";
import {
  Body,
  Container,
  Content,
  List,
  ListItem,
  Right,
  Text,
  Fab,
  Icon
} from "native-base";

export default class AddProduct extends React.Component {
  static navigationOptions = {
    title: "Add a product"
  };

  state = {
    allProducts: [
      { id: 1, name: "bread" },
      { id: 2, name: "eggs" },
      { id: 3, name: "paper towels" },
      { id: 4, name: "milk" }
    ],
    productsInList: []
  };

  componentDidMount = async () => {
    const savedProducts = await AsyncStorage.getItem("@allProducts");
    if (savedProducts) {
      this.setState({
        allProducts: JSON.parse(savedProducts)
      });
    }

    this.setState({
      productsInList: this.props.navigation.state.params.productsInList
    });
  };

  addNewProduct = async name => {
    const newProductsList = this.state.allProducts.concat({
      name: name,
      id: Math.floor(Math.random() * 100000)
    });

    await AsyncStorage.setItem("@allProducts", JSON.stringify(newProductsList));

    this.setState({
      allProducts: newProductsList
    });
  };

  /*** User Actions Handlers ***/
  _handleProductPress = product => {
    const productIndex = this.state.productsInList.findIndex(
      p => p.id === product.id
    );
    if (productIndex > -1) {
      this.setState({
        productsInList: this.state.productsInList.filter(
          p => p.id !== product.id
        )
      });
      this.props.navigation.state.params.deleteProduct(product);
    } else {
      this.setState({
        productsInList: this.state.productsInList.concat(product)
      });
      this.props.navigation.state.params.addProduct(product);
    }
  };

  _handleAddProductPress = () => {
    prompt(
      "Enter product name",
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: this.addNewProduct }
      ],
      {
        type: "plain-text"
      }
    );
  };

  _handleRemovePress = async product => {
    this.setState({
      allProducts: this.state.allProducts.filter(p => p.id !== product.id)
    });
    await AsyncStorage.setItem(
      "@allProducts",
      JSON.stringify(this.state.allProducts.filter(p => p.id !== product.id))
    );
  };

  /*** Render ***/
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.allProducts.map(product => {
              const productIsInList = this.state.productsInList.find(
                p => p.id === product.id
              );
              return (
                <ListItem
                  key={product.id}
                  onPress={() => this._handleProductPress(product)}
                >
                  <Body>
                    <Text
                      style={{
                        color: productIsInList ? "#bbb" : "#000"
                      }}
                    >
                      {product.name}
                    </Text>
                    {productIsInList && (
                      <Text note>{"Already in shopping list"}</Text>
                    )}
                  </Body>
                  <Right>
                    <Icon
                      ios="ios-remove-circle"
                      android="md-remove-circle"
                      style={{ color: "red" }}
                      onPress={() => this._handleRemovePress(product)}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={this._handleAddProductPress}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
