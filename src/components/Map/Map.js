import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin } from '@slices/navSlice'
import MapView, { Marker } from 'react-native-maps'
import { selectDestination } from '@slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setTravelTimeInformation } from '@slices/navSlice'

const Map = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination || !mapReady) return
    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
      })
    }, 10)
  }, [origin, destination, mapReady])

  useEffect(() => {
    if (!origin || !destination) return

    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${ origin.description }&destinations=${ destination.description }&key=${ GOOGLE_MAPS_APIKEY }`)
        .then(res => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
    }

    getTravelTime()
  }, [origin, destination, GOOGLE_MAPS_APIKEY])

  return (
    <MapView
      ref={mapRef}
      className='flex-1'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapReady={() => setMapReady(true)}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default Map
