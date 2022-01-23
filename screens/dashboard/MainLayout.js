import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';

import { StatusBar } from 'react-native';

import { connect } from 'react-redux';

import { Home, Profile, Search } from '../../screens';
import { COLORS, SIZES, icons, FONTS, constants } from '../../constants';

const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
    ...bottom_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = bottom_tabs.map((_, i) => i * SIZES.width );

    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                height: "100%",
                width: tabIndicatorWidth,
                transform: [{ translateX }],
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary
            }}
        />
    )
}

const Tabs = ({ scrollX, onBottomTabPress }) => {

    const containerRef = React.useRef();
    const [measureLayout, setMeasureLayout] = React.useState([]);

    React.useEffect(() => {
        let ml = []
        
        bottom_tabs.forEach(bottom_tab => {
            bottom_tab?.ref?.current?.measureLayout(
                containerRef.current,
                ( x, y, width, height ) => {
                    ml.push( { x, y, width, height } )

                    if( ml.length === bottom_tabs.length ) {
                        setMeasureLayout(ml);
                    }
                }
            )
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
            {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX}/>}
            {/* Tabs */}
            { bottom_tabs.map((item, index) => {
                return (
                    <TouchableOpacity 
                    key={`BottomTab-${index}`}
                    ref={item.ref}
                    onPress={() => onBottomTabPress(index)}
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        /> 
                        <Text
                            style={{
                                marginTop: 3,
                                color: COLORS.white,
                                ...FONTS.h3
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

const MainLayout = ({ appTheme }) => {

    const flatListRef = React.useRef();
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onBottomTabPress = React.useCallback(bottomTabIndex => {
        flatListRef?.current?.scrollToOffset({
            offset: bottomTabIndex * SIZES.width
        })
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.white,
        },
        contentContainer: {
            flex: 1,
            // backgroundColor: COLORS.black,
            // bottom: -60
        }
    });

    function renderContent () {
        return (
            <View style={styles.contentContainer}>
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    scrollEnabled={false} // no scrolling
                    showsHorizontalScrollIndicator={false}
                    data={ constants.bottom_tabs }
                    keyExtractor={item => `Main-${item.id}` }
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: {x: scrollX} } }
                        ], {
                            useNativeDriver: false
                        })
                    }
                    renderItem={({item, index}) => {
                        return (
                            // <View style={{ width: SIZES.width, height: SIZES.height }}>
                            <View style={{ width: SIZES.width, height: '100%' }}>
                                { item.label == constants.screens.home && <Home /> }
                                { item.label == constants.screens.search && <Search /> }
                                { item.label == constants.screens.profile && <Profile /> }
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    function renderBottomTab () {
        return (
            <View
                style={{
                    position: 'absolute', // remove if dont need tab bar to be transparent
                    paddingBottom: SIZES.padding,
                    bottom: 0, // remove if dont need tab bar to be transparent
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius,
                    // backgroundColor: COLORS.transparentBlack1 // remove if dont need tab bar to be transparent
                }}
            >
                <View
                    style={{ height: 85, width: SIZES.width - SIZES.padding * 2 }} // shadow container
                >
                    <View
                        style={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary3, 
                            elevation: 7, 
                            shadowColor: COLORS.black
                        }}
                    >
                        <Tabs
                            scrollX={scrollX}
                            onBottomTabPress={onBottomTabPress}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle={appTheme.name == "light" ? "dark-content" : "light-content"}
            />
            
            {/* Content */}
            { renderContent() }

            {/* Bottom Tab Bar */}
            { renderBottomTab() }

        </View>
    )
}

function mapStateToProps (state) {
    return {
        appTheme: state.settingsReducer.appTheme
    }
}


export default connect(mapStateToProps, null) (MainLayout);