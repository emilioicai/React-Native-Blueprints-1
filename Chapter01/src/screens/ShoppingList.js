import React from "react";
import { Alert, AsyncStorage } from "react-native";

import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon
} from "native-base";

export default class ShoppingList extends React.Component {
  static navigationOptions = {
    title: "My Groceries List"
  };

  state = {
    products: []
  };

  componentDidMount = async () => {
    const savedProducts = await AsyncStorage.getItem("@productsInList");
    if (savedProducts) {
      this.setState({
        products: JSON.parse(savedProducts)
      });
    }
  };

  /*** User Actions Handlers ***/
  _handleProductPress = async product => {
    this.state.products.forEach(p => {
      if (product.id === p.id) {
        p.gotten = !p.gotten;
      }
      return p;
    });
    this.setState({ products: this.state.products });
  };

  _handleAddProductPress = () => {
    this.props.navigation.navigate("AddProduct", {
      addProduct: async product => {
        const newProductsList = [...this.state.products, product];
        await AsyncStorage.setItem(
          "@productsInList",
          JSON.stringify(newProductsList)
        );
        this.setState({
          products: newProductsList
        });
      },
      deleteProduct: product => {
        this.setState({
          products: this.state.products.filter(p => p.id !== product.id)
        });
      },
      productsInList: this.state.products
    });
  };

  _handleClearPress = () => {
    Alert.alert("Clear all items?", null, [
      { text: "Cancel" },
      { text: "Ok", onPress: () => this.setState({ products: [] }) }
    ]);
  };

  /*** Render ***/
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.products.map(p => {
              return (
                <ListItem
                  key={p.id}
                  onPress={() => this._handleProductPress(p)}
                >
                  <Body>
                    <Text style={{ color: p.gotten ? "#bbb" : "#000" }}>
                      {p.name}
                    </Text>
                  </Body>
                  <Right>
                    <CheckBox
                      checked={p.gotten}
                      onPress={() => this._handleProductPress(p)}
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
        <Fab
          style={{ backgroundColor: "red" }}
          position="bottomLeft"
          onPress={this._handleClearPress}
        >
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}
