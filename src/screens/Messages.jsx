import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

import Header from '../components/Header';
import Screen from '../components/Screen';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { SafeAreaView } from 'react-native-safe-area-context';


const Messages = () => {
  const [messages, setMessages] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const headerHeight = useHeaderHeight();

  const handleDeleteMessage = item => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== item.id));
  };

  const fetchMessages = async () => {
    const res = await fetch("http://192.168.11.204:3000/messages")
    const data = await res.json()
    setMessages(data)
  }

  useEffect(() => {
    fetchMessages()
    SystemNavigationBar.setNavigationColor('white');
  }, [])

  return (
    <Screen>
      {messages?.length > 0 ? (
        <View >
          <FlatList
            data={messages}
            keyExtractor={item => String(item.id)}
            ListHeaderComponent={ 
              <View style={{paddingTop: headerHeight/2 }}>
                <Header title="Messages" icon="message-text" /> 
              </View>
            }
            ListFooterComponent={
              <View style={{paddingBottom: 20}} />
            }
            renderItem={({item}) => (
              <GestureHandlerRootView style={{flex: 1}}>
                <Swipeable
                  renderRightActions={() => (
                    <View style={styles.rightActionsContainer}>
                      <TouchableWithoutFeedback
                        onPress={() => handleDeleteMessage(item)}>
                        <Icon name="trash" size={32} color="#ff0000" />
                      </TouchableWithoutFeedback>
                    </View>
                  )}>
                  <TouchableNativeFeedback
                    style={{flex: 1, backgroundColor: 'blue'}}>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                      }}>
                      <Image
                        source={{uri: item.userImage}}
                        style={styles.userImage}
                      />
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{fontWeight: 'bold', fontSize: 18}}>
                          {item.title}
                        </Text>
                        <Text numberOfLines={1} style={{fontSize: 16}}>
                          {item.message}
                        </Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                </Swipeable>
              </GestureHandlerRootView>
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 10}} />}
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              setMessages([
                {
                  id: 1,
                  title: 'Khizer Awais',
                  message: 'Messages has been refreshed!',
                  userImage:
                    'https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg',
                },
              ]);
              setIsRefreshing(false);
            }}
          />
        </View>
      ) : (
        <View>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            No messages found!
          </Text>
        </View>
      )}
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
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rightActionsContainer: {
    backgroundColor: '#f8110021',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // marginRight: 10,
  },
});

export default Messages;
