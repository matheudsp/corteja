import { FC } from 'react'
import { Text, View, Image } from 'react-native'



import { ISalonComponent } from '../salon-page.interface'
import SalonButton from '../SalonButton'
import { Feather } from '@expo/vector-icons'
import { formatCouponDate } from '@/utils/formatDate';

const Coupon: FC<ISalonComponent> = ({ salon }) => {
	return (

		<View className='my-4'>
			
			{salon.coupons?.length ? (
				<View className='flex-col space-y-4 '>
					{salon.coupons.map((coupon, index) => {
						return (
							<View key={index} className='flex-row items-center py-2 space-y-1 justify-between w-full '>



								<View className='items-start  w-4/6'>
									<Text className='text-lg'>Cupom de R$ {coupon.price.toFixed(2)}</Text>
									<View className=' bg-gray-200 py-1 px-2 rounded-full'>
										<Text className='text-lg text-gray-600'>{coupon.code}</Text>
									</View>

								</View>

								<View className='w-2/6 space-y-2'>
									<SalonButton className='bg-[#363062] rounded-xl'>
										<Text className='text-white'>Resgatar</Text>
									</SalonButton>
									<Text>{formatCouponDate(coupon.dateEnd)}</Text>
								</View>



							</View>
						)
					})}
				</View>
			) : (
				<Text className='mt-2'>Não há cupons disponíveis.</Text>
			)}
		</View>


	)
}

export default Coupon