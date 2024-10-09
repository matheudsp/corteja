import { FC, useState } from 'react';

import dayjs from 'dayjs';
import Icon from '@/components/ui/icon/Icon';
import { Box } from 'components/ui/box';
import { Text } from 'components/ui/text';
import { Button } from 'components/ui/button';
import { ScrollView } from 'components/ui/scroll-view'
import { HStack } from 'components/ui/hstack';
import { VStack } from 'components/ui/vstack';
import { Pressable } from 'components/ui/pressable';
import { TouchableOpacity } from 'react-native';

interface DateSelectorProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DateSelector: FC<DateSelectorProps> = ({ selectedDate, setSelectedDate }) => {
  const today = dayjs();
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'));

  const getDaysOfWeek = () => {
    const days = [];
    const startOfWeek = currentWeek.isSame(today, 'week') ? today : currentWeek;

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day');
      if (day.isAfter(today, 'day') || day.isSame(today, 'day')) {
        days.push(day);
      }
    }
    return days;
  };

  const nextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'));
  };

  const prevWeek = () => {
    if (currentWeek.isAfter(today, 'week')) {
      setCurrentWeek(currentWeek.subtract(1, 'week'));
    }
  };

  return (
    <VStack className="flex mt-2">
      <HStack className="justify-between px-4 items-center">
        <TouchableOpacity className='p-2 bg-gray-300 rounded-full' onPress={prevWeek} disabled={currentWeek.isSame(today, 'week')}>
          <Icon iconName='arrow-left' iconColor='#5b5b5b' iconSize={24} iconStyle={{ color: currentWeek.isSame(today, 'week') ? 'gray' : 'black', }} />
        </TouchableOpacity>
        <Text className='text-base font-medium text-typography-900'>{currentWeek.format('MMMM, YYYY')}</Text>
        <TouchableOpacity className='p-2 bg-gray-300 rounded-full' onPress={nextWeek}>
          <Icon iconName='arrow-right' iconColor='black' iconSize={24} />
        </TouchableOpacity>
      </HStack>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="sm" className=" justify-between mt-4 px-4">
          {getDaysOfWeek().map((day, index) => (
            <Pressable
              className={`h-20 w-16 justify-center  rounded-lg ${day.isSame(selectedDate, 'day') ? 'bg-tertiary-400' : 'bg-typography-300'}`}
              key={index}
              onPress={() => setSelectedDate(day.toDate())}>

              <Text className={`text-center font-normal text-base text-typography-500 ${day.isSame(selectedDate, 'day') && 'text-white'}`}>{day.format('ddd')}</Text>
              <Text className={`text-center text-xl font-bold  text-typography-500 ${day.isSame(selectedDate, 'day') && 'text-white'}`}>{day.format('DD')}</Text>

            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default DateSelector;
