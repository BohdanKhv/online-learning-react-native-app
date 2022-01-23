import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const TextButton = ({ containerStyle, label, labelStyle, onPress, disabled }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={{
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: SIZES.base,
                height: 40,
                ...containerStyle
            }}
        >
            <Text
                style={{
                    color: COLORS.black,
                    ...FONTS.h3,
                    textAlign: 'center',
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton;