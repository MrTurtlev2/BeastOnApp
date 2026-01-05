import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, Defs, Mask, Path, Rect} from 'react-native-svg';
import Animated, {Easing, useAnimatedProps, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LiquidProgress = ({percent = 40, size = 250}) => {
    const translateX = useSharedValue(0);
    const translateX2 = useSharedValue(-size);
    const liquidLevel = useSharedValue(size);

    useEffect(() => {
        translateX.value = withRepeat(withTiming(-size, {duration: 3000, easing: Easing.linear}), -1, false);

        translateX2.value = withRepeat(withTiming(0, {duration: 3500, easing: Easing.linear}), -1, false);
    }, []);

    useEffect(() => {
        liquidLevel.value = withTiming(size * (1 - percent / 100), {
            duration: 800,
            easing: Easing.out(Easing.quad),
        });
    }, [percent, size]);

    const animatedProps = useAnimatedProps(() => {
        const h = 10;
        const y = liquidLevel.value;
        const x = translateX.value;
        const d = `
      M ${x} ${y} 
      q ${size / 4} ${-h} ${size / 2} 0 
      t ${size / 2} 0
      q ${size / 4} ${-h} ${size / 2} 0 
      t ${size / 2} 0
      v ${size} 
      h ${-size * 2} 
      Z
    `;
        return {d};
    });
    const backgroundWaveProps = useAnimatedProps(() => {
        const h = 10;
        const y = liquidLevel.value - 2;
        const x = translateX2.value;
        const startX = x - size;
        const d = `
      M ${startX} ${y} 
      q ${size / 4} ${-h} ${size / 2} 0 
      t ${size / 2} 0
      q ${size / 4} ${-h} ${size / 2} 0 
      t ${size / 2} 0
      q ${size / 4} ${-h} ${size / 2} 0 
      t ${size / 2} 0
      q ${size / 4} ${-h} ${size / 2} 0 
      t ${size / 2} 0
      v ${size} 
      h ${-size * 4} 
      Z
    `;
        return {d};
    });

    return (
        <View style={styles.container}>
            <View style={[styles.decorCircle, {top: 20, left: 10, width: 30, height: 30}]} />
            <View style={[styles.decorCircle, {bottom: 40, right: 10, width: 50, height: 50, opacity: 0.5}]} />

            <View style={[styles.circleWrapper, {width: size, height: size, borderRadius: size / 2}]}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <Defs>
                        <Mask id="mask">
                            <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="white" />
                        </Mask>
                    </Defs>
                    <Rect width="100%" height="100%" fill="#1a1a1a" mask="url(#mask)" />
                    <AnimatedPath animatedProps={backgroundWaveProps} fill="#A3243D" opacity={0.4} mask="url(#mask)" />
                    <AnimatedPath animatedProps={animatedProps} fill="#A3243D" mask="url(#mask)" />
                </Svg>

                <View style={styles.textContainer}>
                    <Text style={styles.percentText}>{Math.round(percent)}%</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleWrapper: {
        backgroundColor: '#111',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 15},
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 15,
    },
    decorCircle: {
        position: 'absolute',
        backgroundColor: '#A3243D',
        borderRadius: 100,
    },
    textContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentText: {
        color: 'white',
        fontSize: 46,
        fontWeight: '200',
        letterSpacing: -2,
    },
});

export default LiquidProgress;
