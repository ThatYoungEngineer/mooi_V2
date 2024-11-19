import { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar} from 'react-native';

import Screen from '../../components/Screen';
import Header from '../../components/Header';
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
  password: yup.string().trim().required('Password is required'),
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
    console.log("RESULT: ", result)
    if (result.ok) {
      Alert.alert("Success", "User registered successfully")
    } else {
      console.log("result: ", result)
      Alert.alert("Error", result.data.error)
      throw new Error(result.data.error)
    }
  }


  return (
      <Screen marginBottom={0} >
        <View style={{marginTop: StatusBar.currentHeight + 20, alignItems: 'center'}}>
          <Header title="Register" icon="login" />
        </View>
          <Formik
            initialValues={{name: '', email: '', password: '', confirmPassword: '', rememberMe: false}}
            onSubmit={ async (values, {setSubmitting, resetForm}) => {
              try{
                await HANDLE_REGISTER_SUBMIT(values)
                setSubmitting(false)
                // resetForm()
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
                <View style={{padding: 10, flex: 1, justifyContent: 'center'}}>
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
                      icon="key"
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
export default Register;
