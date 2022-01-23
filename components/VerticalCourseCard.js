import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FONTS, SIZES, COLORS, icons } from '../constants';


import { IconLabel } from './';

const VerticalCourseCard = ({ onPress, containerStyle, course }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                width: 270,
                ...containerStyle
            }}
            onPress={onPress}
        >

            {/* Thumbnail */}
            <Image
                source={course.thumbnail}
                resizeMode='cover'
                style={{
                    width: '100%',
                    height: 150,
                    marginBottom: SIZES.radius,
                    borderRadius: SIZES.radius,
                }}
            />

            {/* Detail */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                
                {/* Play */}
                <View
                    style={{
                        backgroundColor: COLORS.primary,
                        borderRadius: 30,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={icons.play}
                        resizeMode='contain'
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}
                    />
                </View>

                {/* Title | Time Duration */}
                <View
                    style={{
                        flexShrink: 1, // no overflow for text
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h3,
                            color: COLORS.black,
                            fontWeight: 'bold',
                        }}
                    >
                        { course.title }
                    </Text>

                    <IconLabel 
                        icon={icons.time}
                        label={course.duration} 
                        containerStyle={{
                            marginTop: SIZES.base
                        }}
                    />
                </View>

            </View>

        </TouchableOpacity>
    )
}

export default VerticalCourseCard;