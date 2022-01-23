import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { color, interpolate, useAnimatedStyle, withDelay, withTiming } from 'react-native-reanimated';

import { TextButton, LineDivider, TwoPointSlider } from '.';
import { COLORS, constants, FONTS, icons, SIZES } from '../constants';

const ClassTypeOption = ({ containerStyle, classType, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
                ...containerStyle
            }}
        >
            <Image
                source={classType.icon}
                resizeMode='contain'
                style={{
                    width: 40,
                    height: 40,
                    tintColor: isSelected ? COLORS.white : COLORS.gray80, 
                }}
            />
            <Text
                style={{
                    marginTop: SIZES.radius,
                    ...FONTS.h3,
                    color: isSelected ? COLORS.white : COLORS.gray80, 
                }}
            >
                { classType.label }
            </Text>
        </TouchableOpacity>
    )
}

const ClassLevelOption = ({ containerStyle, classLevel, isSelected, onPress }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flex: 1,
                    marginBottom: SIZES.base,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    ...containerStyle,
                }}
            >
                <Text
                    style={{
                        color: isSelected ? COLORS.black : COLORS.gray50,
                        ...FONTS.body3
                    }}
                >
                    {classLevel.label}
                </Text>
                <Image
                    style={{
                        width: 25,
                        height: 25
                    }}
                    source={isSelected ? icons.checkbox_on : icons.checkbox_off}
                />
            </TouchableOpacity>
            <LineDivider
                lineStyle={{
                    backgroundColor: isSelected ? COLORS.black : COLORS.gray20,
                }}
            />
        </View>
    )
}

const FilterModel = ({ filterModelSharedValue1, filterModelSharedValue2 }) => {

    const [selectedClassType, setSelectedClassType] = React.useState('')
    const [selectedClassLevel, setSelectedClassLevel] = React.useState('')
    const [selectedCreatedWithin, setSelectedCreatedWithin] = React.useState('')
    const [selectedLength, setSelectedLength] = React.useState('')

    const filterModelContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModelSharedValue1.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModelSharedValue1.value
                }
            ]
        }
    })

    const filterModelBgAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModelSharedValue2.value, [SIZES.height, 0], [0, 1])
        }
    })

    const filterModelContentAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModelSharedValue2.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModelSharedValue2.value
                }
            ]
        }
    })

    function renderFooter () {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    marginBottom: 30,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <TextButton 
                    label='Reset'
                    labelStyle={{
                        color: COLORS.primary3,
                        ...FONTS.h3
                    }}
                    containerStyle={{
                        flex: 1,
                        backgroundColor: null,
                        borderRadius: SIZES.radius,
                        borderWidth: 1,
                        borderColor: COLORS.primary3,
                        marginRight: SIZES.base,
                    }}
                />
                <TextButton 
                    label='Apply'
                    labelStyle={{
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                    containerStyle={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius,
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        marginLeft: SIZES.base,
                    }}
                />
            </View>
        )
    }

    return (

        // Main container
        <Animated.View
            style={[{
                position: 'absolute',
                bottom: 0,
                height: '100%',
                width: SIZES.width,
            }, filterModelContainerAnimatedStyle]}
        >
            
            {/* Backgroud container */}
            <Animated.View
                style={[{
                    flex: 1,
                    height: '100%',
                    width: SIZES.width,
                    backgroundColor: COLORS.transparentBlack7
                }, filterModelBgAnimatedStyle]}
            >

                {/* Content Container */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        height: '90%',
                        width: SIZES.width,
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: SIZES.radius,
                        borderTopRightRadius: SIZES.radius,
                        bottom: 0,
                    }, filterModelContentAnimatedStyle]}
                >

                    {/* Header */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <View
                            style={{
                                width: 60
                            }}
                        />
                        <Text
                            style={{
                                flex: 1,
                                color: COLORS.black,
                                textAlign: 'center',
                                ...FONTS.h1
                            }}
                        >
                            Filter
                        </Text>
                        <TextButton
                            label='close'
                            containerStyle={{
                                width: 60,
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            onPress={() => {
                                filterModelSharedValue2.value = withTiming( SIZES.height, { duration: 500 } )
                                filterModelSharedValue1.value = withDelay(500, withTiming( SIZES.height, { duration: 100 } ))
                            }}
                        />
                    </View>

                    {/* Content */}
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: SIZES.padding,
                            paddingBottom: 50
                        }}
                    >

                        {/* Class type */}
                        <View
                            style={{
                                marginVertical: SIZES.radius,
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.black,
                                    ...FONTS.h3,
                                    fontWeight: 'bold'
                                }}
                            >
                                Class Type
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius
                                }}
                            >
                                {constants.class_types.map((item, index) => {
                                    return (
                                        <ClassTypeOption 
                                            key={`KeyType-${index}`} 
                                            classType={item}
                                            isSelected={selectedClassType == item?.id}
                                            containerStyle={{
                                                marginLeft: index == 0 ? 0 : SIZES.base,
                                            }}
                                            onPress={() => setSelectedClassType(item?.id)}
                                        />
                                    )
                                })}
                            </View>
                        </View>

                        {/* Class Level */}
                        <View
                            style={{
                                marginVertical: SIZES.radius,
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.black,
                                    ...FONTS.h3,
                                    fontWeight: 'bold'
                                }}
                            >
                                Class Level
                            </Text>
                            <View
                                style={{
                                    marginTop: SIZES.radius
                                }}
                            >
                                {constants.class_types.map((item, index) => {
                                    return (
                                        <ClassLevelOption 
                                            key={`KeyLevel-${index}`} 
                                            classLevel={item}
                                            isSelected={selectedClassLevel == item?.id}
                                            containerStyle={{
                                                marginTop: index == 0 ? 0 : SIZES.padding,
                                            }}
                                            onPress={() => setSelectedClassLevel(item?.id)}
                                        />
                                    )
                                })}
                            </View>
                        </View>

                        {/* Created Within */}
                        <View
                            style={{
                                marginVertical: SIZES.radius
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.black,
                                    ...FONTS.h3,
                                    fontWeight: 'bold'
                                }}
                            >
                                Created Within
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    marginTop: SIZES.radius
                                }}
                            >
                                { constants.created_within.map((item, index) => {
                                    return (
                                        <TextButton 
                                            key={`KeyCreated-${index}`}
                                            label={item?.label}
                                            onPress={() => setSelectedCreatedWithin(item?.id)}
                                            containerStyle={{
                                                paddingHorizontal: SIZES.radius,
                                                marginLeft: index % 3 == 0 ? 0 : SIZES.base,
                                                marginTop: index < 3 ? 0 : SIZES.base,
                                                backgroundColor: selectedCreatedWithin == item?.id ? COLORS.primary3 : COLORS.additionalColor9
                                            }}
                                            labelStyle={{
                                                color: selectedCreatedWithin == item?.id ? COLORS.white : COLORS.gray80
                                            }}
                                        />
                                    )
                                }) }
                            </View>
                        </View>

                        {/* Class length */}
                        <View
                            style={{
                                marginTop: SIZES.radius
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.black,
                                    ...FONTS.h3,
                                    fontWeight: 'bold'
                                }}
                            >
                                Class Length
                            </Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                }}
                            >
                                <TwoPointSlider
                                    values={[20, 50]}
                                    min={15}
                                    max={60}
                                    postfix="m"
                                    onValuesChange={(values) => console.log(values)}
                                />
                            </View>
                        </View>

                    </ScrollView>

                    {/* Footer */}
                    { renderFooter() }

                </Animated.View>

            </Animated.View>

        </Animated.View>

    )
}

export default FilterModel;