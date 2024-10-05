import Button from '@/components/ui/button/Button';
import Icon from '@/components/ui/icon/Icon';
import { FC } from 'react';
import { Text, View, Image, Pressable } from 'react-native';

interface ICheckout {
    closeModal: () => void;
    salonName: string;
    salonServiceName: string;
    salonAvatar: string;
    selectedDate: string;
    selectedTime: string;
    employeeName: string;
    price: number;
    duration: number;
}

const CheckoutModal: FC<ICheckout> = ({
    closeModal,
    salonName,
    salonServiceName,
    salonAvatar,
    selectedDate,
    selectedTime,
    employeeName,
    price,
    duration
}) => {

    const displayDate = new Date(selectedDate);
    displayDate.setDate(displayDate.getDate() + 1);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    const dateParts = displayDate.toLocaleDateString('pt-BR', options).split(', ');
    const dayOfWeek = dateParts[0] || '';
    const [day, monthYear] = dateParts[1]?.split(' de ') || ['', ''];

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startTime = new Date(displayDate.setHours(hours, minutes));
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <View className='flex-1 p-6 space-y-4'>
            <View className='flex-row w-full justify-between items-center'>
                <View className='flex-row items-center'>
                    <Image
                        source={{ uri: salonAvatar }}
                        width={52}
                        height={52}
                        className='rounded-full my-auto'
                    />
                    <View className='ml-4 justify-center items-start'>
                        <Text className='text-xl font-semibold'>{salonName}</Text>
                        <Text className='font-normal text-base'>{`${dayOfWeek}, ${day} de ${monthYear}`}</Text>
                    </View>
                </View>

                <Pressable onPress={closeModal} className='p-2 items-center justify-center rounded-full bg-gray-200'>
                    <Icon iconName='x' iconSize={22} iconColor='#676767' />
                </Pressable>
            </View>
            <View className='w-full h-0.5 bg-gray-200'></View>
            <View className='flex-row bg-gray-200 p-4 rounded-md'>
                <View className='w-5/6 space-y-1'>
                    <Text className='text-lg font-semibold'>{salonServiceName}</Text>
                    <View className='flex-row items-center space-x-4'>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-Preb3wDyB3lEpJyh-YT5OH79RXh0WIaqA&s' }}
                            width={28}
                            height={28}
                            className='rounded-full my-auto'
                        />
                        <Text className='text-base font-normal'>{employeeName}</Text>
                    </View>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-base font-medium text-green-600'>  R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        <Text className='text-sm font-normal'>{`${selectedTime} - ${formattedEndTime} (${duration} min)`}</Text>
                    </View>
                </View>
                <View className='flex-col w-1/6 justify-center items-center'>
                    <Text className='text-2xl font-bold'>{day}</Text>
                    <Text className='text-base font-normal'>{monthYear.split(' ')[0]}</Text>
                </View>
            </View>

            <Button>
                Confirmar agendamento
            </Button>
        </View>
    );
};

export default CheckoutModal;
