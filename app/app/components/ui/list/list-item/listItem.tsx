import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

import { IListItem, TypeNavigate } from '../list.interface'


interface IListItemProps {
    item: IListItem
}

const ListItem: FC<IListItemProps> = ({ item }) => {


    return (
        <Pressable
            className='items-center  border-b border-gray-300 py-6 flex-row justify-between'
        // onPress={() => nav(item.path)}
        >
            <View className='flex-row items-center '>
                <MaterialIcons
                    name={item.iconName}
                    size={26}
                    color={'#475baa'}
                />
                <Text className='ml-4 text-lg font-normal'>
                    {item.title}
                </Text>
            </View>
            <MaterialIcons name='keyboard-arrow-right' size={25} color={'#9d9ab8'}/>
        </Pressable>
    )
}

export default ListItem