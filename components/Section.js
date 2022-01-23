import React from 'react';
import { View, Text } from 'react-native';

import { TextButton } from './';
import { COLORS, SIZES, FONTS } from '../constants';

const Section = ({ containerStyle, title, buttonStyle, onPress, children }) => {
    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        color: COLORS.black,
                        ...FONTS.h2,
                        fontWeight: 'bold',
                    }}
                >
                    {title}
                </Text>
                <TextButton
                    containerStyle={{
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius,
                        width: 80,
                        ...buttonStyle
                    }}
                    labelStyle={{
                        color: COLORS.white,
                        fontSize: 17
                    }}
                    label='See All'
                    onPress={onPress}
                />
            </View>
            {children}
        </View>
    )
}

export default Section;