import { FC } from 'react'

import Layout from '@/components/layout/Layout'


import Banner from './Banner/Banner'
import Saloons from './Saloons/Saloons'
import Header from './HomeHeader/HomeHeader'


const Home: FC = () => {
	return (
		<Layout>
			<Header />
			<Banner />
			<Saloons />
			
		</Layout>
	)
}

export default Home