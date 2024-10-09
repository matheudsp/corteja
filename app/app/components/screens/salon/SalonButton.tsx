import { Feather } from '@expo/vector-icons'
import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import {  PressableProps, View } from 'react-native'
import { Pressable } from 'components/ui/pressable'
import { TypeFeatherIconNames } from '@/types/icon.interface'
import { Box } from 'components/ui/box'

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
			<Box
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
			</Box>
		</Pressable>
	)
}

export default SalonButton