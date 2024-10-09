import { FC } from 'react'

import Layout from '@/components/layout/Layout'


import Banner from './Banner/Banner'
import Saloons from './Saloons/Saloons'
import Header from './HomeHeader/HomeHeader'
import { Box } from 'components/ui/box'


const Home: FC = () => {
	return (
		<Layout withoutPadding>
			<Box className='px-4'>
				<Header />
				<Banner />
			</Box>
			<Saloons />

		</Layout>

	)
}

export default Home