import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RetrySvg(props) {
    return (
        <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3.072A20 20 0 0136.25 8.34V4.375a1.875 1.875 0 113.75 0V15H29.375a1.875 1.875 0 110-3.75h4.318a16.25 16.25 0 00-29.458 4.81 1.875 1.875 0 11-3.638-.91A20 20 0 0118.297.075L18.3.072zm-8.5 37.13A20 20 0 0039.4 24.85a1.875 1.875 0 00-3.637-.91 16.25 16.25 0 01-29.455 4.81h4.317a1.875 1.875 0 100-3.75H0v10.625a1.875 1.875 0 003.75 0V31.66a20 20 0 006.05 5.542z"
                fill="#F2F2F2"
            />
        </Svg>
    );
}

export default RetrySvg;
