import { FC } from 'react'

import { Image } from 'components/ui/image';
import { HStack } from 'components/ui/hstack';

import { Text } from 'components/ui/text'

import { Box } from 'components/ui/box'


import { ISalonComponent } from '../salon-page.interface'
import SalonButton from '../SalonButton'
import { Feather } from '@expo/vector-icons'
import { formatCouponDate } from '@/utils/formatDate';
import { VStack } from 'components/ui/vstack';

const Coupon: FC<ISalonComponent> = ({ salon }) => {
	return (

		<Box className='my-4'>

			{salon.coupons?.length ? (
				<VStack space='md'>
					{salon.coupons.map((coupon, index) => {
						return (
							<HStack space='xs' key={index} className='items-center py-2 justify-between w-full '>



								<VStack className='items-start  w-4/6'>
									<Text className='text-lg'>Cupom de R$ {coupon.price.toFixed(2)}</Text>
									<Box className=' bg-gray-200 py-1 px-2 rounded-full'>
										<Text className='text-lg text-gray-600'>{coupon.code}</Text>
									</Box>

								</VStack>

								<VStack className='w-2/6 space-y-2'>
									<SalonButton className='bg-[#363062] rounded-xl'>
										<Text className='text-white'>Resgatar</Text>
									</SalonButton>
									<Text>{formatCouponDate(coupon.dateEnd)}</Text>
								</VStack>



							</HStack>
						)
					})}
				</VStack>
			) : (
				<Text className='mt-2'>Não há cupons disponíveis.</Text>
			)}
		</Box>


	)
}

export default Coupon