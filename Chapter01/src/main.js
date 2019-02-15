import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ShoppingList from "./screens/ShoppingList.js";
import AddProduct from "./screens/AddProduct.js";

const Navigator = createAppContainer(
  createStackNavigator({
    ShoppingList: { screen: ShoppingList },
    AddProduct: { screen: AddProduct }
  })
);

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
