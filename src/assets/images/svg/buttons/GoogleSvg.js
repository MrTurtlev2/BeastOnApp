import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

function GoogleSvg(props) {
    return (
        <Svg width={50} height={50} viewBox="10 10 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <G clipPath="url(#clip0_710_6221)">
                <Path
                    d="M29.6 20.227c0-.709-.064-1.39-.182-2.045H20v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
                    fill="#4285F4"
                />
                <Path
                    d="M20 30c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123h-3.341v2.59A9.996 9.996 0 0020 30z"
                    fill="#34A853"
                />
                <Path
                    d="M14.405 21.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9v-2.59h-3.341A9.997 9.997 0 0010 20c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
                    fill="#FBBC04"
                />
                <Path
                    d="M20 13.977c1.468 0 2.786.505 3.823 1.496l2.868-2.869C24.959 10.992 22.695 10 20 10c-3.91 0-7.29 2.24-8.936 5.51l3.34 2.59c.787-2.364 2.991-4.123 5.596-4.123z"
                    fill="#E94235"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_710_6221">
                    <Path fill="#fff" transform="translate(10 10)" d="M0 0H20V20H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export default GoogleSvg;
