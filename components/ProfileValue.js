import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { COLORS, SIZES, FONTS, icons } from '../constants';

const ProfileValue = ({ label, appTheme, value, icon, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 80,
                justifyContent: 'space-between',
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.primary
                    }}
                />
                <View
                    style={{
                        marginLeft: SIZES.padding,
                        width: '80%'
                    }}
                >
                    {label &&
                        <Text
                            style={{
                                color: COLORS.gray50,
                                ...FONTS.body4,
                            }}
                        >
                            {label}
                        </Text>
                    }
                    <Text
                        style={{
                            color: appTheme.textColor,
                            ...FONTS.h3,
                            flexShrink: 1,
                            
                        }}
                    >
                        {value}
                    </Text>
                </View>
            </View>
            <Image
                source={icons.right_arrow}
                resizeMode='contain'
                style={{
                    width: 15,
                    height: 15,
                    tintColor: appTheme.textColor
                }}
            />
        </TouchableOpacity>
    )
}

export default ProfileValue;