import React from 'react';
import { View, ScrollView, Text, Image, FlatList, Touchable, TouchableOpacity } from 'react-native';

import { IconButton, TextButton, HorizontalCourseCard, LineDivider, IconLabel, Section } from '../../../components';

import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../constants';

const CourseChapters = () => {
    
    function renderHeader () {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.padding,
                    marginBottom: SIZES.radius
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h2,
                        color: COLORS.black
                    }}
                >
                    { dummyData.course_details.title }
                </Text>

                {/* Students / Duration */}
                <View
                    style={{
                        marginTop: SIZES.base,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.gray40
                        }}
                    >
                        { dummyData.course_details.number_of_students }
                    </Text>
                    <IconLabel
                        icon={icons.time}
                        iconStyle={{ width: 15, height: 15 }}
                        label={ dummyData.course_details.duration }
                        labelStyle={{
                            ...FONTS.body3,
                            color: COLORS.gray40
                        }}
                    />
                </View>

                {/* Instructor */}
                <View
                    style={{
                        marginTop: SIZES.radius,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        {/* Photo */}
                        <Image
                            source={ dummyData.course_details.instructor.image }
                            resizeMode='cover'
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                borderWidth: 1,
                                borderColor: COLORS.gray40,
                            }}
                        />

                        {/* User Title */}
                        <View
                            style={{
                                marginLeft: SIZES.base,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.black
                                }}
                            >
                                { dummyData.course_details.instructor.name }
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.body5,
                                    color: COLORS.gray40
                                }}
                            >
                                { dummyData.course_details.instructor.title }
                            </Text>
                        </View>
                    </View>
                    {/* Follow btn */}
                    <TextButton
                        label='Follow +'
                        labelStyle={{
                            color: COLORS.white
                        }}
                        containerStyle={{
                            backgroundColor: COLORS.primary,
                            height: 30
                        }}
                    />

                </View>
            </View>
        )
    }

    function renderChapter () {
        return (
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                { dummyData?.course_details?.videos.map((item, index) => {
                    return (
                        <View
                            key={`Videos-${index}`}
                            style={{
                                paddingVertical: SIZES.radius,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: item.is_playing ? COLORS.additionalColor11 : null,
                                justifyContent: 'space-between',
                            }}
                        >

                            {/* Title & Duration */}
                            <View
                                style={{
                                    paddingHorizontal: SIZES.padding,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => console.log(item.is_complete)}
                                >
                                    <Image
                                        source={ item.is_complete ? icons.completed : item.is_playing ? icons.play_1 : item.is_lock && icons.lock }
                                        style={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />
                                </TouchableOpacity>
                                <View
                                    style={{
                                        marginLeft: SIZES.base,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.body3,
                                            color: COLORS.black
                                        }}
                                    >
                                        { item.title }
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.body5,
                                            marginLeft: 17,
                                            color: COLORS.gray40
                                        }}
                                    >
                                        { item.duration }
                                    </Text>
                                </View>
                            </View>

                            {/* Download staus and size */}
                            <View 
                                style={{ 
                                    alignItems: 'flex-end',
                                    paddingHorizontal: SIZES.padding,
                                }}>
                                <TouchableOpacity
                                    onPress={() => console.log(item.is_complete)}
                                >
                                    <Image
                                        source={ item.is_downloaded ? icons.completed : icons.download }
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: item.is_lock ? COLORS.gray40 : item.is_downloaded ? COLORS.primary : COLORS.black
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        ...FONTS.body5,
                                        color: COLORS.gray40
                                    }}
                                >
                                    { item.size }
                                </Text>
                            </View>

                            {/* Progress bar */}
                            { item?.is_playing &&
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        height: 5,
                                        width: item.progress,
                                        backgroundColor: COLORS.primary,
                                        borderRadius: SIZES.radius
                                    }}
                                >

                                </View>
                            }

                        </View>
                    )
                }) }
            </View>
        )
    }
    
    function renderPopularCourses () {
        return (
            <Section
                title="Popular Courses"
                containerStyle={{
                    marginTop: SIZES.padding
                }}
                buttonStyle={{
                    height: 30
                }}
            >
                { dummyData.courses_list_2.map((item, index) => {
                    return (
                        <View
                            key={`PopularCourse-${index}`}
                        >
                            <HorizontalCourseCard
                                course={item}
                                continerStyle={{
                                    paddingHorizontal: SIZES.padding
                                }}
                            />
                            <LineDivider/>
                        </View>
                    )
                }) }
            </Section>
        )
    }
    
    return (
        <ScrollView>
            {/* Header */}
            { renderHeader() }

            {/* Line divider */}
            <LineDivider />

            {/* Chapters */}
            { renderChapter() }

            {/* Popular courses */}
            { renderPopularCourses() }

        </ScrollView>
    )
}

export default CourseChapters;