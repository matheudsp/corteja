import { FC, useContext } from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import MenuItem from './MenuItem'
import { menuItems } from './menu.data'
import { TypeNavigate } from './menu.interface'
import { HStack } from 'components/ui/hstack'
import { ThemeContext } from '@/providers/ThemeContext'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = props => {
	const { bottom } = useSafeAreaInsets()
	const {colorMode} = useContext(ThemeContext)

	return (
		<HStack
			className={`${colorMode === "light" ? "bg-background-light " : "bg-background-dark "} shadow-soft-2 pt-4 px-6 justify-between items-center w-full `}
			style={{
				paddingBottom: bottom 
			}}
		>
			{menuItems.map(item => (
				<MenuItem key={item.path} item={item} {...props} />
			))}
		</HStack>
	)
}

export default BottomMenu