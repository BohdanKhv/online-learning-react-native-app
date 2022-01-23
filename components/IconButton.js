import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import {COLORS} from '../constants';

const IconButton = ({ containerStyle, onPress, iconStyle, icon }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...containerStyle
            }}
        >
            <Image
                resizeMode='contain'
                style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.black,
                    ...iconStyle
                }}
                source={icon}
            />
        </TouchableOpacity>
    )
}

export default IconButton;