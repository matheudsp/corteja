import { FC, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

import { IEmployee } from '@/types/appointment.interface';


interface ProfessionalSelectorProps {
    appointment: {
      employees: IEmployee[]; 
    } | undefined;
    selectedDate: string;
    onSelectProfessional: (name: string) => void;
  }
  


const ProfessionalSelector: FC<ProfessionalSelectorProps> = ({ appointment, selectedDate, onSelectProfessional }) => {
        const [selectedProf, setSelectedProf] = useState<string>('')
  
    if  (!appointment || !appointment.employees.length) {
        return (
            <View className='mt-4 space-y-2 px-4'>
                <Text className="text-lg font-bold mb-2">Escolha o profissional</Text>
                <Text className="text-gray-500 py-8 text-center">Nenhum profissional disponível para esse dia.</Text>
            </View>
        );
    }

    const handleSelectProfessional = (employeeId: string) => {
        setSelectedProf(employeeId);
        onSelectProfessional(employeeId);
    };

    return (
        <View className="mt-4 px-4 space-y-2">
            <Text className="text-lg font-bold ">Escolha o profissional</Text>
            <ScrollView horizontal className="flex-row">
                {appointment.employees.map((employee, empIndex: number) => {
                    const isSelected = employee.id === selectedProf;

                    return (
                        <TouchableOpacity
                            key={empIndex}
                            className={`items-center mr-4 ${isSelected ? 'border-blue-500' : ''}`}
                            onPress={() => handleSelectProfessional(employee.id)}
                        >
                            <Image
                                source={{ uri: employee.avatarPath }}
                                className={`rounded-full mb-2 w-16 h-16 ${isSelected ? 'border-2 border-blue-500' : ''}`}
                            />
                            <Text className={`text-sm ${isSelected ? 'font-bold text-blue-500' : ''}`}>
                                {employee.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default ProfessionalSelector;
