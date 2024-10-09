import { FC } from 'react'
import { Animated } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import FavoriteButton from './favorite-button/FavoriteButton'
import { ISalonComponent } from './salon-page.interface'

import { Icon } from 'components/ui/icon'
import { ArrowLeft } from 'lucide-react-native'
import { Pressable } from 'components/ui/pressable'
import { HStack } from 'components/ui/hstack'
import { ISalon } from '@/types/salon.interface'


interface SalonHeaderProps extends ISalonComponent {
    backgroundColor: any; 
}

const SalonHeader: FC<SalonHeaderProps> = ({ salon, backgroundColor }) => {
    const { goBack } = useTypedNavigation()

    return (
        <Animated.View style={{ backgroundColor }} className="absolute top-0 z-10 w-full"> 
            <HStack className='p-4 justify-between items-center '>
                <Pressable onPress={goBack} className='content-center'>
                    <Icon
                        as={ArrowLeft}
                        size='2xl'
                        className='text-typography-800'
                    />
                </Pressable>
                <FavoriteButton className='' iconSize={26} key={salon?.id} SalonId={salon.id} />
            </HStack>
        </Animated.View>
    )
}

export default SalonHeader
