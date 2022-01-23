import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';

import { IconButton, TextButton, LineDivider, ProgressBar, ProfileValue, ProfileRadioBtn } from '../../components';

import { COLORS, FONTS, SIZES, icons, images, dummyData } from '../../constants';

import { connect } from 'react-redux';
import { toggleTheme } from '../../store/settings/settingsActions';

const Profile = ({ toggleTheme, appTheme }) => {

    const [newCourseNotification, setNewCourseNotification] = React.useState(dummyData.user.courseNotifications);
    const [studyReminder, setStudyReminder] = React.useState(dummyData.user.reminder);

    const styles = StyleSheet.create({
        profileContainer: {
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            backgroundColor: appTheme.backgroundColor1,
            paddingHorizontal: SIZES.padding,
            borderWidth: 1,
            borderRadius: SIZES.radius,
            borderColor: COLORS.gray20,
            elevation: 7,
        }
    })

    function toggleThemeOnPress () {
        if(appTheme.name == 'light') {
            return toggleTheme('dark');
        } else {
            return toggleTheme('light');
        }
    }

    function renderHeader() {
        return (
            <View
                style={{
                    marginTop: 50,
                    paddingHorizontal: SIZES.padding,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: appTheme.textColor,
                        ...FONTS.h1,
                        fontWeight: 'bold'
                    }}
                >
                    Profile
                </Text>
                <IconButton
                    onPress={() => toggleThemeOnPress() }
                    icon={icons.sun}
                    iconStyle={{
                        width: 40,
                        height: 40,
                        tintColor: appTheme.textColor2,
                    }}
                />
            </View>
        )
    }

    function renderProfileCard () {
        return (
            <View
                style={{
                    marginHorizontal: SIZES.padding,
                    // width: '100%',
                    marginTop: SIZES.padding,
                    backgroundColor: COLORS.primary3,
                    borderRadius: SIZES.radius,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: SIZES.padding,
                    elevation: 7,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >

                    {/* Profile image */}
                    <TouchableOpacity 
                        onPress={() => console.log("Profile image")}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    >
                        <Image
                            source={{uri: 'http://spaceguy.org/img/my_photo.jpg'}}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 50,
                                borderWidth: 1,
                                borderColor: COLORS.white
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <View
                                style={{
                                    width: 30,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 15,
                                    backgroundColor: COLORS.primary,
                                    marginBottom: -15
                                }}
                            >
                                <Image
                                    source={icons.camera}
                                    resizeMode='contain'
                                    style={{
                                        width: 15,
                                        height: 15
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Profile info */}
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            marginLeft: SIZES.radius,
                            flexShrink: 1
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.h2,
                                fontWeight: 'bold'
                            }}
                        >
                            {dummyData.user.username}
                        </Text>
                        <Text
                            style={{
                                paddingVertical: SIZES.base,
                                color: COLORS.white,
                                ...FONTS.body4,
                            }}
                        >
                            {dummyData.user.position}
                        </Text>
                        <ProgressBar
                            progress={dummyData.user.progress}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body4
                                }}
                            >
                                Overall progress: 
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body4
                                }}
                            >
                                {dummyData.user.progress}
                            </Text>
                        </View>
                        {/* Join button */}
                        <TextButton
                            onPress={() => console.log('become member')}
                            containerStyle={{
                                marginTop: SIZES.radius,
                                backgroundColor: appTheme.backgroundColor4
                            }}
                            labelStyle={{
                                color: appTheme.textColor,
                                ...FONTS.h3,
                            }}
                            label='+ Become Member'
                        />
                    </View>

                </View>
            </View>
        )
    }

    function renderProfileSection1 () {
        return (
            <View
                style={styles.profileContainer}
            >

                <ProfileValue
                    appTheme={appTheme}
                    onPress={() => console.log(`Profile value Name`)}
                    label={"Name"}
                    value={dummyData.user.username}
                    icon={icons.profile}
                />

                <LineDivider />

                <ProfileValue
                    appTheme={appTheme}
                    onPress={() => console.log(`Profile value Email`)}
                    label={"Email"}
                    value={dummyData.user.email}
                    icon={icons.email}
                />

                <LineDivider />

                <ProfileValue
                    appTheme={appTheme}
                    onPress={() => console.log(`Profile value Password`)}
                    label={"Password"}
                    value={'Updated 2 weeks ago'}
                    icon={icons.password}
                />

                <LineDivider />

                <ProfileValue
                    appTheme={appTheme}
                    onPress={() => console.log(`Profile value Phone Number`)}
                    label={"Phone Number"}
                    value={dummyData.user.phoneNumber}
                    icon={icons.call}
                />

            </View>
        )
    }

    function renderProfileSection2 () {
        return (
            <View
                style={styles.profileContainer}
            >

                <ProfileValue
                    appTheme={appTheme}
                    onPress={() => console.log(`Pages`)}
                    value={'Pages'}
                    icon={icons.star_1}
                />

                <LineDivider />

                <ProfileRadioBtn
                    appTheme={appTheme}
                    icon={icons.new_icon}
                    label='New Course Notification'
                    isSelected={newCourseNotification}
                    onPress={() => setNewCourseNotification(!newCourseNotification)}
                />

                <LineDivider />

                <ProfileRadioBtn
                    appTheme={appTheme}
                    icon={icons.time}
                    label='Study Reminder'
                    isSelected={studyReminder}
                    onPress={() => setStudyReminder(!studyReminder)}
                />

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appTheme.backgroundColor1
            }}
        >
            {/* Header */}
            {renderHeader()}

            <ScrollView
                style={{
                    paddingBottom: 280,
                    // paddingHorizontal: SIZES.padding
                }}
            >

                {/* Profile card */}
                { renderProfileCard() }

                {/* Profile section 1 */}
                { renderProfileSection1() }

                {/* Profile section 2 */}
                { renderProfileSection2() }

                <View
                    style={{
                        paddingBottom: "40%",
                    }}
                >

                </View>

            </ScrollView>
        </View>
    )
}

function mapStateToProps (state) {
    return {
        appTheme: state.settingsReducer.appTheme
    }
}

function mapDispatchToProps (dispatch) {
    return {
        toggleTheme: (themeType) => {
            return dispatch(toggleTheme(themeType))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);