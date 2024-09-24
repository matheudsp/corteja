import { FC } from 'react'
import { Text, View, Image } from 'react-native'



import { ISalonComponent } from '../salon-page.interface'

const AboutSalon: FC<ISalonComponent> = ({ salon }) => {
    return (
        <View className='my-4 space-y-4'>
            <Text className='font-light text-base'>{'Descubra o Sherri Zieme, onde sua beleza é nossa prioridade com serviços de alta qualidade em um ambiente acolhedor!'}</Text>
            <View className=''>
                <Text className=' text-xl font-medium'>Profissionais</Text>
                {salon.employee?.length ? (
                    <View className='flex-col space-y-4 mt-4'>
                        {salon.employee.map((employee, index) => {
                            return (
                                <View key={index} className='flex-row space-x-4 '>

                                    <Image
                                        source={{ uri: employee?.avatarPath }}
                                        width={64}
                                        height={64}
                                        className=' rounded-full my-auto'
                                    />

                                    <View className='items-start justify-center'>
                                        <Text className='text-lg'>{employee.name}</Text>
                                        <Text className='text-sm font-light text-gray-400'>{'Colaborador'}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                ) : (
                    <Text className='mt-2'>Não há profissionais cadastrados</Text>
                )}
            </View>

        </View>
    )
}

export default AboutSalon