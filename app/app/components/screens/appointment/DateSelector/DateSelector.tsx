import { FC, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import Icon from '@/components/ui/icon/Icon';

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
    <View className="flex flex-col">
      <View className="flex-row justify-between px-4 items-center">
        <TouchableOpacity className='p-2 bg-gray-300 rounded-full' onPress={prevWeek} disabled={currentWeek.isSame(today, 'week')}>
          <Icon iconName='arrow-left' iconColor='#5b5b5b' iconSize={22} iconStyle={{ color: currentWeek.isSame(today, 'week') ? 'gray' : 'black', }} />

        </TouchableOpacity>
        <Text className='text-base font-medium'>{currentWeek.format('MMMM, YYYY')}</Text>
        <TouchableOpacity className='p-2 bg-gray-300 rounded-full' onPress={nextWeek}>
          <Icon iconName='arrow-right' iconColor='#5b5b5b' iconSize={22} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row justify-between mt-4 px-4">
          {getDaysOfWeek().map((day, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedDate(day.toDate())}>
              <View className={`mx-2 h-16 w-12 justify-center rounded-lg ${day.isSame(selectedDate, 'day') ? 'bg-blue-500' : 'bg-gray-200'}`}>
                <Text className={`text-center font-normal text-sm ${day.isSame(selectedDate, 'day') && 'text-white'}`}>{day.format('ddd')}</Text>
                <Text className={`text-center text-lg font-bold  ${day.isSame(selectedDate, 'day') && 'text-white'}`}>{day.format('DD')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DateSelector;
