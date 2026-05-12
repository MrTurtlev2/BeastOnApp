import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ListSvg(props) {
    return (
        <Svg width={52} height={47} viewBox="0 0 52 47" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M44.333 4.667H7A2.333 2.333 0 004.667 7v32.667A2.333 2.333 0 007 42h37.333a2.333 2.333 0 002.334-2.333V7a2.334 2.334 0 00-2.334-2.333zM7 0a7 7 0 00-7 7v32.667a7 7 0 007 7h37.333a7 7 0 007-7V7a7 7 0 00-7-7H7zm4.667 11.667h4.666v4.666h-4.666v-4.666zm11.666 0a2.333 2.333 0 100 4.666h14a2.333 2.333 0 100-4.666h-14zm-7 9.333h-4.666v4.667h4.666V21zM21 23.333A2.333 2.333 0 0123.333 21h14a2.333 2.333 0 110 4.667h-14A2.333 2.333 0 0121 23.333zm-4.667 7h-4.666V35h4.666v-4.667zM21 32.667a2.333 2.333 0 012.333-2.334h14a2.333 2.333 0 010 4.667h-14A2.333 2.333 0 0121 32.667z"
                fill="#F2F2F2"
            />
        </Svg>
    );
}

export default ListSvg;
