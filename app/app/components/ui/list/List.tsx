import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Pressable, Text, View } from 'react-native'
import { IList } from './list.interface'
import { listItems } from './list.data'

import ListItem from './list-item/listItem'

const List: FC<IList> = ({

}) => {
    return (
        <View className='mt-3'>
            {listItems?.length && (
                <View className=''>
                    {listItems.map((item,index) => (
                        <ListItem key={index} item={item}  />
                    ))}
                </View>)}

        </View>
    )
}

export default List