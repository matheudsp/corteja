import { View, Pressable, Text, Image } from 'react-native';
import { EstablishmentsProps } from '..'
import { Ionicons } from '@expo/vector-icons'

export function EstablishmentItem({ item }: { item: EstablishmentsProps }) {
 return (
   <Pressable className='w-full flex flex-row items-center justify-start gap-3'>
     <Image
      source={{ uri: item.foto}}
      className='w-24 h-24cls  rounded-2xl'
     />

     <View className='flex gap-1.5 w-[70%]'>
      <Text className='text-xl leading-6 font-bold' numberOfLines={1}>
        {item.nome}
      </Text>

      <View className='flex-row items-center'>
        <Text className='text-lg font-light'>{item.enderecoRua},  {item.enderecoNumero} - {item.enderecoCep}</Text>
      </View>

      <View className='flex-row items-center'>
      <Ionicons name='location-sharp' size={16} color="#d81818" />
        <Text className='text-base font-normal'>{'10km'}</Text>
      </View>

      {/* <View className='flex-row items-center gap-1'>
        <Ionicons name='star-sharp' size={20} color="#d89b18" />
        <Text className='text-lg font-light'>4.3</Text>
      </View> */}

     </View>
   </Pressable>
  );
}