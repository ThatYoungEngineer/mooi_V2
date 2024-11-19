import {Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import { useAuth } from '../context/auth';

export default function ListingDetails({route}) {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation()
  const { user } = useAuth()

  return (
    <View style={{paddingTop: headerHeight, flex: 1, backgroundColor: '#fff'}}>
      <FastImage source={{uri: route.params.item.images[0].url}} style={{width: "100%", height: 250, resizeMode: 'cover', backgroundColor: '#ff4335c'}} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{route.params.item.title}</Text>
        <Text style={styles.price}>${route.params.item.price}</Text>

        <TouchableWithoutFeedback onPress={() => navigation.navigate("Profile")}>
        <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', borderRadius: 20, paddingLeft: 15}}>
          <List.Item
            title={user.name}
            description= {user?.listings?.length || "5 Listings" } 
            left={props => (
              <FastImage
                source={{ uri: user?.image || 'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg' }}  // Correct URI for the image
                style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#f4f4f4' }}
              />
            )}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </View>
        </TouchableWithoutFeedback>       
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24
  },
  price: {
    fontSize: 18,
    marginTop: 10,
    color: '#4B8F8C'
  }
})