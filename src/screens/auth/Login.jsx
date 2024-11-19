import {View, Text, StyleSheet, TouchableOpacity, Switch, Alert} from 'react-native';

import Header from '../../components/Header';
import Screen from '../../components/Screen';
import AppTextInput from '../../components/AppTextInput';
import ErrorText from '../../components/ErrorText';

import {Formik} from 'formik';
import * as yup from 'yup';
import { jwtDecode } from "jwt-decode";
import * as Keychain from 'react-native-keychain'

import loginApi from '../../api/auth'
import { useAuth } from '../../context/auth';

const VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(
      /^[A-Za-z][A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid Email Format',
    ),
  password: yup.string().trim().required('Password is required'),
});


const Login = () => {
  const { updateUser } = useAuth()

  const HANDLE_LOGIN_SUBMIT = async (values) => {
    const result = await loginApi.login(values.email, values.password)
    if (result.ok) {
      await Keychain.setGenericPassword("token", result.data)
      const userData = jwtDecode(result.data);
      Alert.alert("Welcome", userData.name)
      updateUser(userData)
    } else {
      Alert.alert("Error", result.data.error)
      throw new Error(result.data.error)
    }
  }

  return (
      <Screen marginBottom={0} >
        {/* <View style={{marginTop: 40, alignItems: 'center'}}>
          <Header title="Login" icon="login" />
        </View> */}
          <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            onSubmit={ async (values, {setSubmitting, resetForm}) => {
              try{
                await HANDLE_LOGIN_SUBMIT(values)
                setSubmitting(false)
              } catch(e){
                console.log(e)
                setSubmitting(false)
              }
            }}
            validationSchema={VALIDATION_SCHEMA}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              errors,
              touched,
              isValid,
              isSubmitting,
              dirty,
              values,
            }) => (
              <>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'green', paddingHorizontal: 10}}>
                  <View style={{marginBottom: 10, backgroundColor: 'yellow' }}>
                    <AppTextInput
                      icon="email"
                      placeholder="Enter email"
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      autoCapitalize="none"
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <ErrorText message={errors.email} />
                    )}
                  </View>
                  <View style={{marginBottom: 10}}>
                    <AppTextInput
                      icon="key"
                      placeholder="Enter password"
                      password={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <ErrorText message={errors.password} />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Switch
                      value={values.rememberMe}
                      onValueChange={value => setFieldValue('rememberMe', value)}
                    />
                    <Text style={{marginLeft: 10}}>Remember Me?</Text>
                  </View>
                  <TouchableOpacity
                    disabled={
                      isSubmitting == true || !isValid || !dirty
                    }
                    style={[
                      styles.loginBtn,
                      (isSubmitting || !isValid || !dirty) &&
                        styles.loginBtnDisabled,
                    ]}
                    onPress={handleSubmit}>
                    <Text
                      style={{
                        color: '#04053a',
                        fontWeight: '300',
                        fontSize: 17,
                        fontFamily: 'Roboto',
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
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
  loginBtn: {
    backgroundColor: '#a9f7b5',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnDisabled: {
    opacity: 0.4,
  },
});
export default Login;
