import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function GraphSvg(props) {
    return (
        <Svg width={47} height={47} viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.625 1.958H1.958v15.667h15.667V11.75h3.917v27.417h7.833v5.875h15.667V29.375H29.375v5.875h-3.917v-23.5h3.917v5.875h15.667V1.958H29.375v5.875h-11.75V1.958zm23.5 3.917h-7.833v7.833h7.833V5.875zm-7.833 27.417h7.833v7.833h-7.833v-7.833z"
                fill="#F2F2F2"
            />
        </Svg>
    );
}

export default GraphSvg;
