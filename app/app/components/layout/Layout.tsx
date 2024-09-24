import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'

interface ILayout {
	className?: string
	withoutPadding?: boolean
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className, withoutPadding}) => {
	return (
		<View className={cn(`h-full w-full bg-white mt-12`, className, { 'px-4': !withoutPadding })}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{children}
			</ScrollView>
		</View>
	)
}

export default Layout