import React from "react";
import {
  createDrawerNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { Platform } from "react-native";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imagesReducer from "./reducers/images";

import ImagesList from "./screens/ImagesList.js";
import MyImages from "./screens/MyImages.js";
import Camera from "./screens/Camera.js";

let Navigator;
if (Platform.OS === "ios") {
  Navigator = createBottomTabNavigator(
    {
      ImagesList: { screen: ImagesList },
      MyImages: { screen: MyImages },
      Camera: { screen: Camera }
    },
    {
      tabBarOptions: {
        inactiveTintColor: "#aaa",
        activeTintColor: "#000",
        showLabel: false
      }
    }
  );
} else {
  Navigator = createDrawerNavigator({
    ImagesList: { screen: ImagesList },
    MyImages: { screen: MyImages },
    Camera: { screen: Camera }
  });
}

const AppContainer = createAppContainer(Navigator);

let store = createStore(
  combineReducers({ imagesReducer }),
  applyMiddleware(thunk)
);

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
