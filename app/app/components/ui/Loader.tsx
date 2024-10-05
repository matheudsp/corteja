import { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader: FC = () => {
	return (
		<View className='w-full p-6 items-center justify-center'>
			<ActivityIndicator size='large' color='#475baa' />
		</View>
	)
}

export default Loader