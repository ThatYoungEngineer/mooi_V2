import {SafeAreaView, View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({title, icon}) {
  return (
    <View>
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 32,
            paddingHorizontal: 10,
            paddingVertical: 15,
            fontWeight: 'bold',
            textAlign: 'left',
            alignSelf: 'flex-start',
          }}>
          {title}
        </Text>
        <Icon name={icon} size={35} color="#6a6a6a" />
      </View>
    </View>
  );
}
