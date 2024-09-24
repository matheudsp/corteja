import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import { FC, useState } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { horizontalItems } from './horizontal.data'
import { IHorizontalItem } from './horizontal.interface';

interface HorizontalListProps {
	activeIndex: number;
	setActiveIndex: (index: number) => void;
	horizontalItems: IHorizontalItem[];
  }

const HorizontalList: FC<HorizontalListProps> = ({ activeIndex, setActiveIndex, horizontalItems }) => {
	
	return (


		<ScrollView 
		horizontal 
		showsHorizontalScrollIndicator={false} 
		className='bg-[#EDEFFB] w-full '>
			<View className=' p-4 flex-row space-x-5'>
			{horizontalItems.map((item, index) => (
				<Pressable
					key={index}
					onPress={() => setActiveIndex(index)}
					className={`flex-row items-center rounded-lg px-3 py-1 space-x-2  ${activeIndex === index ? 'border border-[#363062] bg-[#D1D1F9]' : 'opacity-90'
						}`}
				>
					<Feather name={item.iconName} size={18} color={activeIndex === index ? '#000' : '#363062'} />
					<Text className={`text-lg  ${activeIndex === index ? 'text-[#000] font-medium' : 'text-[#363062]'}`}>
						{item.title}
					</Text>
				</Pressable>
			))}
			</View>
		</ScrollView>

	)
}

export default HorizontalList