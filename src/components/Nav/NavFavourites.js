import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { setOrigin } from '@slices/navSlice'

const data = [
  {
    id: 1,
    icon: 'home',
    location: 'Home',
    destination: 'Code Street, London, UK'
  },
  {
    id: 2,
    icon: 'briefcase',
    location: 'Work',
    destination: 'London Eye, London, UK'
  }
]


const NavFavourites = () => {
  const dispatch = useDispatch()

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View className='bg-gray-200 h-[0.5px]' />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          className='flex-row items-center p-5'
          activeOpacity={0.9}
          onPress={() => dispatch(setOrigin(item.destination))}
        >
          <Icon
            className='mr-4 rounded-full bg-gray-300 p-3'
            name={item.icon}
            type='ionicon'
            color='white'
            size={18}
          />
          <View>
            <Text className='font-bold text-xl'>{item.location}</Text>
            <Text className='text-gray-500'>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavourites
