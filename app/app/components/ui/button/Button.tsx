import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Pressable } from 'components/ui/pressable'
import { Text } from 'components/ui/text'
import { IButton } from './button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
	className,
	children,
	...rest
}) => {
	return (
		<Pressable
			className={cn(
				'self-center bg-tertiary-400 w-full py-3 font-light rounded-lg',
				className
			)}
			{...rest}
		>
			<Text className='text-white text-center font-medium text-lg'>
				{children}
			</Text>
		</Pressable>
	)
}

export default Button