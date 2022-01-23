import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, SIZES, icons } from '../constants';

import { IconLabel } from '.'; 

const HorizontalCourseCard = ({ course, continerStyle, onPress }) => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                flexDirection: 'row',
                marginVertical: SIZES.padding,
                ...continerStyle
            }}
        >

            {/* Image */}
            <ImageBackground
                source={course.thumbnail}
                style={{
                    height: 120,
                    width: 120,
                    alignItems: 'flex-end'
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <TouchableOpacity
                    onPress={() => console.log(`Add to favorite ${course.title}`)}
                    style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 5,
                        marginRight: 5
                    }}
                >
                    <Image
                        resizeMode='contain'
                        source={icons.favourite}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: course.is_favourite ? COLORS.secondary : COLORS.gray40
                        }}
                    />
                </TouchableOpacity>
            </ImageBackground>

            {/* Detail */}
            <TouchableOpacity
                onPress={() => {navigation.navigate("CourseDetails", {course: course})}}
                style={{
                    marginLeft: SIZES.base,
                    flexShrink: 1,
                    justifyContent: 'space-between'
                }}
            >

                {/* Title */}
                <Text
                    style={{
                        color: COLORS.black,
                        fontWeight: 'bold',
                        ...FONTS.h3,
                    }}
                >
                    { course.title }
                </Text>

                {/* Instructor | duration */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.gray50,
                            ...FONTS.body4,
                            flexShrink: 1
                        }}
                    >
                        By { course.instructor }
                    </Text>
                    <IconLabel
                        icon={icons.time}
                        iconStyle={{
                            width: 15,
                            height: 15
                        }}
                        label={course.duration}
                        labelStyle={{
                            ...FONTS.body4
                        }}
                    />
                </View>

                {/* Price | rating */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            ...FONTS.h2,
                            fontWeight: 'bold'
                        }}
                    >
                        {`$${course.price}`}
                    </Text>
                    <IconLabel
                        icon={icons.star}
                        iconStyle={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.primary2
                        }}
                        label={course.ratings}
                        labelStyle={{
                            ...FONTS.h3,
                            color: COLORS.black,
                            fontWeight: 'bold'
                        }}
                    />
                </View>

            </TouchableOpacity>

        </View>
    )
}

export default HorizontalCourseCard;