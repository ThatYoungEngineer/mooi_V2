import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';

import Header from '../components/Header';
import Screen from '../components/Screen';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHeaderHeight } from '@react-navigation/elements';


const Messages = () => {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const headerHeight = useHeaderHeight();

  const handleDeleteMessage = item => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== item.id));
  };

  const fetchMessages = async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch('http://10.10.10.114:3000/messages')
      if(res) {
        const data = await res.json()
        setIsRefreshing(false)
        setMessages(data)
      }  
    } catch (e) {
      setError("No messages found!")
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <Screen>
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
            ListEmptyComponent={() => (
              <View style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                {error && 
                  <>
                    <Text style={{marginTop: 30, paddingHorizontal: 10, textAlign: 'center', fontStyle: 'italic', color: '#fb1100', fontWeight: 500, fontSize: 20 }} >No Messages found!</Text>
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
              </View>
            )}
            renderItem={({item}) => (
              <GestureHandlerRootView style={{flex: 1}}>
                <Swipeable
                  renderRightActions={() => (
                    <View style={styles.rightActionsContainer}>
                      <TouchableWithoutFeedback
                        onPress={() => handleDeleteMessage(item)}>
                        <Icon name="trash-can" size={32} color="#ff0000" />
                      </TouchableWithoutFeedback>
                    </View>
                  )}
                >
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
              fetchMessages()
              setIsRefreshing(false);
            }}
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
    alignSelf: 'flex-start'
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  rightActionsContainer: {
    backgroundColor: '#f8110021',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default Messages;
