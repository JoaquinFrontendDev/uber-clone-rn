import { Provider } from 'react-redux';
import { store } from './src/store/store';
import HomeSreen from '@screens/MainScreens/HomeSreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '@screens/MainScreens/MapScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function App () {

  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className='flex-1'
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Home' component={HomeSreen} />
              <Stack.Screen name='Map' component={MapScreen} />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
