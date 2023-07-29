import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setDestination } from '@slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Icon } from 'react-native-elements'
import NavFavourites from './NavFavourites'

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
                fontSize: 18,
                fontWeight: 'bold'
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
            textInputProps={{
              placeholderTextColor: 'black',
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View className='flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100'>
        <TouchableOpacity
        className='flex-row justify-between bg-black w-24 px-4 py-3 rounded-full'
        onPress={() => navigation.navigate('RideOptionsCard')}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text className='text-white text-center text-base font-bold'>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row justify-between bg-white w-24 px-4 py-3 rounded-full border-[0.5px] border-gray-300'>
          <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
          <Text className='text-center text-base font-bold'>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard
