import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, Button } from "react-native";

import { Camera  } from "expo-camera";

const CreatePostScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imgRef, setImgRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }




  const takePhoto = async () => {
    const photo = await imgRef.takePictureAsync();
    setPhoto(photo.uri);
  };

  return (
    <View style={styles.container}>
        {!permission.granted ? (
          <View style={{ flex: 1, marginTop: 120,}}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={requestPermission}
          >
            <Text style={styles.btnText}>Grant permission</Text>
          </TouchableOpacity>
        </View>
        ):
        (<Camera style={styles.camera} ref={setImgRef} >
          {photo && (
          <View style={styles.takePhotoContainer}>
          <Image
            source={{ uri: photo }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        )}
          <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
            <Image source={require("../../../img/camera.png")} />
          </TouchableOpacity>
        </Camera>)
        }

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  request:{
    flex: 1,
    marginTop: 120,
    width: 340,
    height: 240,
  
  },
  camera: {
    width: 340,
    height: 240,
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
    background: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    alignItems: "center"
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
     width: "100%"
  },
  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    overflow: 'hidden',
    background: 'transparent',
    borderRadius: 30,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    },
    btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    },
});
export default CreatePostScreen;
