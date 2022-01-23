import React from 'react';
import { View, Text, TextInput, Keyboard, FlatList, Image } from 'react-native';

import { COLORS, SIZES, icons, dummyData, FONTS } from '../../../constants';
import { IconButton, IconLabelButton } from '../../../components';

const CommentSection = ({ commentItem, commentOption, replies }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
            }}
        >
            {/* Profile */}
            <Image
                source={ commentItem?.profile }
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: COLORS.gray40
                }}
            />
            {/* Name, comment */}
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.base,
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.black
                    }}
                >
                    {commentItem?.name}
                </Text>
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.black
                    }}
                >
                    {commentItem?.comment}
                </Text>

                {/* Comments Options */}
                { commentOption }

                {/* Reply section */}
                { replies }
            </View>
        </View>
    )
}

const CourseDiscussions = () => {

    const [footerPos, setFooterPos] = React.useState(0)
    const [footerHeight, setFooterHeight] = React.useState(60)

    React.useEffect(() => {

        // Listen to keyboard
        const showSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
            setFooterPos(e.endCoordinates.height)
        })

        const hideSubscription = Keyboard.addListener('keyboardWillHide', (e) => {
            setFooterPos(0)
        })

        return () => {
            showSubscription.remove(),
            hideSubscription.remove()
        }

    }, [])
    
    function renderDiscussions () {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <FlatList
                    data={dummyData?.course_details?.discussions}
                    keyExtractor={item => `Discussions-main-${item.id}`}
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: 70
                    }}
                    renderItem={({item, index}) => {
                        return (
                            <CommentSection 
                                commentItem={item}
                                commentOption={
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: SIZES.base,
                                            paddingBottom: SIZES.base,
                                            // borderTopWidth: .5,
                                            borderBottomWidth: .5,
                                            justifyContent: "space-between",
                                            borderColor: COLORS.gray20 
                                        }}
                                    >
                                        {/* Comments */}
                                        <IconLabelButton
                                            icon={icons.comment}
                                            label={item?.no_of_comments}
                                        />

                                        {/* Like */}
                                        <IconLabelButton
                                            icon={icons.heart}
                                            iconStyle={{
                                                tintColor: COLORS.secondary
                                            }}
                                            label={item?.no_of_likes}
                                        />

                                        {/* Date */}
                                        <Text
                                            style={{
                                                color: COLORS.black,
                                                ...FONTS.body5
                                            }}
                                        >
                                            {item?.posted_on}
                                        </Text>

                                    </View>
                                }
                                replies={
                                    <FlatList
                                        data={item?.replies}
                                        scrollEnabled={false}
                                        keyExtractor={item => `Discussions-Replies-${item.id}`}
                                        renderItem={({ item, index }) => (
                                            <CommentSection
                                                commentItem={item}
                                                commentOption={
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            marginTop: SIZES.base,
                                                            paddingBottom: SIZES.base,
                                                            // borderTopWidth: .5,
                                                            borderBottomWidth: .5,
                                                            justifyContent: "space-between",
                                                            borderColor: COLORS.gray20 
                                                        }}
                                                    >
                                                        {/* Comments */}
                                                        <IconLabelButton
                                                            icon={icons.reply}
                                                            label='Reply'
                                                        />
                
                                                        {/* Like */}
                                                        <IconLabelButton
                                                            icon={icons.heart_off}
                                                            iconStyle={{
                                                                tintColor: COLORS.secondary
                                                            }}
                                                            label='Like'
                                                        />
                
                                                        {/* Date */}
                                                        <Text
                                                            style={{
                                                                color: COLORS.black,
                                                                ...FONTS.body5
                                                            }}
                                                        >
                                                            {item?.posted_on}
                                                        </Text>
                
                                                    </View>
                                                }
                                            />
                                        )}
                                    />
                                }
                            />
                        )
                    }}
                />
            </View>
        )
    }

    function renderFooter () {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: footerPos,
                    left: 0,
                    right: 0,
                    height: footerHeight,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius,
                    borderColor: COLORS.gray40,
                    borderTopWidth: .5,
                    backgroundColor: COLORS.additionalColor9,
                }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        marginRight: SIZES.base,
                        ...SIZES.body3,
                        color: COLORS.black
                    }}
                    multiline={true}
                    placeholder='Type Something . . .'
                    placeholderTextColor={COLORS.gray80}
                    onContentSizeChange={(event) => {
                        const height = event.nativeEvent.contentSize.height

                        if(height <= 60) {
                            setFooterHeight(60)
                        } else if(height > 60 && height <= 100) {
                            setFooterHeight(height)
                        } else if (height > 100) {
                            setFooterHeight(100)
                        }
                    }}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <IconButton
                        icon={icons.send}
                        iconStyle={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.primary
                        }}
                    />
                </View>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Discussions */}
            { renderDiscussions() }

            {/* footer */}
            { renderFooter() }
        </View>
    )
}

export default CourseDiscussions;