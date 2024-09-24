import { FC } from 'react'
import { Text, View, Image } from 'react-native'



import { ISalonComponent } from '../salon-page.interface'
import SalonButton from '../SalonButton'
import { Feather } from '@expo/vector-icons'

const ServicesSalon: FC<ISalonComponent> = ({ salon }) => {
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
										<View className='flex-row text-sm items-center'>
											<View className='flex-row items-center'>
												<Feather name='clock' color={'#7a7a7a'} />
												<Text className=' font-light text-gray-400 ml-1'>{service.duration} min</Text>
											</View>
											<View className='ml-3'>
												<Text className=' text-green-500'>R$ {service.price.toFixed(2)}</Text>
											</View>

										</View>
										<View className=''>
											<SalonButton className='bg-[#363062] rounded-xl'>
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