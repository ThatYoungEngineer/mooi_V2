import { useEffect, useCallback, memo } from 'react'
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useApi from '../api/useApi';
import listingApi from '../api/listing'; 
import categoryApi from '../api/category'; 
import { useAuth } from '../context/auth';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNetInfo } from "@react-native-community/netinfo"

const Listings = () => {
  console.log("iop")
  const { updateCategories, categories } = useAuth()
  const {data: listing, loading, error, request:fetchListing} = useApi(listingApi.getListing)  
  const categoriesData = useApi(categoryApi.getCategories)  

  const navigation = useNavigation()
	const netInfo = useNetInfo()
  const headerHeight = useHeaderHeight()

  const fetchPostsData = () => {
    fetchListing(); 
    if (categoriesData.data == null) categoriesData.request()
    if (!categories && categoriesData.data) updateCategories(categoriesData.data)
  }  

  useEffect(() => {
    fetchPostsData()
    SystemNavigationBar.setNavigationColor('transparent')
  }, [])
    
  const getCategoryNameFromId = useCallback((categoryId) => {
    const category = categoriesData.data?.find(c => c.id === categoryId)
    return category?.name || 'N/A'
  }, [categoriesData.data])

  const renderItem = useCallback( ({item}) => (
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
  ), [navigation, listing, getCategoryNameFromId])

  return (
    <Screen>
      <FlatList
        data={listing}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={
          <View style={{ paddingTop: (netInfo.isConnected && netInfo.isInternetReachable) ? 0 : headerHeight/2}} >
            <Header title="Products" icon="store" />
            {(error && listing == null) &&
              <>
                <Text style={{marginTop: 30, paddingHorizontal: 10, textAlign: 'center', fontStyle: 'italic', color: '#fb1100', fontWeight: 500, fontSize: 20 }} >No listings found!</Text>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                  <Text style={{fontStyle: 'italic', color: '#6c6665', fontWeight: 400, fontSize: 14 }} >Scroll down to refresh..</Text>
                  <Icon
                    name="reload"
                    size={20}
                    color="#6c6665"
                    style={{alignSelf: 'center'}}
                  />
                </View>
              </>
            }
            {error && 
              Alert.alert(
                "Server Error",
                error || 'Something went wrong!',
                [
                  {
                    text: "Try Again",
                    onPress: fetchListing,
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              )
            }
          </View>
        }
        renderItem={renderItem}
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

const MemoizedListings = memo(Listings)
export default MemoizedListings

// export default Listings;