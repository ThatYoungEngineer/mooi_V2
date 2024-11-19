import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppTextInput = ({
  icon,
  password,
  placeholder,
  maxLength,
  multiline,
  ...others
}) => {
  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} size={20} />}
      {multiline ? (
        <TextInput
          clearButtonMode="always"
          secureTextEntry={password}
          placeholder={placeholder}
          placeholderTextColor="#0000005f"
          style={[styles.input, {maxHeight: 150}]}
          multiline={true}
          maxLength={maxLength}
          {...others}
          textAlignVertical="top"
        />
      ) : (
        <TextInput
          clearButtonMode="always"
          secureTextEntry={password}
          placeholder={placeholder}
          placeholderTextColor="#0000005f"
          style={[{height: 60}, styles.input]}
          multiline={false}
          maxLength={maxLength}
          {...others}
          textAlignVertical="center"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 8,
    backgroundColor: '#ff433529',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontSize: 17,
    color: '#000',
    fontWeight: '600',
    fontWeight: 'semibold',
  },
});

export default AppTextInput;
