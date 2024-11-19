import {Text, StyleSheet} from 'react-native';

const ErrorText = ({message}) => {
  return <Text style={styles.errorMessage}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 12,
    color: 'red',
    marginVertical: 5,
    fontWeight: '400',
  },
});

export default ErrorText;
