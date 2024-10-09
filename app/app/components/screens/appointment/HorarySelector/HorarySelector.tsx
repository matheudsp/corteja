import { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text } from 'components/ui/text';
import { Box } from 'components/ui/box';


import { VStack } from 'components/ui/vstack';
import { HStack } from 'components/ui/hstack';


interface HorarySelectorProps {
    availableTimes: string[];
    onSelectTime: (time: string) => void;
    selectedTime: string | null;
    showModal: () => void
}

const HorarySelector: FC<HorarySelectorProps> = ({ availableTimes, selectedTime, onSelectTime,showModal }) => {
    if (availableTimes.length <= 0) {
        return (
            <VStack space='md' className='mt-4 px-4'>
                <Text className="text-lg font-bold mb-2 text-typography-900">Horários disponíveis</Text>
                <Text className="text-typography-500 py-8 text-center">Nenhum horário disponível para esse dia.</Text>
            </VStack>
        );
    }

    return (
        <VStack space='sm' className="mt-4  px-4">
            <Text className="text-lg font-bold mb-2 text-typography-900">Horários disponíveis</Text>
            <HStack space='md'>
                {availableTimes.map((time, index) => {
                    const isSelected = time === selectedTime; 
                    return (
                        <TouchableOpacity
                            key={index}
                            className={`border rounded-lg p-2 mr-2 ${isSelected ? 'border-tertiary-600 bg-tertiary-100' : 'border-typography-800'
                                }`}
                            onPress={() => {onSelectTime(time); showModal()}}
                        >
                            <Text className={`${isSelected ? 'text-tertiary-600' : 'text-typography-800'} font-normal text-base`}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </HStack>
        </VStack>
    );
};

export default HorarySelector;
