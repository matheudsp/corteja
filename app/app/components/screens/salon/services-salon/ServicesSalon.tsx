import { FC } from 'react'


import { Image } from 'react-native';
import { HStack } from 'components/ui/hstack';

import { Text } from 'components/ui/text'

import { Box } from 'components/ui/box'


import { ISalonComponent } from '../salon-page.interface'

import { Feather } from '@expo/vector-icons'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { VStack } from 'components/ui/vstack';
import { Button } from 'components/ui/button';

import { useDispatch } from 'react-redux';
import { resetSalonState, setSalonAvatar, setSalonId, setSalonName, setSalonServiceDuration, setSalonServiceId, setSalonServiceName, setSalonServicePrice } from '@/store/salon/salon.slice';
import { ISalon, ISalonService } from '@/types/salon.interface';


const ServicesSalon: FC<ISalonComponent> = ({ salon }) => {
	const { navigate } = useTypedNavigation()
	const dispatch = useDispatch();

	const handleService = (service: ISalonService, salon: ISalon) => {
		dispatch(resetSalonState()), 
		dispatch(setSalonId(salon.id))
		dispatch(setSalonServiceId(service.id))
		dispatch(setSalonName(salon.name))
		dispatch(setSalonServiceName(service.name))
		dispatch(setSalonServicePrice(service.price))
		dispatch(setSalonServiceDuration(service.duration))
		dispatch(setSalonAvatar(salon.image))
		navigate('Appointment')
	}

	return (

		<Box className='my-4'>
			<Text className=' text-xl font-medium'>Serviços</Text>
			{salon.employee?.length ? (
				<VStack space='md' className='mt-4'>
					{salon.salonServices.map((service, index) => {
						return (
							<HStack key={index} className='justify-between' >

								<Box className='w-24'>
									<Image
										width={96}
										height={96}
										alt='service image'
										source={{ uri: service?.image }}
										className=' rounded-xl my-auto'
									/>
								</Box>

								<HStack className='items-center  w-72 justify-between '>
									<VStack space='xs' className=' w-full'>
										<Text className='text-lg'>{service.name}</Text>
										<HStack className='  items-center justify-evenly'>
											<HStack className=' items-center'>
												<Feather name='clock' color={'#7a7a7a'} size={16} />
												<Text className=' font-light text-base text-gray-400 ml-1'>{service.duration} min</Text>
											</HStack>
											<Box className='ml-3'>
												<Text className=' text-green-500 text-base'>  R$ {service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
											</Box>

										</HStack>
										<Box className=''>
											<Button
												onPress={() => {
													handleService(service, salon)
												}}
												className='bg-tertiary-400 rounded-xl'>
												<Text className='text-typography-white uppercase font-mono text-xs'>Agendar</Text>
											</Button>
										</Box>
									</VStack>

								</HStack>
							</HStack>
						)
					})}
				</VStack>
			) : (
				<Text className='mt-2'>Não há serviços cadastrados</Text>
			)}
		</Box>


	)
}

export default ServicesSalon