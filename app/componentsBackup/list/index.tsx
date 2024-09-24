import { View, Text, Pressable,TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react'
import { EstablishmentItem } from './item'
import { Feather, Ionicons } from '@expo/vector-icons';


interface coordenadas {
  tipo?: string;
  coordenadas: number[];
}

export interface EstablishmentsProps{
  id: string;
  foto: string;
  nome: string;
  enderecoRua: string;
  geoCoordenadas: coordenadas;
  enderecoCidade: string,
  enderecoUf:string;
  enderecoNumero:string,
  enderecoCep: string
}
const establishments: EstablishmentsProps[] = [
  {
      "id": "b7dbfef0-adb5-43bd-8c51-2034a68b8ef5",
      "foto": "https://www.designmantic.com/images/industry/beauty/dm-beauty-logo-12.png",
      "nome": "Barbearia do Cleyton de Silva Machado",
      "enderecoCidade": "Floriano",
      "enderecoUf": "Piauí",
      "enderecoNumero": "1432",
      "enderecoRua":"Irapua II",
      "enderecoCep": "2345234",
      "geoCoordenadas": {
          "coordenadas": [
              -6.771722259656771,
              -43.00702048083894
          ]
      }
  },
  {
      "id": "725f1f74-f164-4ee3-8ff2-d8df254c2c24",
      "foto": "https://static.wixstatic.com/media/4c82981e961041ae9b1a50b5895e47ae.jpg/v1/fill/w_640,h_760,al_t,q_85,usm_0.66_1.00_0.01,enc_auto/4c82981e961041ae9b1a50b5895e47ae.jpg",
      "nome": "Salão Sampaio 3",
      "enderecoCidade": "Floriano",
      "enderecoUf": "Piauí",
      "enderecoRua":"Irapua II",
      "enderecoNumero": "1432",
      "enderecoCep": "2345234",
      "geoCoordenadas": {
          "coordenadas": [
              -6.771722259656771,
              -43.00702048083894
          ]
      }
  }
]

export function EstablishmentVerticalList() {
  // const [establishments, setEstablishments] = useState<EstablishmentsProps[]>([])

  useEffect(() => {
    async function getEstablishment(){
      // const response = await fetch("http://localhost:3333/salao/filter")
      // const data = await response.json()
      // setEstablishments(data);
    }

    // getEstablishment();
  }, [])


 return (
   <View className="px-4 flex-1 w-full h-full mb-11 gap-4 jusitfy-center">
    {establishments.map( item => (
      <EstablishmentItem item={item} key={item.id}/>
    ))}
    <TouchableOpacity className='border-2 mx-32 p-4 rounded-2xl items-center flex-row justify-center border-cyan-950'>
      <Text className='text-base font-semibold'>{'Ver Todos'}</Text>
      <Feather name='arrow-right' size={20} color="#1d2264" />
    </TouchableOpacity>
   </View>
  );
}