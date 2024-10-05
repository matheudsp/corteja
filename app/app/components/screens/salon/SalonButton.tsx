import { Feather } from '@expo/vector-icons'
import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Pressable, PressableProps, View } from 'react-native'

import { TypeFeatherIconNames } from '@/types/icon.interface'

interface ISalonButton extends PressableProps {
	icon?: TypeFeatherIconNames
	iconSize?: number
	color?: string
	className?: string
	action?: () => void
}

const SalonButton: FC<PropsWithChildren<ISalonButton>> = ({
	children,
	icon,
	iconSize,
	color,
	className,
	...rest
}) => {
	return (
		<Pressable {...rest}>
			<View
				className={cn(
					'items-center justify-center overflow-hidden p-2 rounded-full',
					className
				)}
			>
				{children ? (
					children
				) : (
					<Feather name={icon} size={iconSize} color={color} />
				)}
			</View>
		</Pressable>
	)
}

export default SalonButton