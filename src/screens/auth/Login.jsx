import {View, Text, StyleSheet, TouchableOpacity, Switch, Alert, Image, ScrollView} from 'react-native';

import Logo from '../../assets/logo.png'

import Screen from '../../components/Screen';
import AppTextInput from '../../components/AppTextInput';
import ErrorText from '../../components/ErrorText';

import {Formik} from 'formik';
import * as yup from 'yup';
import { jwtDecode } from "jwt-decode";
import * as Keychain from 'react-native-keychain'
import { useNavigation } from '@react-navigation/native'

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
  password: yup.string().trim().required('Password is required').min('5'),
});


const Login = () => {
  const { updateUser } = useAuth()
  const navigation = useNavigation()

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
      <ScrollView>
        <View style={{paddingVertical: 35}}>
          <Image source={Logo} style={styles.logo}/>
        </View>
          <Formik 
            initialValues={{email: '', password: '', rememberMe: false}}
            onSubmit={ async (values, {setSubmitting}) => {
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
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <View style={{marginBottom: 10 }}>
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
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={{alignSelf: 'flex-start', fontSize: 16 }} >Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "Register" })} >
                      <Text style={{ color: 'teal',  fontSize: 16 }}>Register</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
        </Formik>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 20,
  },
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
