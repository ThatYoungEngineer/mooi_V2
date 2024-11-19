import { useEffect } from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const Screen = ({children, marginBottom=50}) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    SystemNavigationBar.setNavigationColor('translucent');
  }, [])
  

  return ( 
    <View 
      style={[styles.container, {
        paddingTop: insets.top,
        paddingBottom: marginBottom + insets.bottom,
      }]}
    >
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f4f8f8',
    // backgroundColor: '#259696',
  },
});

export default Screen;
