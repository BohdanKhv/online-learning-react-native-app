import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Keyboard, TouchableOpacity, Touchable } from 'react-native';
import Video from 'react-native-video';

import { IconButton, LineDivider } from '../../components';
import { CourseChapters, CourseFiles, CourseDiscussions } from '..';
import { COLORS, FONTS, SIZES, icons, dummyData, constants, } from '../../constants';

const course_details_tabs = constants.course_details_tabs.map(
    (course_details_tab) => ({
        ...course_details_tab,
        ref: React.createRef()
    }))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = course_details_tabs.map((_, i) => i * SIZES.width)

    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    })

    const stranslateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                bottom: 0,
                height: 4,
                width: tabIndicatorWidth,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                transform: [{
                    translateX: stranslateX
                }]
            }}
        />
    )
}

const Tabs = ({ scrollX, onTabPress }) => {

    const [measureLayout, setMeasureLayout] = React.useState([])
    const containerRef = React.useRef()

    React.useEffect(() => {
        let ml = []

        course_details_tabs.forEach(course_details_tab => {
            course_details_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    console.log({x, y, width, height})
                    ml.push({
                        x, y, width, height
                    })

                    if(ml.length === course_details_tabs.length) {
                        setMeasureLayout(ml)
                    }
                })
            })
    }, [containerRef.current])

    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
                flexDirection: 'row'
            }}
        >

            {/* Tab Indicator */}
            {console.log(measureLayout.length)}
            { measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} /> }

            {/* Tabs */}
            { course_details_tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`Tab-${index}`}
                        ref={item.ref}
                        onPress={ () => 
                            {
                                Keyboard.dismiss()
                                onTabPress(index)
                            }
                        }
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 15,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h3,
                                fontSize: SIZES.height > 800 ? 18 : 17,
                                color: COLORS.black
                            }}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )
            }) }

        </View>
    )
}

const CourseDetails = ({ navigation, route }) => {
    const { course } = route.params;
    const [playVideo, setPlayVideo] = React.useState(false);
    const [rotate, setRotate] = React.useState(false);

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current

    const styles = StyleSheet.create({
        videoRotateMode: {
            position: 'absolute',
            // elevation: 2,
            zIndex: 2,
            backgroundColor: 'transparent',
            width: '100%'
        }
    })

    const onTabPress = React.useCallback(tabIntex => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIntex * SIZES.width
        })
    })

    function renderHeaderConponents () {
        return (
            <>
                {/* Back */}
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.black
                        }}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.white
                        }}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                {/* Share & Favorite */}
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <IconButton
                        icon={icons.media}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setRotate(!rotate)}
                    />
                    <IconButton
                        icon={icons.favourite_outline}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </View>
            </>
        )
    }

    function renderHeader () {
        if(playVideo) {
            return (
                <View
                    style={[{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: SIZES.base,
                        height: 90,
                        backgroundColor: COLORS.primary,
                        alignItems: 'flex-end',
                    }, rotate && styles.videoRotateMode]}
                >
                    {renderHeaderConponents()}
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        position: 'absolute',
                        top: SIZES.height > 800 ? 60 : 40,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        zIndex: 1
                    }}
                >
                    {renderHeaderConponents()}
                </View>
            )
        }
    }

    function renderVideoSection () {
        return (
            <View
                style={{
                    height: rotate ? '100%' : SIZES.height > 800 ? 240: 220,
                    // paddingTop: 40,
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.gray90
                }}
            >
                {/* Thumbnail */}
                <ImageBackground
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    source={course.thumbnail}
                >
                    {/* play button */}
                    <IconButton
                        containerStyle={{
                            width: 55,
                            height: 55,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.primary,
                            borderRadius: 30,
                            marginTop: SIZES.padding
                        }}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                        icon={icons.play}
                        onPress={() => setPlayVideo(true)}
                    />

                    {playVideo && 
                        <Video
                            source={{ uri: dummyData?.sample_video_url[0] }}
                            controls={true}
                            preventsDisplaySleepDuringVideoPlayback={true}
                            fullscreen={rotate}
                            fullscreenAutorotate
                            fullscreenOrientation='landscape'
                            resizeMode={rotate ? 'cover' : 'contain'}
                            headers={true}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                backgroundColor: COLORS.black,
                                zIndex: 1
                            }}
                        />
                    }
                </ImageBackground>
            </View>
        )
    }

    function renderContent () {
        return (
            <View
                style={{
                    flex: 1
                }}
            >

                {/* Tabs */}
                <View
                    style={{
                        height: 60,
                    }}
                >
                    <Tabs
                        scrollX={scrollX}
                        onTabPress={onTabPress}
                    />
                </View>

                {/* Line divider */}
                <LineDivider/>

                {/* Content */}
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment={'center'}
                    snapToInterval={SIZES.width}
                    decelerationRate={'fast'}
                    keyboardDismissMode='on-drag'
                    showsHorizontalScrollIndicator={false}
                    data={constants.course_details_tabs}
                    keyExtractor={item => `CourseDetailTabs-${item.id}`}
                    onScroll={
                        Animated.event([
                            {nativeEvent: {contentOffset: {x: scrollX}}}
                        ], {
                            useNativeDriver: false
                        })
                    }
                    renderItem={({item, index}) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width
                                }}
                            >
                                {index == 0 && <CourseChapters />}
                                {index == 1 && <CourseFiles />}
                                {index == 2 && <CourseDiscussions />}
                            </View>
                        )
                    }}
                />

            </View>
        )
    }

    return (
        <View 
            style={{
                flex: 1, backgroundColor: COLORS.white,
            }} >

                {/* Header */}
                { renderHeader() }

                {/* Video */}
                { renderVideoSection() }

                {/* Content */}
                { renderContent() }

        </View>
    )
}

export default CourseDetails;