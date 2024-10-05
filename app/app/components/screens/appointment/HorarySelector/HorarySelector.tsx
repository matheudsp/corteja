import { FC } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';


interface HorarySelectorProps {
    availableTimes: string[];
    onSelectTime: (time: string) => void;
    selectedTime: string | null;
    showModal: () => void
}

const HorarySelector: FC<HorarySelectorProps> = ({ availableTimes, selectedTime, onSelectTime,showModal }) => {
    if (availableTimes.length <= 0) {
        return (
            <View className='mt-4 space-y-2 px-4'>
                <Text className="text-lg font-bold mb-2">Horários disponíveis</Text>
                <Text className="text-gray-500 py-8 text-cent1er">Nenhum horário disponível para esse dia.</Text>
            </View>
        );
    }

    return (
        <View className="mt-4 space-y-2 px-4">
            <Text className="text-lg font-bold mb-2">Horários disponíveis</Text>
            <View className="flex-row">
                {availableTimes.map((time, index) => {
                    const isSelected = time === selectedTime; // Verifica se o horário é o selecionado
                    return (
                        <TouchableOpacity
                            key={index}
                            className={`border rounded-lg p-2 mr-2 ${isSelected ? 'border-blue-600 bg-blue-100' : 'border-[#363062]'
                                }`}
                            onPress={() => {onSelectTime(time); showModal()}}
                        >
                            <Text className={`${isSelected ? 'text-blue-600' : 'text-[#363062]'} font-normal text-base`}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default HorarySelector;
