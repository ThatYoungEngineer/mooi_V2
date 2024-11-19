import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';

import { useEffect, useState } from 'react';

import Screen from '../components/Screen';
import Header from '../components/Header';
import AppImagePicker from '../components/AppImagePicker';
import AppTextInput from '../components/AppTextInput';
import ErrorText from '../components/ErrorText';

import {Formik} from 'formik';
import * as yup from 'yup';
import AppPicker from '../components/AppPicker';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import listingApi from '../api/listing';

const VALIDATION_SCHEMA = yup.object().shape({
  images: yup
    .array()
    .required('Image is required')
    .min(1, 'Minimum 1 image is required'),
  title: yup.string().required('Title is required'),
  price: yup
    .number()
    .typeError('Must be a number!')
    .required('Price is required'),
  category: yup
    .string().required('Category is required')
    .nullable(false)
    .notOneOf([null, undefined], 'Category cannot be null or undefined'),
  description: yup.string()
});

const CreateListing = () => {
  const [loading, setLoading] = useState(false)

  const INPUT_FIELDS = [
    {id: 1, name: 'title', placeholder: 'Title'},
    {id: 2, name: 'price', placeholder: 'Price', keyboardType: 'numeric', maxLength: 6},
    {id: 3, name: 'category', placeholder: 'Category'},
    {id: 4, name: 'description', placeholder: 'Description', multiline: true},
  ];

  const CATEGORIES = [
    {label: "Furniture", value: 1, icon: 'table-furniture', bgColor: 'green'},
    {label: "Clothing", value: 2, icon: 'tshirt-v',  bgColor: 'yellow'},
    {label: "Cameras", value: 3, icon: 'camera',  bgColor: 'pink'}
  ]

  useEffect(() => {
		SystemNavigationBar.setNavigationColor('white')
  }, [])

  const handleFormSubmit = async (listing) => {
    const result = await listingApi.postListing(listing)
    console.log("RESULT: ", result)

    if(!result.ok) return Alert.alert("Could not create listing!")
    else Alert.alert("Success!")
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="Create Listing" icon="view-list" />
          <Formik
            initialValues={{
              images: [],
              title: '',
              price: '',
              category: '',
              description: '',
            }}
            onSubmit={data => {
              console.log('listing data....: ', data)
              handleFormSubmit(data)
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
                <View style={{marginBottom: 10}}>
                  <AppImagePicker
                    onChangeText={images => setFieldValue('images', images)}
                  />
                  {errors.images && touched.images && (
                    <ErrorText message={errors.images} />
                  )}
                </View>
                <FlatList
                  data={INPUT_FIELDS}
                  keyExtractor={item => String(item.id)}
                  renderItem={({item}) => (
                    <>
                      {item.name === 'category' ?
                        <>
                          <AppPicker placeholder="Category" items={CATEGORIES}
                            onChangeText={category => setFieldValue('category', category)}
                          />
                          {errors[item.name] && touched[item.name] && (
                            <ErrorText message={errors[item.name]} />
                          )}
                        </>
                      :
                        <>
                          <AppTextInput
                            placeholder={item.placeholder}
                            keyboardType={item.keyboardType}
                            maxLength={item.maxLength}
                            multiline={item.multiline}
                            value={values[item.name]}
                            onBlur={handleBlur(item.name)}
                            onChangeText={handleChange(item.name)}
                          />
                          {errors[item.name] && touched[item.name] && (
                            <ErrorText message={errors[item.name]} />
                          )}
                        </>
                      }
                    </>
                  )}
                  style={styles.inputList}
                  ItemSeparatorComponent={() => <View style={{marginTop: 10}} />}
                  scrollEnabled={false}
                  ListFooterComponent={ () => (
                    <TouchableOpacity
                      style={styles.postBtn}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.postText}> {loading ? "loading.." : "Post" } </Text>
                    </TouchableOpacity>  
                  )}
                />
              </>
            )}
          </Formik>
        </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  postBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B8F8C',
    padding: 15,
    borderRadius: 10,
    marginVertical: 25,
    alignSelf: 'center',
  },
  postText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
    fontFamily: 'System',
  },
  postBtnDisabled: {
    opacity: 0.4,
  },
});

export default CreateListing