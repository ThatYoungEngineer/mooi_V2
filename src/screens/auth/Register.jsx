import { useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, Image} from 'react-native';

import Logo from '../../assets/logo.png'
import Screen from '../../components/Screen';
import AppTextInput from '../../components/AppTextInput';
import ErrorText from '../../components/ErrorText';
import loginApi from '../../api/auth'

import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';


const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(
      /^[A-Za-z][A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid Email Format',
    ),
  password: yup.string().trim().required('Password is required').min('5'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const navigation = useNavigation()

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  })

  const HANDLE_REGISTER_SUBMIT = async (values) => {
    const result = await loginApi.register(values.name, values.email, values.password)
    return result
  }

  return (
    <Screen marginBottom={0} >
      <ScrollView>
        <View style={{paddingVertical: 35}}>
          <Image source={Logo} style={styles.logo}/>
        </View>
        <Formik
          initialValues={{name: '', email: '', password: '', confirmPassword: '', rememberMe: false}}
          onSubmit={ async (values, {setSubmitting, resetForm}) => {
            HANDLE_REGISTER_SUBMIT(values).then((result) => {
              if (result.ok) {
                Alert.alert("Success", "User registered successfully!")
                setSubmitting(false)
                resetForm()
              } else Alert.alert("Error", result.data.error)
            })
          }}
          validationSchema={VALIDATION_SCHEMA}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
            isSubmitting,
            dirty,
            values,
          }) => (
            <>
              <View style={{padding: 10, flex: 1, justifyContent: 'flex-start'}}>
                <View style={{marginBottom: 10}}>
                  <AppTextInput
                    icon="account"
                    autoCapitalize="words"
                    placeholder="Enter name"
                    textContentType="name"
                    keyboardType="default"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <ErrorText message={errors.name} />
                  )}
                </View>
                <View style={{marginBottom: 10}}>
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
                <View style={{marginBottom: 10}}>
                  <AppTextInput
                    icon="key-alert"
                    placeholder="Enter confirm password"
                    password={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={handleBlur('confirmPassword')}
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <ErrorText message={errors.confirmPassword} />
                  )}
                </View>
                
                <TouchableOpacity
                  disabled={
                    isSubmitting == true || isValid == false || dirty == false
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
                    Register
                  </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text style={{alignSelf: 'flex-start', fontSize: 16 }} >Have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "Login" })} >
                    <Text style={{ color: 'teal',  fontSize: 16 }}>Login</Text>
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
  headerText: {
    fontSize: 32,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 20,
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
export default Register;
