import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC, useContext, useRef } from 'react'

import Auth from '@/components/screens/auth/Login'

import { useAuth } from '@/hooks/useAuth'

import { TypeRootStackParamList } from './navigation.types'
import { routes } from './routes'
import { ThemeContext } from '@/providers/ThemeContext'


const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator: FC = () => {
	const { colorMode } = useContext(ThemeContext);
	const { user } = useAuth()

	

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: colorMode === "light" ? "#E5E5E5" : "#262626",
					
				}
			}}
		>
			{user ? (
				routes.map((route, index) => (
					<Stack.Screen
						key={index}
						{...route}

					/>
				))
			) : (
				<Stack.Screen name='Auth' component={Auth} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator