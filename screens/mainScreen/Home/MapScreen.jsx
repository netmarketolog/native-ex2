import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    };
    setLocation(route.params);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Map</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DefaultScreen')}>
          <Image
            style={{ position: 'absolute', left: 16, bottom: 0 }}
            source={require('../../../img/arrow-left.png')}
          />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 120,
  },
});

export default MapScreen;
