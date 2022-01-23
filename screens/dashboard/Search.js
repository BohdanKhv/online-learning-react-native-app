import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { COLORS, SIZES, FONTS, icons, dummyData } from '../../constants';
import { TextButton, CategoryCard } from '../../components';
import { useNavigation } from '@react-navigation/native';


const Search = ({  }) => {
    const navigation = useNavigation();

    const searchInput = React.useRef();
    const scrollViewRef = React.useRef();

    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y
    })

    function renderTopSearches () {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h1,
                        fontWeight: 'bold',
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    Top Searches
                </Text>

                <FlatList
                    horizontal
                    data={dummyData.top_searches}
                    listKey='TopSearches'
                    keyExtractor={item => `TopSearches-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({item, index}) => (
                        <TextButton
                            key={index}
                            onPress={() => console.log(`Top Search ${item.label}`)}
                            containerStyle={{
                                paddingHorizontal: SIZES.padding,
                                paddingVertical: SIZES.radius,
                                backgroundColor: COLORS.gray10,
                                height: 45,
                                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                borderRadius: SIZES.radius,
                            }}
                            labelStyle={{
                                color: COLORS.gray50,
                                ...FONTS.h3
                            }}
                            label={item.label}
                        />
                    )}
                />
            </View>
        )
    }

    function renderBrowseCategories () {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2,
                        fontWeight: 'bold'
                    }}
                >
                    Browse Categories
                </Text>
                <FlatList
                    data={dummyData.categories}
                    keyExtractor={item => `BrowseCategories-${item.id}`}
                    listKey='BrowseCategories'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    numColumns={2}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({item, index}) => (
                        <CategoryCard
                            sharedElementPrefix="Search"
                            key={index}
                            onPress={() => navigation?.navigate("CourseListing", {category: item, sharedElementPrefix: "Search"})}
                            containerStyle={{
                                height: 130,
                                width: (SIZES.width - ( SIZES.padding * 2 ) - SIZES.radius) / 2,
                                marginTop: SIZES.radius,
                                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding
                            }}
                            category={item}
                        />
                    )}
                />
            </View>
        )
    }

    function  renderSearchBar () {

        const inputRange = [0, 55]
        
        const searchBarAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [55, 0], Extrapolate.CLAMP),
                top: interpolate(scrollY.value, inputRange, [50, -55], Extrapolate.CLAMP),
                opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolate.CLAMP)
            }
        })
        
        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    height: 55,
                    right: 0,
                    paddingHorizontal: SIZES.padding,
                }, searchBarAnimatedStyle]}
            >
                <TouchableOpacity
                    onPress={() => searchInput.current.focus()}
                    style={{
                        // elevation: 5,
                        borderWidth: 0.5,
                        borderColor: COLORS.gray50,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: SIZES.width - (SIZES.padding * 2),
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                    }}
                >

                    <Image
                        resizeMode='contain'
                        source={icons.search}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.gray50
                        }}
                    />
                    <TextInput 
                        ref={searchInput}
                        placeholder='Search for Topics, Courses & Educators'
                        placeholderTextColor={COLORS.gray50}
                        // value=''
                        style={{
                            flexShrink: 1,
                            width: '100%',
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                    />
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >

            {/* Search */}
            {/* { renderSearch() } */}

            {/* Top Searches */}

            {/* Browse */}
            <Animated.ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    marginTop: 100,
                    paddingBottom: 300,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode={'on-drag'}
                onScroll={onScroll}
                onScrollEndDrag={(event) => {
                    if(event.nativeEvent.contentOffset.y > 10 && event.nativeEvent.contentOffset.y < 50) {
                        scrollViewRef.current?.scrollTo({
                            x: 0,
                            y: 80,
                            animated: true
                        })
                        console.log('end onScrollEndDrag to bottom')
                    }
                    if(event.nativeEvent.contentOffset.y < 10) {
                        scrollViewRef.current?.scrollTo({
                            x: 0,
                            y: 0,
                            animated: true
                        })
                        console.log('end onScrollEndDrag to top')
                    }
                }}
            >

                {/* Top Searches */}
                { renderTopSearches() }

                {/* Browse Categories */}
                { renderBrowseCategories() }

            </Animated.ScrollView>

            {/* Search */}
            { renderSearchBar() }

        </View>
    )
}

export default Search;