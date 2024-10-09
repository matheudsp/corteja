import cn from 'clsx'
import { Box } from 'components/ui/box'
import { ScrollView } from 'react-native'
import { FC, PropsWithChildren } from 'react'


interface ILayout {
	className?: string
	withoutPadding?: boolean
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className, withoutPadding}) => {
	return (
		<Box className={cn(`h-full w-full mt-12`, className, { 'px-4': !withoutPadding })}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{children}
			</ScrollView>
		</Box>
	)
}

export default Layout