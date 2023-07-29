import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { NavData } from './NavOptionsConst'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '@slices/navSlice'

const NavOptions = () => {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)

  return (
    <FlatList
      data={NavData}
      contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: "stretch" }}
      style={{ width: '100%' }}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <>
          <TouchableOpacity
            activeOpacity={0.9}
            className={`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded border relative border-gray-300 ${ (!origin || !item.available) && 'border-gray-600 opacity-50' }`}
            onPress={() => navigation.navigate(item.screen)}
            disabled={!origin || !item.available}
          >
            <View>
              <Image
                source={{ uri: item.image }}
                className='w-[120px] h-[120px]'
                resizeMode='contain'
              />
              <Text className='mt-2 text-xl font-bold'>{item.title}</Text>
              <Icon
                className='p-2 bg-black rounded-full w-10 mt-4'
                name='arrowright'
                color='white'
                type='antdesign'
              />
            </View>
          </TouchableOpacity>
          {!item.available && (
            <View className='absolute bottom-2 right-2 rounded-bl rounded-br bg-black py-1 px-2 w-40'>
              <Text className='text-sm font-bold text-center text-white'>Available soon</Text>
            </View>
          )}
        </>
      )
      }
    />
  )
}

export default NavOptions
