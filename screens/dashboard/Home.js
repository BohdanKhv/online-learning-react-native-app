import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { IconButton, TextButton, VerticalCourseCard, LineDivider, CategoryCard, Section, HorizontalCourseCard } from '../../components';

import { COLORS, FONTS, SIZES, dummyData, images,icons } from '../../constants';

const Home = () => {
    const navigation = useNavigation();

    function renderHeader () {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 50,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                {/* Text */}
                <View>
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.h2,
                            fontWeight: 'bold',
                        }}
                    >
                        {`Hello, ${dummyData.user.name}!`}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.gray50,
                            ...FONTS.body3
                        }}
                    >
                        {new Date().toDateString()}
                    </Text>
                </View>

                {/* Notafication */}
                <IconButton 
                    onPress={() => console.log("Notafication")}
                    icon={icons.notification}
                />
            </View>
        )
    }

    function startLearning () {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    padding: 15,
                }}
                imageStyle={{
                    borderRadius: SIZES.radius,
                }}
            >

                {/* Info */}
                <View>
                    <Text
                        style={{
                            ...FONTS.body2,
                            color: COLORS.white
                        }}
                    >
                        {dummyData.post[0].small_title}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.white
                        }}
                    >
                        {dummyData.post[0].title}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginTop: SIZES.radius,
                            color: COLORS.white,
                            textAlign: 'right'
                        }}
                    >
                        By {dummyData.post[0].author}
                    </Text>
                </View>
                
                {/* Image */}
                <Image 
                    source={dummyData.post[0].thumbnail}
                    style={{
                        height: 110,
                        width: '100%',
                        marginTop: SIZES.padding
                    }}
                />
                
                {/* Button */}
                <TextButton
                    onPress={() => console.log(`Start Learning`)}
                    label={'Start Learning'}
                />

            </ImageBackground>
        )
    }

    function renderCourses () {
        return (
            <FlatList
                horizontal
                data={dummyData.courses_list_1}
                listKey="Courses"
                keyExtractor={item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                renderItem={ ({ item, index }) => (

                    <VerticalCourseCard 
                        containerStyle={{
                            marginLeft: index === 0 ? SIZES.padding : SIZES.radius, // if first item, then give more margin
                            marginRight: index == dummyData?.courses_list_1.length -1 ? SIZES.padding : 0, // if last item, then give more margin
                        }}
                        course={item}
                    />
                    
                )}
            />
        )
    }

    function renderCategories () {
        return (
            <Section
                title="Categories"
                onPress={() => console.log('See All Categories')}
            >
                <FlatList
                    horizontal
                    data={dummyData.categories}
                    listKey='Categories'
                    keyExtractor={item => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                    }}
                    renderItem={({item, index}) => (
                        <CategoryCard
                            sharedElementPrefix="Home"
                            onPress={() => navigation.navigate("CourseListing", {category: item, sharedElementPrefix: 'Home'})}
                            containerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                                marginRight: dummyData.categories.length - 1 === index ? SIZES.padding : 0
                            }}
                            category={item}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderPopularCourses () {
        return (
            <Section
                title='Popular Courses'
                onPress={() => console.log('See All Popular Courses')}
                containerStyle={{
                    marginTop: SIZES.padding
                }}
            >
                <FlatList
                    data={dummyData.courses_list_2}
                    listKey='PopularCourses'
                    keyExtractor={item => `PopularCourses-${item.id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        // marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                    renderItem={({item, index}) => (
                        <HorizontalCourseCard
                            onPress={() => console.log(item.title)}
                            course={item}
                        />
                    )}
                    ItemSeparatorComponent={() => {
                        return (
                            <LineDivider />
                        )
                    }}
                />
            </Section>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >

            {/* Header */}
            { renderHeader() }

            {/* Content */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: "30%"
                }}
                showsVerticalScrollIndicator={false}
            >

                {/* start learning */}
                { startLearning() }

                {/* Courses */}
                { renderCourses() }

                <LineDivider
                    lineStyle={{
                        marginVertical: SIZES.padding
                    }}
                />

                {/* Categories */}
                { renderCategories() }

                {/* Popular Courses */}
                { renderPopularCourses() }

            </ScrollView>

        </View>
    )
}

export default Home;