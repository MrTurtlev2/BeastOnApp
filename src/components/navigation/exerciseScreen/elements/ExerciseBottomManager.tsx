import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Defs, FeGaussianBlur, Filter, Path} from 'react-native-svg';
import {Ionicons} from '@expo/vector-icons';
import {Colors} from '../../../../constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Fonts} from '../../../../constants/Fonts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');
const SvgHeight = 150;

const ExerciseBottomManager = () => {
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.svgWrapper}>
                <Svg height={SvgHeight} width={width} viewBox={`0 0 ${width} ${SvgHeight}`}>
                    <Defs>
                        <Filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <FeGaussianBlur in="SourceGraphic" stdDeviation="10" />
                        </Filter>
                    </Defs>
                    <Path
                        d={`M0 ${SvgHeight} L${width} ${SvgHeight} L${width} 60 C${width * 0.75} 20, ${width * 0.25} 20, 0 60 Z`}
                        fill="black"
                        fillOpacity={0.2}
                        filter="url(#softShadow)"
                        transform="translate(0, -4)"
                    />
                    <Path
                        d={`M0 ${SvgHeight} L${width} ${SvgHeight} L${width} 60 C${width * 0.75} 20, ${width * 0.25} 20, 0 60 Z`}
                        fill={Colors.darkRed}
                    />
                </Svg>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <MaterialCommunityIcons name="clock-time-four-outline" size={40} color={Colors.lightRed} />
                    <Text style={styles.headerText}>{t('brake')}</Text>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity>
                        <FontAwesome6 name="pause" size={35} color={Colors.white} style={styles.icon} />
                    </TouchableOpacity>

                    <Text style={styles.timerText}>00:24</Text>

                    <TouchableOpacity>
                        <Ionicons name="play" size={35} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ExerciseBottomManager;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: SvgHeight,
    },
    svgWrapper: {
        ...StyleSheet.absoluteFillObject,

        height: SvgHeight,
    },
    icon: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: 0, height: 5},
        textShadowRadius: 8,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: Colors.white,
        opacity: 0.29,
        fontSize: 18,
        marginLeft: 6,
        fontFamily: Fonts.regular,
        marginBottom: 4,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '75%',
    },
    timerText: {
        color: Colors.white,
        fontSize: 36,
        fontFamily: Fonts.regular,
        marginBottom: 4,
        marginRight: -10,
    },
});
