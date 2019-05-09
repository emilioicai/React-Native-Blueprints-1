import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "native-base";
import { RNCamera } from "react-native-camera";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";

class CameraScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="camera" style={{ fontSize: 40, color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
        >
          <Button
            onPress={this.takePicture.bind(this)}
            style={{ flex: 0, alignSelf: "center" }}
            transparent
          >
            <Icon
              name="camera"
              style={{ fontSize: 70, color: "white", paddingBottom: 80 }}
            />
          </Button>
        </RNCamera>
        <Button
          onPress={() => this.props.navigation.navigate("ImagesList")}
          style={{ position: "absolute", top: 20 }}
          transparent
        >
          <Icon
            ios="ios-arrow-dropleft"
            android="md-arrow-dropleft"
            style={{ fontSize: 30, color: "white" }}
          />
        </Button>
      </View>
    );
  }

  async takePicture() {
    const options = {};
    //options.location = ...
    const data = await this.camera.takePictureAsync(options);
    this.props.addImage(data);
    this.props.navigation.navigate("ImagesList");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end"
  }
});

function mapStateToProps(state) {
  return {};
}
function mapStateActionsToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapStateActionsToProps
)(CameraScreen);
