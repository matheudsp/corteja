import { View, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons'

export function Search() {
  return (
    <Pressable className='w-full flex-row items-center justify-between'>
      <View className='w-[81%] flex-row border  rounded-2xl border-slate-500 h-16 items-center gap-3 px-4 bg-transparent'>
        <Feather name='search' size={24} color="#64748b" />

        <TextInput
          placeholder="Procure um estabelecimento..."
          placeholderTextColor={'#64748b'}
          className='w-full h-full flex-1 bg-transparent'
        />

      </View>
      <View className='w-[16%] h-16 justify-center items-center bg-orange-500 rounded-2xl'>
        <Feather name='filter' size={24} color="#e6e5e1" />
      </View>
    </Pressable>
  );
}