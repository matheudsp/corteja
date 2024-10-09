import { Button } from "components/ui/button";
import { HStack } from "components/ui/hstack";
import { Skeleton, SkeletonText } from "components/ui/skeleton";
import { VStack } from "components/ui/vstack";
import { Text } from "components/ui/text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SkeletonSalon = () => {
    return (
    <HStack
        space='lg'
        className='px-4 '>
        {Array.from({ length: 3 }).map((_, index) => (
            <VStack
                key={index}
                className='gap-2 bg-typography-100 border w-72 p-3 max-w-72 border-typography-400 rounded-3xl items-center'>
                <Skeleton variant="rounded" className="h-[138px] p-1.5" />

                <VStack className={`gap-2 w-full`}>
                    <SkeletonText _lines={1} className='h-5 ' />
                    <SkeletonText _lines={1} className='h-7 ' />
                    <SkeletonText _lines={1} className='h-4' />

                    <HStack space='md' className='w-full'></HStack>
                    <HStack space='md' className='w-full'>
                        <Button
                            size='xl'
                            className='bg-typography-800 w-[25%] rounded-lg p-2 flex items-center justify-center'>
                            <MaterialCommunityIcons
                                name='bookmark-outline'
                                size={20}
                                color='#b8b8b8'
                            />
                        </Button>
                        <Button
                            size='xl'
                            className='bg-tertiary-400 w-[70%] rounded-lg'>
                            <Text className='text-typography-800 font-medium text-lg uppercase'>
                                Agendar
                            </Text>
                        </Button>
                    </HStack>
                </VStack>
            </VStack>))}
    </HStack>
    );

};



export default SkeletonSalon;
