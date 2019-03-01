import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import FeedsList from "./screens/FeedsList.js";
import FeedDetail from "./screens/FeedDetail.js";
import EntryDetail from "./screens/EntryDetail.js";
import AddFeed from "./screens/AddFeed.js";

import store from "./store";

const Navigator = createAppContainer(
  createStackNavigator({
    FeedsList: { screen: FeedsList },
    FeedDetail: { screen: FeedDetail },
    EntryDetail: { screen: EntryDetail },
    AddFeed: { screen: AddFeed }
  })
);

export default class App extends React.Component {
  render() {
    return <Navigator screenProps={{ store }} />;
  }
}
