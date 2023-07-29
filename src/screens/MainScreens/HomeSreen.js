import { Image, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '@components/Nav/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setOrigin } from '@slices/navSlice'
import NavFavourites from '@components/Nav/NavFavourites'
import { Icon } from 'react-native-elements'

const HomeSreen = () => {
  const dispatch = useDispatch()
  const googleInputRef = useRef(null)

  return (
    <SafeAreaView className='bg-white h-full'>
      <View className='bg-white p-5'>
        <Image className='w-[100px] h-[100px]' resizeMode='contain' source={{ uri: "https://links.papareact.com/gzs" }} />

        <GooglePlacesAutocomplete
          ref={googleInputRef}
          styles={{
            container: {
              backgroundColor: 'white',
              flex: 0,
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
          textInputProps={{
            placeholderTextColor: 'black',
          }}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeSreen
