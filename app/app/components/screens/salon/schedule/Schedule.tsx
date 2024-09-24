import { FC, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { ISalonComponent } from '../salon-page.interface';
import { Feather } from '@expo/vector-icons';
import Icon from '@/components/ui/icon/Icon';

const Schedule: FC<ISalonComponent> = ({ salon }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const filteredAppointments = salon.appointments
        .filter(appointment => dayjs(appointment.date).isSame(selectedDate, 'day'))
        .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

    return (
        <View className='my-4'>

            <View className='mb-4 flex-row items-center'>
                <Icon iconName='calendar' iconSize={18} iconColor='#111827' />
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="compact"
                    onChange={(event, date) => setSelectedDate(date || selectedDate)}
                />
            </View>


            <ScrollView className='flex-col space-y-4'>
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => {
                        const time = dayjs(appointment.date).format('HH:mm');
                        return (
                            <View key={index} className='flex-row items-center space-x-4'>
                                <View className='bg-gray-200 rounded-full w-4 h-4'></View>
                                <Text className='text-lg font-light'>{time}h</Text>
                                <View className='h-0.5 flex-1 bg-gray-300'></View>
                                <View className={'bg-[#9474FF] px-3 py-2 rounded-lg flex-row items-center'}>
                                    <Image
                                        source={{ uri: 'https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png' }}  // Imagem do cliente
                                        className='w-8 h-8 rounded-full mr-2'
                                    />
                                    <View>
                                        <Text className='text-base text-white font-medium'>
                                            {appointment.customer.name.split(' ')[0]}
                                        </Text>
                                        <Text className='text-xs text-white font-light'>
                                            {appointment.salonService.name}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <Text className='text-gray-500'>Não há agendamentos para a data selecionada.</Text>
                )}
            </ScrollView >
        </View >
    );
};

export default Schedule;
