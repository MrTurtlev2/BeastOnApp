import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function KebabMenuSvg(props) {
    return (
        <Svg width={10} height={36} viewBox="0 0 10 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Circle cx={5} cy={5} r={5} fill="#FFFFFF" />
            <Circle cx={5} cy={18} r={5} fill="#FFFFFF" />
            <Circle cx={5} cy={31} r={5} fill="#FFFFFF" />
        </Svg>
    );
}

export default KebabMenuSvg;
