import { Text, SafeAreaView, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setDestination } from '@slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

const NavigateCard = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <SafeAreaView className='bg-white flex-1'>
      <Text className='text-center py-5 text-xl'>Good Morning, Joaquin</Text>
      <View className='border-t border-gray-200 flex-shrink'>
        <View>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                backgroundColor: 'white',
                paddingTop: 20,
                flex: 0
              },
              textInput: {
                backgroundColor: '#DDDDDF',
                borderRadius: 0,
                fontSize: 18
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0
              }
            }}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description
              }))
              navigation.navigate('RideOptionsCard')
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en"
            }}
            enablePoweredByContainer={false}
            minLength={2}
            placeholder='Where to'
            debounce={1000}
            nearbyPlacesAPI='GooglePlacesSearch'
          />

        </View>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard
