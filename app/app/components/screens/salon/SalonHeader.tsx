import { FC } from 'react'
import { View } from 'react-native'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import SalonButton from './SalonButton'
import FavoriteButton from './favorite-button/FavoriteButton'
import { ISalonComponent } from './salon-page.interface'


const SalonHeader: FC<ISalonComponent> = ({ salon }) => {
	const { goBack } = useTypedNavigation()

	return (
		<View>
			<View className='flex-row justify-between mt-2'>
				<SalonButton
					onPress={goBack}
					icon='chevron-left'
					iconSize={26}
					color='#555'
				/>
				<FavoriteButton SalonId={salon.id} />
			</View>
		</View>
	)
}

export default SalonHeader