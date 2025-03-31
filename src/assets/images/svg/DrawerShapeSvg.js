import Svg, {Defs, G, Path} from 'react-native-svg';

export default function DrawShapeSvg() {
    return (
        <Svg
            // width={355}
            width={355}
            height={852}
            // viewBox="0 0 355 852"
            viewBox="0 0 355 852"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <G filter="url(#filter0_di_26_285)">
                <Path
                    d="M36.105 78l321.5-78v852L165 813.875 36.105 702.5l55.5-305.75L7 234.875 36.105 78z"
                    // fill="#262626"
                    fill="#00FFFF"
                />
            </G>
            <Defs />
        </Svg>
    );
}
