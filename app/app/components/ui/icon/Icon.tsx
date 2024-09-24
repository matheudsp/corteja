import { TypeFeatherIconNames,TypeMaterialIconNames } from '@/types/icon.interface'
import { Feather } from '@expo/vector-icons'
import { FC } from 'react'

interface IIconProps {
	iconName: TypeFeatherIconNames
	iconSize: number
	iconColor: string
    classname?: string
}

const Icon: FC<IIconProps> = ({iconName, iconSize, iconColor, classname }) => {

    return (
        <Feather
        
            className={`${classname}`}
            name={iconName}
            size={iconSize}
            color={iconColor}
        />
    )
}

export default Icon