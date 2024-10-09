import { FC, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { IEmployee } from '@/types/appointment.interface';
import { Text } from 'components/ui/text';
import { Box } from 'components/ui/box';

import {ScrollView} from 'components/ui/scroll-view'
import { VStack } from 'components/ui/vstack';


interface ProfessionalSelectorProps {
    appointment: {
      employees: IEmployee[]; 
    } | undefined;
    selectedDate: string;
    onSelectProfessional: (id:string ,name: string, avatar: string) => void;
  }
  


const ProfessionalSelector: FC<ProfessionalSelectorProps> = ({ appointment, selectedDate, onSelectProfessional }) => {
        const [selectedProf, setSelectedProf] = useState<string>('')
  
    if  (!appointment || !appointment.employees.length) {
        return (
            <VStack space='md' className='mt-4 px-4'>
                <Text className="text-xl font-bold mb-2 text-typography-900">Escolha o profissional</Text>
                <Text className="text-typography-500 py-8 text-center">Nenhum profissional disponível para esse dia.</Text>
            </VStack>
        );
    }

    const handleSelectProfessional = (employeeId: string, employeeName: string, employeeAvatar:string) => {
        setSelectedProf(employeeId);
        onSelectProfessional(employeeId, employeeName, employeeAvatar);
    };

    return (
        <VStack space='sm' className="mt-4 px-4">
            <Text className="text-lg font-bold text-typography-900">Escolha o profissional</Text>
            <ScrollView horizontal className="flex-row">
                {appointment.employees.map((employee, empIndex: number) => {
                    const isSelected = employee.id === selectedProf;

                    return (
                        <TouchableOpacity
                            key={empIndex}
                            className={`items-center mr-4 ${isSelected ? 'border-blue-500' : ''}`}
                            onPress={() => handleSelectProfessional(employee.id, employee.name, employee.avatarPath)}
                        >
                            <Image
                                source={{ uri: employee.avatarPath }}
                                className={`rounded-full mb-2 w-16 h-16 ${isSelected && 'border-2 border-tertiary-400' }`}
                            />
                            <Text className={`text-sm ${isSelected && 'font-bold text-tertiary-400' }`}>
                                {employee.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </VStack>
    );
};

export default ProfessionalSelector;
