import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';

import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { db, storage } from '../../firebase/firebaseConfig'; // Инициализация БД
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Загрузка файлов
import { doc, setDoc } from 'firebase/firestore'; // Добавление документа в коллекцию
import { nanoid } from '@reduxjs/toolkit';

const CreatePostScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null); // Запросы на доступ
  const [imgRef, setImgRef] = useState(null); // Camera {}
  const [photo, setPhoto] = useState(null); // Хранит снимок
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationCoords, setLocationCoords] = useState(null);

  const { login, userId } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    // Camera permissions are still loading
    return (
      <View style={styles.erRequest}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    try {
      const photo = await imgRef.takePictureAsync(); // Делает снимок и сохраняет его в каталог кеша приложения.
      const location = await Location.getCurrentPositionAsync();
      setPhoto(photo.uri);
      setLocationCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log('Error taking photo: ', error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const id = nanoid();
      const storageRef = ref(storage, `photos/${id}`);
      const response = await fetch(photo);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob).then(snapshot => {
        console.log('Uploaded a blob or file!');
      });
      const photoUrl = await getDownloadURL(storageRef);
      return { photoUrl, id };
    } catch (error) {
      console.log('Error uploading photo: ', error.message);
      throw error;
    }
  };

  const uploadPostToServer = async () => {
    try {
      const { photoUrl, id } = await uploadPhotoToServer();
      const postRef = doc(db, 'posts', id); // Задайте имя документа
      await setDoc(postRef, {
        id,
        login,
        userId,
        photoUrl,
        title,
        location,
        locationCoords,
        date: new Date(),
      });
    } catch (error) {
      console.log('Error uploading post: ', error.message);
      throw error;
    }
  };

  const createPost = async () => {
    try {
      await uploadPostToServer();
      navigation.navigate('DefaultScreen');
      setPhoto(null);
      setTitle('');
      setLocation('');
      setLocationCoords(null);
    } catch (error) {
      console.log('Error creating post: ', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Создать публикацию</Text>
          <Image
            style={{ position: 'absolute', left: 16, bottom: 10 }}
            source={require('../../../img/arrow-left.png')}
          />
        </View>
        <ScrollView style={styles.main}>
          <Camera style={styles.camera} ref={setImgRef}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>
            )}
            {!photo && (
              <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
                <Image source={require('../../../img/camera.png')} />
              </TouchableOpacity>
            )}
          </Camera>
          <View style={{ marginTop: 8 }}>
            {!photo ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPhoto(null)}
              >
                <Text style={styles.btnTextCamera}>Загрузите фото</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPhoto(null)}
              >
                <Text style={styles.btnTextCamera}>Новое фото</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginTop: 32 }}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#bdbdbd"
              value={title}
              onChangeText={setTitle}
            />
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={{ ...styles.input, paddingLeft: 28 }}
                placeholder="Location"
                placeholderTextColor="#bdbdbd"
                value={location}
                onChangeText={setLocation}
              />
              <Image
                style={{ position: 'absolute', left: 0, top: 13 }}
                source={require('../../../img/map-pin.png')}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.btnSend,
              marginTop: 32,
              backgroundColor:
                photo && title && location ? '#FF6C00' : '#F6F6F6',
            }}
            onPress={createPost}
          >
            <Text
              style={{
                ...styles.btnText,
                color: photo && title && location ? '#FFFFFF' : '#BDBDBD',
              }}
            >
              Опубликовать
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.footer}>
          <Image source={require('../../../img/trash-2.png')} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  erRequest: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    paddingVertical: 11,
    paddingTop: 60,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
  },
  screenTitle: {
    fontFamily: 'Roboto-Italic',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
  },
  main: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  camera: {
    width: 340,
    height: 240,

    justifyContent: 'center',
    alignItems: 'center',
    background: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    overflow: 'hidden',
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    background: 'transparent',
    borderRadius: 30,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
  },
  btnTextCamera: {
    width: 156,
    height: 19,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderBottomColor: '#e8e8e8',
    justifyContent: 'center',

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,

    color: '#000000',
  },
  btnSend: {
    borderRadius: 100,
    height: 51,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 11,
  },
});
export default CreatePostScreen;
