import { Button } from 'components/ui/button';
import Icon from '@/components/ui/icon/Icon';
import { HStack } from 'components/ui/hstack';
import { VStack } from 'components/ui/vstack';
import { Box } from 'components/ui/box';
import { Text } from 'components/ui/text';
import { Pressable } from 'components/ui/pressable';
import { FC } from 'react';
import { Image } from 'react-native';
import { Divider } from 'components/ui/divider';
import { Toast, ToastDescription, ToastTitle, useToast } from 'components/ui/toast';
import React from 'react';
import { useTypedNavigation } from '@/hooks/useTypedNavigation';

interface ICheckout {
    closeModal: () => void;
    salonName: string;
    salonServiceName: string;
    salonAvatar: string;
    selectedDate: string;
    selectedTime: string;
    employeeName: string;
    employeeAvatar: string;
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
    employeeAvatar,
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

    const toast = useToast()
    const [toastId, setToastId] = React.useState<string>('')
    const { navigate } = useTypedNavigation() 
    
    const handleToast = () => {
      if (!toast.isActive('checkout')) {
        showToast()
        closeModal()
        navigate('AppointmentHistory')
      }
    }

    const showToast = () => {
        setToastId('checkout')
        toast.show({
          id: 'checkout',
          placement: "top",
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = "toast-" + id
            return (
              <Toast nativeID={uniqueToastId} action="success" variant="solid">
                <ToastTitle>Boaaa!</ToastTitle>
                <ToastDescription>
                  Seu agendamento foi realizado!
                </ToastDescription>
              </Toast>
            )
          },
        })
      }

    return (
        <VStack space='md' className='flex-1 p-6 '>
            <HStack className=' w-full justify-between items-center'>
                <HStack className='items-center'>
                    <Image
                        source={{ uri: salonAvatar }}
                        width={52}
                        height={52}
                        className='rounded-full my-auto'
                    />
                    <Box className='ml-4 justify-center items-start'>
                        <Text className='text-xl font-semibold text-typography-900'>{salonName}</Text>
                        <Text className='font-normal text-base text-typography-900'>{`${dayOfWeek}, ${day} de ${monthYear}`}</Text>
                    </Box>
                </HStack>

                <Pressable onPress={closeModal} className='p-2 items-center justify-center rounded-full bg-typography-200'>
                    <Icon iconName='x' iconSize={22} classname='text-typography-500' />
                </Pressable>
            </HStack>
            <Divider className="my-0.5" />
            <HStack className=' bg-typography-200 p-4 rounded-md'>
                <Box className='w-5/6 space-y-1'>
                    <Text className='text-lg font-semibold text-typography-900'>{salonServiceName}</Text>
                    <HStack space='md' className='items-center '>
                        <Image
                            source={{ uri: employeeAvatar }}
                            width={28}
                            height={28}
                            className='rounded-full my-auto'
                        />
                        <Text className='text-base font-normal text-typography-700'>{employeeName}</Text>
                    </HStack>
                    <HStack className=' items-center justify-between'>
                        <Text className='text-base font-medium text-green-600'>  R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        <Text className='text-sm font-normal text-typography-900'>{`${selectedTime} - ${formattedEndTime} (${duration} min)`}</Text>
                    </HStack>
                </Box>
                <VStack className='flex-col w-1/6 justify-center items-center'>
                    <Text className='text-2xl font-bold text-typography-900'>{day}</Text>
                    <Text className='text-base font-normal text-typography-900'>{monthYear.split(' ')[0]}</Text>
                </VStack>
            </HStack>

            <Button onPress={handleToast} action='positive' size='xl' className='content-center bg-tertiary-400 w-full rounded-lg'>
                <Text className='text-white text-center font-medium text-lg'>
                    Confirmar agendamento
                </Text>
            </Button>
            <Button action='secondary' size='xl' className='content-center bg-blue-400 w-full rounded-lg'>
                <Text className='text-white text-center font-medium text-lg'>
                    Adicionar ao carrinho
                </Text>
            </Button>
        </VStack>
    );
};

export default CheckoutModal;
