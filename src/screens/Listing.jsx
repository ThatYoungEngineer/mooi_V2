import { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';

import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

import useApi from '../api/useApi';
import listingApi from '../api/listing'; 
import categoryApi from '../api/category'; 
import { useAuth } from '../context/auth';

const Listings = () => {
  const { updateCategories, categories } = useAuth()
  const navigation = useNavigation()
  const {data: listing, loading, error, request:fetchListing} = useApi(listingApi.getListing)  

  const GET_CATEGORIES_DATA = async () => {
    const result = await categoryApi.getCategories();
    if (result.ok) {
      updateCategories(result.data);
    } else Alert.alert("Error", "Error fetching categories!")
  };

  useEffect(() => {
    fetchListing();
    if (!categories) GET_CATEGORIES_DATA()
    SystemNavigationBar.setNavigationColor('transparent');
  }, []); 
    
  const getCategoryNameFromId = (categoryId) => {
    const category = categories?.find(c => c.id === categoryId)
    return category?.name || 'N/A'
  }

  return (
    <Screen>
      <FlatList
        data={listing}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={<Header title="Products" icon="store" />}
        renderItem={({item}) => (
          <TouchableOpacity style={{padding: 15}} onPress={()=>navigation.navigate("ListingDetails", {item, listing} )}>
            <View style={styles.listingsContainer}>
              <FastImage style={styles.image} source={{uri: item?.images[0].url}}  />
              <View style={styles.textContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex:1, fontSize: 18, fontWeight: 500, color: '#000', alignSelf: 'center', paddingRight: 15}} numberOfLines={2} >
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 500, color: '#ff4135', alignSelf: 'center', backgroundColor: '#ff746a28', padding: 10, borderRadius: 50}} >
                    {getCategoryNameFromId(item.categoryId)}
                  </Text>
                </View>
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
