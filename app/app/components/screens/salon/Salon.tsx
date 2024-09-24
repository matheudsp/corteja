import { FC, useState } from 'react'
import { Image, View, Text } from 'react-native'

import Layout from '@/components/layout/Layout'
import { useSalon } from './useSalon'
import Loader from '@/components/ui/Loader'
import SalonHeader from './SalonHeader'
import { getMediaSource } from '@/utils/getMediaSource'
import SalonInfo from './salon-info/SalonInfo'
import HorizontalList from './horizontalList/HorizontalList'

import { horizontalItems } from './horizontalList/horizontal.data'
import AboutSalon from './about-salon/AboutSalon'
import ServicesSalon from './services-salon/ServicesSalon'
import Coupon from './coupon/Coupon'
import Schedule from './schedule/Schedule'




const Salon: FC = () => {
	const { isLoading, salon } = useSalon()
	const [activeIndex, setActiveIndex] = useState(0);

	if (isLoading) return <Loader />
	if (!salon) return null

	const renderContent = () => {
		switch (activeIndex) {
			case 0:
				return <AboutSalon salon={salon} />; // Conteúdo de 'Sobre'
			case 1:
				return <ServicesSalon salon={salon} />; // Conteúdo de 'Serviços'
			case 2:
				return <Schedule salon={salon}/>; // Conteúdo de 'Agendamentos'
			case 3:
				return <Coupon salon={salon}/>; // Conteúdo de 'Cupons'
			default:
				return null;
		}
	};

	return (

		<Layout withoutPadding>
			<View className='px-4'>
				<SalonHeader salon={salon} />
				<View className='items-center justify-center mt-4'>
					<Image
						className='rounded-3xl'
						source={{ uri: salon.image }}
						// source={getMediaSource(salon.image)}
						width={360}
						height={120}
					/>
				</View>

				<SalonInfo salon={salon} />

			</View>

			<HorizontalList
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
				horizontalItems={horizontalItems}
			/>

			<View className="px-4">
				{renderContent()}
			</View>
			

		</Layout>


	)
}

export default Salon