import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, Button } from "react-native";

import { Camera  } from "expo-camera";

const CreatePostScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imgRef, setImgRef] = useState(null); // Camera {}
  const [photo, setPhoto] = useState(null); // Хранит снимок 

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }




  const takePhoto = async () => {
    const photo = await imgRef.takePictureAsync(); // Делает снимок и сохраняет его в каталог кеша приложения.
    setPhoto(photo.uri);
  };


  return (
    <View style={styles.container}>
      
        {!permission.granted ? (
          <View style={styles.request}>
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
        (<View style={styles.containerCamera} >
          <Camera style={styles.camera} ref={setImgRef} >
          {photo && (
          <View style={styles.takePhotoContainer}>
          <Image
            source={{ uri: photo }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        )}
          {!photo && (<TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
            <Image source={require("../../../img/camera.png")} />
          </TouchableOpacity>)}
        </Camera>
          <View style={{ flex: 1, marginTop: 8,}}>
            {!photo ? (<TouchableOpacity
              activeOpacity={0.7}
              onPress={requestPermission}
            >
              <Text style={styles.btnTextCamera}>Загрузите фото</Text>
            </TouchableOpacity>
            ) : ( 
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPhoto(null)}
            >
              <Text style={styles.btnTextCamera}>Новое фото</Text>
            </TouchableOpacity>)}
          </View>
        </View> ) 
        }
      

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerCamera:{
    flex: 1,
    
    width: 340,
    height: 270,
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
  btnTextCamera:{
    width: 156,
    height: 19,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    },
});
export default CreatePostScreen;
