import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Share, BackHandler } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, runOnJS, withDelay } from "react-native-reanimated";

import { IconButton, HorizontalCourseCard, LideDivider, LineDivider, FilterModel } from '../../components';
import { COLORS, SIZES, icons, images, dummyData, FONTS } from '../../constants';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 250;

const CourseListig = ({ navigation, route }) => {

    const { category, sharedElementPrefix } = route.params;

    const flatListRef = React.useRef();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y
        // console.log(event.contentOffset.y)
    })

    const headerSharedValue = useSharedValue(80);
    const filterModelSharedValue1 = useSharedValue(SIZES.height)
    const filterModelSharedValue2 = useSharedValue(SIZES.height)

    // Handler section

    function backHandler () {
        navigation.goBack();
    }

    // render section

    function renderHeader () {

        const inputRange = [0, HEADER_HEIGHT - 50];

        headerSharedValue.value = withDelay(500, withTiming(0, {duration: 500}))

        const headerFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1])
            }
        })

        const headerSlideAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: headerSharedValue.value
                    }
                ]
            }
        })

        const headerHeightAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 125], Extrapolate.CLAMP)
            }
        })

        const headerHeightOnScroll = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
                transform: [{
                    translateY: interpolate(scrollY.value, inputRange, [0, 200], Extrapolate.CLAMP)
                }]
            }
        })

        const headerTitleOnScroll = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
                transform: [{
                    translateY: interpolate(scrollY.value, inputRange, [50, 140], Extrapolate.CLAMP)
                }]
            }
        })

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    overflow: 'hidden',
                }, headerHeightAnimatedStyle]}
            >

                {/* Backgroud image */}
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={category?.thumbnail}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: '100%',
                            borderBottomLeftRadius: 60
                        }}
                    />
                </SharedElement>

                {/* Title */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        top: -80,
                        left: 0,
                        right: 0
                    }, headerTitleOnScroll]}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                            textAlign: 'center'
                        }}
                    >{category?.title}</Text>
                </Animated.View>

                <Animated.View
                    style={[{
                        position: 'absolute',
                        bottom: 50,
                        left: 30,
                    }, headerHeightOnScroll]}
                >
                    <SharedElement
                        id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text
                            style={{
                                position: 'absolute',
                                ...FONTS.h1,
                                color: COLORS.white,
                            }}
                        >
                            {category?.title}
                        </Text>
                    </SharedElement>
                </Animated.View>

                {/* Back button */}
                <Animated.View
                    style={headerFadeAnimatedStyle}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            tintColor: COLORS.black,
                        }}
                        containerStyle={{
                            position: 'absolute',
                            top: 50,
                            left: 20,
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: COLORS.white
                        }}
                        onPress={() => { 

                            if(scrollY.value >= 0 && scrollY.value < 200) {
                                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
                                setTimeout(() => {
                                    headerSharedValue.value = withTiming(
                                        80, { 
                                            duration: 500 
                                        }, () => {
                                        runOnJS(backHandler)();
                                    } )
                                }, 100)

                            } else {
                                backHandler();
                            }

                            // backHandler()
                        }}
                    />
                </Animated.View>

                {/* Category Image */}
                <Animated.Image
                    source={images.mobile_image}
                    resizeMode={'contain'}
                    style={[{
                        position: 'absolute',
                        bottom: -40,
                        right: 40,
                        width: 100,
                        height: 200,
                    }, headerFadeAnimatedStyle, headerSlideAnimatedStyle, headerHeightOnScroll]}
                />

            </Animated.View>
        )
    }

    function renderResults () {
        return (
            <AnimatedFlatList
                ref={flatListRef}
                data={dummyData.courses_list_2}
                keyExtractor={item => `Results-${item.id}`}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode={'on-drag'}
                onScroll={onScroll}
                // onScrollEndDrag={(event) => {
                //     if(event.nativeEvent.contentOffset.y > 0 && event.nativeEvent.contentOffset.y <= 50) {
                //         flatListRef.current?.scrollToOffset({
                //             offset: 0,
                //             animated: true
                //         })
                //     }
                //     if(event.nativeEvent.contentOffset.y > 50 && event.nativeEvent.contentOffset.y <= 200) {
                //         flatListRef.current?.scrollToOffset({
                //             offset: 200,
                //             animated: true
                //         })
                //     }
                // }}
                ListHeaderComponent={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 270,
                            marginBottom: SIZES.base
                        }}
                    >

                        {/* Results */}
                        <Text
                            style={{
                                color: COLORS.black,
                                ...FONTS.body3,
                                flex: 1
                            }}
                        >
                            248 Results
                        </Text>

                        {/* Filter Button */}
                        <IconButton
                            icon={icons.filter}
                            iconStyle={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white
                            }}
                            containerStyle={{
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={() => {
                                filterModelSharedValue1.value = withTiming( 0, { duration: 100 } )
                                filterModelSharedValue2.value = withDelay( 100, withTiming( 0, { duration: 500 } ))
                            }}
                        />
                        
                    </View>
                }
                renderItem={({item, index}) => {
                    return (
                        <HorizontalCourseCard
                            course={item}
                            onPress={() => navigation.navigate("CourseDetails", {course: item, sharedElementPrefix})}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index == 0 ? SIZES.radius : SIZES.padding
                            }}
                        />
                    )
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <LineDivider />
                    )
                }}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >

            {/* Render Results */}
            { renderResults() }

            {/* Header */}
            { renderHeader() }

            {/* Filter Model */}
            <FilterModel 
                filterModelSharedValue1={filterModelSharedValue1}
                filterModelSharedValue2={filterModelSharedValue2}
            />
        
        </View>
    )
}

CourseListig.sharedElements = (route, otherRoute, showing) => {
    if ( otherRoute.name === 'Dashboard' ) {
        const {category, sharedElementPrefix} = route.params;
        return [
            {
                id: `${sharedElementPrefix}-CategoryCard-Bg-${category.id}`,
            },
            {
                id: `${sharedElementPrefix}-CategoryCard-Title-${category.id}`,
            }
        ]
    }
}

export default CourseListig;