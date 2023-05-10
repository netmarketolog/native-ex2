import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Camera } from "expo-camera";

const CreatePostScreen = () => {
  const [imgRef, setImgRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const takePhoto = async () => {
    const photo = await imgRef.takePictureAsync();
    setPhoto(photo.uri);
    console.log(photo.uri);
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.camera}>
          <Image
            source={{ uri: photo }}
            style={{ height: "100%", width: "100%" }}
          />
          <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
            <Image source={require("../../../img/camera.png")} />
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={styles.camera} ref={setImgRef}>
          <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
            <Image source={require("../../../img/camera.png")} />
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: "center", схлопывает камеру
  },
  camera: {
    height: 300,
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
    background: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
  },
  cameraBtn: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
});
export default CreatePostScreen;
