import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const IconLabelButton = ({ icon, label, iconStyle, containerStyle, labelStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // paddingVertical: SIZES.base,
                // paddingHorizontal: SIZES.radius,
                ...containerStyle
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.black,
                    ...iconStyle
                }}
            />
            <Text
                style={{
                    marginLeft: SIZES.base,
                    color: COLORS.black,
                    ...FONTS.body5,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default IconLabelButton;