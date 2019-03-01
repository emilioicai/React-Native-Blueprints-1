import { observable, decorate } from "mobx";
import { AsyncStorage } from "react-native";

class Store {
  constructor() {
    AsyncStorage.getItem("@feeds").then(sFeeds => {
      this.feeds = JSON.parse(sFeeds) || [];
    });
  }

  _persistFeeds() {
    AsyncStorage.setItem("@feeds", JSON.stringify(this.feeds));
  }

  addFeed(url, feed) {
    this.feeds.push({
      url,
      entry: feed.entry,
      title: feed.title,
      updated: feed.updated
    });
    this._persistFeeds();
  }

  removeFeed(url) {
    this.feeds = this.feeds.filter(f => {
      return f.url !== url;
    });
    this._persistFeeds();
  }

  selectFeed(feed) {
    this.selectedFeed = feed;
  }

  selectEntry(entry) {
    this.selectedEntry = entry;
  }
}

decorate(Store, {
  feeds: observable,
  selectedFeed: observable
});

const store = new Store();
export default store;
