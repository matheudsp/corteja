import { TypeFeatherIconNames,TypeMaterialIconNames } from '@/types/icon.interface'
import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

interface IIconProps {
	iconName: TypeFeatherIconNames
	iconSize: number
	iconColor: string
    classname?: string
    iconStyle?: TextStyle | ViewStyle;
}

const Icon: FC<IIconProps> = ({iconName, iconSize, iconColor, classname, iconStyle}) => {

    return (
        <Feather
            style={iconStyle}
            className={`${classname}`}
            name={iconName}
            size={iconSize}
            color={iconColor}
        />
    )
}

export default Icon