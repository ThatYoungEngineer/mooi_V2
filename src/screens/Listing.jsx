import { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';

import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

import useApi from '../api/useApi';
import listingApi from '../api/listing'; 

const Listings = () => {
  const navigation = useNavigation();
  const {data: listing, loading, error, request:fetchListing} = useApi(listingApi.getListing)

  useEffect(() => {
    fetchListing()
		SystemNavigationBar.setNavigationColor('white');
  }, [])

  console.log('Listing image: ', listing[8]?.images )

  return (
    <Screen>
      <FlatList
        data={listing}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={<Header title="Products" icon="store" />}
        renderItem={({item}) => (
          <TouchableOpacity style={{padding: 15}} onPress={()=>navigation.navigate("ListingDetails", {item})}>
            <View style={styles.listingsContainer}>
              <FastImage style={styles.image} source={{uri: item?.images[0].url}}  />
              {/* <FastImage style={styles.image} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s'}} /> */}
              <View style={styles.textContainer}>
                <Text style={{ fontSize: 18, fontWeight: 500, color: '#000'}} >
                  {item.title}
                </Text>
                <Text style={{fontSize: 16, fontWeight: 400, color: '#0fb728', marginTop: 5}}>
                  ${item.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        refreshing={loading}
        onRefresh={fetchListing}
        ItemSeparatorComponent={ () => <View style={{marginTop: 0}} />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  listingsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 15,
  },
});
export default Listings;
