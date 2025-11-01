import Svg, {
    Defs,
    FeComposite,
    FeDropShadow,
    FeFlood,
    FeGaussianBlur,
    FeMerge,
    FeMergeNode,
    FeOffset,
    Filter,
    G,
    Path,
} from 'react-native-svg';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const svgWidth = 355;
export default function DrawShapeSvg() {
    return (
        // <Svg width={355} height={852} viewBox="0 0 355 852" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Svg width={355} height={windowHeight} viewBox={`0 0 355 852`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <Defs>
                <Filter id="combinedShadows" x="-50%" y="-50%" width="200%" height="200%">
                    <FeGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
                    <FeOffset dx="0" dy="-4" result="offsetBlur" />
                    <FeComposite in="SourceAlpha" in2="offsetBlur" operator="arithmetic" k2="-1.2" k3="1.2" result="shadowCutout" />
                    <FeFlood floodColor="#000000" floodOpacity="0.4" result="shadowColor" />
                    <FeComposite in="shadowColor" in2="shadowCutout" operator="in" result="innerShadow" />

                    <FeDropShadow dx="-3" dy="11" stdDeviation="4" floodColor="#731A2B" floodOpacity="0.55" result="dropShadowResult" />

                    <FeMerge>
                        <FeMergeNode in="dropShadowResult" />
                        <FeMergeNode in="innerShadow" />
                    </FeMerge>
                </Filter>
            </Defs>

            <G filter="url(#combinedShadows)">
                <Path d="M36.105 78l321.5-78v852L165 813.875 36.105 702.5l55.5-305.75L7 234.875 36.105 78z" fill="#262626" />
            </G>
        </Svg>
    );
}
