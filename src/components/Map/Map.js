import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectOrigin } from '@slices/navSlice'
import MapView, { Marker } from 'react-native-maps'

const Map = () => {
  const origin = useSelector(selectOrigin)

  return (
    <MapView
      className='flex-1'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title='Origin'
        description={origin.description}
        identifier='origin'
      />
    </MapView>
  )
}

export default Map
