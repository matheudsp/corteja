

import { FC, useState } from 'react'


import { horizontalItems } from './horizontal.data'

import { IHorizontalItem } from './horizontal.interface';
import { HStack } from 'components/ui/hstack';
import { ScrollView } from 'components/ui/scroll-view';
import { Text } from 'components/ui/text'
import { Pressable } from 'components/ui/pressable'
import { Icon } from 'components/ui/icon';

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
			className='bg-tertiary-200 w-full max-h-20 h-20'>
			<HStack space='md' className='p-4'>
				{horizontalItems.map((item, index) => (
					<Pressable
						key={index}
						onPress={() => setActiveIndex(index)}
						className={` rounded-3xl flex-row items-center px-3 py-1  bg-tertiary-600 ${activeIndex === index && 'border border-tertiary-500 bg-tertiary-400'
							}`}
					>
						<Icon
							as={item.icon}
							size='xl'
							className={`
								${activeIndex === index 
									? "text-typography-900" 
									: "text-typography-200" 
								}
							  `}
						/>
						<Text className={`text-lg ml-1 ${activeIndex === index ? 'text-typography-900 font-medium' : 'text-typography-200'}`}>
							{item.title}
						</Text>
					</Pressable>
				))}
			</HStack>
		</ScrollView>

	)
}

export default HorizontalList