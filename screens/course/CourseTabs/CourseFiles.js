import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';

import { COLORS, FONTS, SIZES, icons, dummyData } from '../../../constants';
import { IconButton, TextButton } from '../../../components';

const CourseFiles = () => {

    function renderStudents () {

        let students = []

        if(dummyData?.course_details?.students.length > 3){
            students = dummyData?.course_details?.students.slice(0, 3)
        } else {
            students = dummyData?.course_details?.students
        }

        return (
            <View>
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h2,
                        color: COLORS.black
                    }}
                >
                    Students
                </Text>
                {/* Student */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center',
                    }}
                >
                    { students.map((item, index) => {
                        return (
                            <View
                                key={`Students-${index}`}
                                style={{
                                    marginLeft: index > 0 ? SIZES.radius : 0
                                }}
                            >
                                <Image
                                    source={item.thumbnail}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: SIZES.radius,
                                    }}
                                />
                            </View>
                        )
                    }) }
                    { dummyData?.course_details?.students.length > 3 &&
                        <TextButton
                            label="View All"
                            labelStyle={{
                                ...FONTS.h3,
                                color: COLORS.primary,
                            }}
                            containerStyle={{
                                width: 80,
                                height: 80,
                                marginLeft: SIZES.base
                            }}
                        />
                    }
                </View>
            </View>
        )
    }

    function renderFiles () {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >

                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h2,
                        color: COLORS.black
                    }}
                >
                    Files
                </Text>

                {/* Files */}
                { dummyData.course_details.files.map((item, index) => {
                    return (
                        <View
                            key={`Files-${index}`}
                            style={{
                                flexDirection: 'row',
                                marginTop: SIZES.padding,
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                {/* File Image */}
                                <Image
                                    source={item.thumbnail}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: SIZES.radius
                                    }}
                                />
                                {/* File Title \ info */}
                                <View
                                    style={{
                                        marginLeft: SIZES.base
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.h3,
                                            color: COLORS.black
                                        }}
                                    >
                                        { item.name }
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.body5,
                                            color: COLORS.gray40
                                        }}
                                    >
                                        { item.author }
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.body5,
                                            color: COLORS.black
                                        }}
                                    >
                                        { item.upload_date }
                                    </Text>
                                </View>
                            </View>
                            {/* Share btn */}
                            <IconButton
                                icon={icons.menu}
                                iconStyle={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.black
                                }}
                            />
                        </View>
                    )
                }) }

            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                padding: SIZES.padding
            }}
        >
            {/* Students */}
            { renderStudents() }

            {/* Files */}
            { renderFiles() }

        </ScrollView>
    )
}

export default CourseFiles;