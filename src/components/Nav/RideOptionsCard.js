import { View, Text, SafeAreaView, TouchableOpacity, FlatList, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '@slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  },
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView className='bg-white flex-grow'>
      <View>
        <TouchableOpacity
          className='absolute top-3 left-5 p-3 rounded-full z-50'
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text className='text-center py-5 text-xl font-bold'>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            className={`flex-row items-center justify-between px-10 ${ id === selected?.id && 'bg-gray-200' }`}
            onPress={() => setSelected(item)}
          >
            <Image
              className='w-[100px] h-[100px]'
              resizeMode='contain'
              source={{ uri: image }}
            />
            <View className='-ml-6'>
              <Text className='text-xl font-bold'>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
            </View>
            <Text className='text-xl'>
              {new Intl.NumberFormat('es-ars', {
                style: 'currency',
                currency: 'ARS'
              }).format(
                travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className='mt-auto border-t border-gray-200'>
        <TouchableOpacity disabled={!selected} className={`bg-black py-3 m-3 ${ !selected && 'bg-gray-300' }`}>
          <Text className='text-center text-white text-xl'>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard
