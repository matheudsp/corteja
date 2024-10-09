import { ThemeContext } from '@/providers/ThemeContext';
import { Box } from 'components/ui/box';
import { useContext, type PropsWithChildren, type ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';


const HEADER_HEIGHT = 50;
const { width } = Dimensions.get('window')

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    
}>;

export default function ParallaxScrollView({
    children,
    headerImage,
    
}: Props) {
    const {colorMode} = useContext(ThemeContext)
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    return (
        <Box style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.View
                    style={[
                        styles.header,
                        { backgroundColor: colorMode === "light" ? "#E5E5E5" : "#262626" },
                        headerAnimatedStyle,
                    ]}>
                    {headerImage}
                </Animated.View>
                <Box style={styles.content}>{children}</Box>
            </Animated.ScrollView>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        overflow: 'hidden',
    },
});
