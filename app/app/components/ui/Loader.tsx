import { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Spinner } from 'components/ui/spinner'
import { Box } from 'components/ui/box'

import { Text } from 'components/ui/text'

const Loader: FC = () => {
	return (
		<Box className='w-full p-6 items-center justify-center'>
			<Spinner className={'text-tertiary-400'}/>
			<Text size='md'>Aguarde</Text>
		</Box>
	)
}

export default Loader