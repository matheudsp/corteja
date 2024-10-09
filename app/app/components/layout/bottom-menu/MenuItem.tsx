import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'components/ui/pressable'
import { Icon } from "components/ui/icon";
import { Text } from 'components/ui/text';
import { IMenuItem, TypeNavigate } from './menu.interface'
import { VStack } from 'components/ui/vstack';

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNavigate
	currentRoute?: string
	
}

const MenuItem: FC<IMenuItemProps> = ({ currentRoute, item, nav }) => {
	const isActive = currentRoute === item.path


	return (
		<Pressable
			className={`items-center  w-[25%]`}
			onPress={() => nav(item.path)}
		>
			<VStack className='items-center'>
				<Icon
					as={item.icon}
					size="xl"
					className={`
						${isActive
							? "text-typography-900" 
							: "text-typography-400" 

						}
					  `}

				/>
				<Text
					size="xs"
					className={`
						${isActive
							? "text-typography-900" 
							: "text-typography-400" 
						}
					  `}
				>
					{item.label}
				</Text>
			</VStack>
		</Pressable>
	)
}

export default MenuItem