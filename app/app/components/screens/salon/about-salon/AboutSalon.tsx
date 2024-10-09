import { FC } from 'react'

import { Image } from 'components/ui/image';
import { HStack } from 'components/ui/hstack';

import { Text } from 'components/ui/text'

import { Box } from 'components/ui/box'
import { Skeleton, SkeletonText } from 'components/ui/skeleton'

import { ISalonComponent } from '../salon-page.interface'
import { VStack } from 'components/ui/vstack';

const AboutSalon: FC<ISalonComponent> = ({ isLoading, salon }) => {
    if (isLoading) {
        return (
            <VStack space='md' className='my-4'>
                <SkeletonText _lines={3} className="h-3" />
                <Text className=' text-xl font-medium'>Profissionais</Text>
                <VStack space='md'>
                    <HStack space='md' className="gap-2 align-middle items-center">

                        <Skeleton variant="circular" className="h-[48px] w-[48px] " />

                        <SkeletonText _lines={2} className="h-3 w-4/5" />




                    </HStack>
                    <HStack space='md' className="gap-2 align-middle items-center">

                        <Skeleton variant="circular" className="h-[48px] w-[48px] " />

                        <SkeletonText _lines={2} className="h-3 w-4/5" />




                    </HStack>
                    <HStack space='md' className="w-full gap-2 align-middle items-center">

                        <Skeleton variant="circular" className="h-[48px] w-[48px] " />

                        <SkeletonText _lines={2} className="h-3 w-4/5" />




                    </HStack>
                </VStack>

            </VStack>)
    }

    return (
        <VStack space='md' className='flex-1 my-4'>
            <Box className=''>
                <Text className='font-light text-base'>{'Descubra o Sherri Zieme, onde sua beleza é nossa prioridade com serviços de alta qualidade em um ambiente acolhedor!'}</Text>
            </Box>
            <Box className=''>
                <Text className=' text-xl font-medium'>Profissionais</Text>
                {salon?.employee?.length ? (
                    <VStack space='md' className='flex-1 space-y-4 mt-4'>
                        {salon.employee.map((employee, index) => {
                            return (
                                <HStack key={index} space='md' >

                                    <Image
                                        size='sm'
                                        source={{ uri: employee?.avatarPath }}
                                        alt='employee image'
                                        width={48}
                                        height={48}
                                        className=' rounded-full my-auto'
                                    />

                                    <Box className='items-start justify-center'>
                                        <Text className='text-lg'>{employee.name}</Text>
                                        <Text className='text-sm font-light text-gray-400'>{'Colaborador'}</Text>
                                    </Box>
                                </HStack>
                            )
                        })}
                    </VStack>
                ) : (
                    <Text className='mt-2'>Não há profissionais cadastrados</Text>
                )}
            </Box>

        </VStack>

    )
}

export default AboutSalon