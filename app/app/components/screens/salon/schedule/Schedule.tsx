import { FC, useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { ISalonComponent } from '../salon-page.interface';
import { Icon } from 'components/ui/icon';

import { Image } from 'components/ui/image';
import { HStack } from 'components/ui/hstack';

import { Text } from 'components/ui/text'

import { Box } from 'components/ui/box'
import { VStack } from 'components/ui/vstack';
import { Calendar, SquareUserRound } from 'lucide-react-native';
import { ThemeContext } from '@/providers/ThemeContext';

const Schedule: FC<ISalonComponent> = ({ salon }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const {colorMode} = useContext(ThemeContext)
    const filteredAppointments = salon.appointments
        .filter(appointment => dayjs(appointment.date).isSame(selectedDate, 'day'))
        .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

    return (
        <Box className='my-4'>

            <HStack className='mb-4 items-center'>
                <Icon as={Calendar} size='xl' className='text-typography-900 items-center' />
                <DateTimePicker

                    value={selectedDate}
                    mode="date"
                    themeVariant={colorMode}
                    display="compact"
                    onChange={(event, date) => setSelectedDate(date || selectedDate)}
                />
            </HStack>


            <VStack space='md' >
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => {
                        const time = dayjs(appointment.date).format('HH:mm');
                        return (
                            <HStack key={index} space='md' className=' items-center'>
                                <Box className='bg-gray-200 rounded-full w-4 h-4'></Box>
                                <Text className='text-lg font-light'>{time}h</Text>
                                <Box className='h-0.5 flex-1 bg-gray-300'></Box>
                                <HStack space='xs' className={'bg-tertiary-400 px-3 py-2 rounded-lg items-center'}>
                                    <Icon
                                        as={SquareUserRound}
                                        size='2xl'
                                        className='text-white'  
                                    />
                                    <Box>
                                        <Text className='text-base text-white font-medium'>
                                            {appointment.customer.name.split(' ')[0]}
                                        </Text>
                                        <Text className='text-xs text-white font-light'>
                                            {appointment.salonService.name}
                                        </Text>
                                    </Box>
                                </HStack>
                            </HStack>
                        );
                    })
                ) : (
                    <Box className='items-center justify-center h-60'>
                        <Text className='text-gray-500'>Não há agendamentos para a data selecionada.</Text>
                    </Box>
                )}
            </VStack >
        </Box >
    );
};

export default Schedule;
