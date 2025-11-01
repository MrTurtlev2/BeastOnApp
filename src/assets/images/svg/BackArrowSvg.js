import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackArrowSvg(props) {
    return (
        <Svg width={28} height={23} viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="M2.121 8.56l-1.06 1.061L0 8.561 1.06 7.5l1.061 1.06zm25.5 12a1.5 1.5 0 11-3 0h3zm-19.06-3.439l-7.5-7.5L3.18 7.5l7.5 7.5-2.12 2.121zM1.06 7.5L8.56 0l2.12 2.121-7.5 7.5L1.061 7.5zm1.06-.44h15v3h-15v-3zm25.5 10.5v3h-3v-3h3zm-10.5-10.5a10.5 10.5 0 0110.5 10.5h-3a7.5 7.5 0 00-7.5-7.5v-3z"
                fill="#FD4F6F"
            />
        </Svg>
    );
}

export default BackArrowSvg;
