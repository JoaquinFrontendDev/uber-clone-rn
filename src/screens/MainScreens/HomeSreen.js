import { Image, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '@components/Nav/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setOrigin, setDestination } from '@slices/navSlice'

const HomeSreen = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView className='bg-white h-full'>
      <View className='bg-white p-5'>
        <Image className='w-[100px] h-[100px]' resizeMode='contain' source={{ uri: "https://links.papareact.com/gzs" }} />

        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18
            },
          }}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en"
          }}
          enablePoweredByContainer={false}
          minLength={2}
          placeholder='Where from'
          debounce={1000}
          nearbyPlacesAPI='GooglePlacesSearch'
        />

        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

export default HomeSreen
