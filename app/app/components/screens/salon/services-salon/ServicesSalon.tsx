import { FC } from 'react'
import { Text, View, Image } from 'react-native'



import { ISalonComponent } from '../salon-page.interface'
import SalonButton from '../SalonButton'
import { Feather } from '@expo/vector-icons'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const ServicesSalon: FC<ISalonComponent> = ({ salon }) => {
	const { navigate } = useTypedNavigation()
	return (

		<View className='my-4'>
			<Text className=' text-xl font-medium'>Serviços</Text>
			{salon.employee?.length ? (
				<View className='flex-col space-y-4 mt-4'>
					{salon.salonServices.map((service, index) => {
						return (
							<View key={index} className='flex-row '>

								<View className='w-24'>
									<Image
										source={{ uri: service?.image }}
										width={96}
										height={96}
										className=' rounded-xl my-auto'
									/>
								</View>

								<View className='items-center ml-2 w-64 justify-between flex-row'>
									<View className='space-y-1 w-full'>
										<Text className='text-lg'>{service.name}</Text>
										<View className='flex-row  items-center justify-evenly'>
											<View className='flex-row items-center'>
												<Feather name='clock' color={'#7a7a7a'} size={16} />
												<Text className=' font-light text-base text-gray-400 ml-1'>{service.duration} min</Text>
											</View>
											<View className='ml-3'>
												<Text className=' text-green-500 text-base'>  R$ {service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
											</View>

										</View>
										<View className=''>
											<SalonButton
												onPress={() => navigate('Appointment', {
													salonServiceId: service.id,
													salonAvatar: salon.image,
													salonName: salon.name,
													salonServiceName: service.name,
													salonId: salon.id,
													salonServicePrice: service.price,
													salonServiceDuration: service.duration,

												})}
												className='bg-[#363062] rounded-xl'>
												<Text className='text-white'>Agendar</Text>
											</SalonButton>
										</View>
									</View>

								</View>
							</View>
						)
					})}
				</View>
			) : (
				<Text className='mt-2'>Não há serviços cadastrados</Text>
			)}
		</View>


	)
}

export default ServicesSalon