import { FC, useContext, useState } from 'react'
import { Animated, ScrollView, Image, View } from 'react-native'
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
import { Box } from 'components/ui/box'
import { ThemeContext } from '@/providers/ThemeContext'

const Salon: FC = () => {
	const { isLoading, salon } = useSalon()
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const { colorMode } = useContext(ThemeContext)
	const scrollY = useState(new Animated.Value(0))[0];

	if (isLoading || !salon) {
		return <Loader />
	}

	const componentsMap: { [key: number]: JSX.Element } = {
		0: <AboutSalon isLoading={isLoading} salon={salon} />,
		1: <ServicesSalon isLoading={isLoading} salon={salon} />,
		2: <Schedule isLoading={isLoading} salon={salon} />,
		3: <Coupon isLoading={isLoading} salon={salon} />
	}

	const headerBackgroundColor = scrollY.interpolate({
		inputRange: [0, 100],
		outputRange: ['transparent', colorMode === 'light' ? '#E5E5E5' : '#262626'],
		extrapolate: 'clamp',
	});

	const imageTranslateY = scrollY.interpolate({
		inputRange: [0, 200],
		outputRange: [0, -100],
		extrapolate: 'clamp',
	});

	return (
		<Box className='flex-1 mt-10'>

			<SalonHeader salon={salon} backgroundColor={headerBackgroundColor} />
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
			>


				<Animated.Image
					source={{ uri: salon.image }}
					style={{
						zIndex: -1,
						height: 200,
						width: '100%',
						transform: [{ translateY: imageTranslateY }],
					}}
				/>


				<SalonInfo salon={salon} />


				<HorizontalList
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					horizontalItems={horizontalItems}
				/>

				<Box className="px-4">
					{componentsMap[activeIndex]}
				</Box>
				
			</Animated.ScrollView>
		</Box>
	)
}

export default Salon
