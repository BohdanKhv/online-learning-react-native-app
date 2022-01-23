import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const ProfileRadioBtn = ({ label, icon, appTheme, isSelected, onPress }) => {

    const radioAnimated = React.useRef(new Animated.Value(0)).current;

    const circleColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 20],
        outputRange: [COLORS.gray40, COLORS.primary]
    }) 

    const lineColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 20],
        outputRange: [COLORS.gray40, COLORS.primary]
    }) 

    React.useEffect(() => {
        if(isSelected) {
            Animated.timing(radioAnimated, {
                toValue: 20,
                duration: 300,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }, [isSelected])

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                height: 80,
                alignItems: 'center'
            }}
        >

            {/* Icon */}
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.primary
                }}
            />

            {/* Label */}
            <View
                style={{
                    marginLeft: SIZES.padding,
                    width: '72%'
                }}
            >
                <Text
                    style={{
                        color: appTheme.textColor,
                        ...FONTS.h3,
                        flexShrink: 1,
                    }}
                >
                    {label}
                </Text>
            </View>

            {/* Radio btn */}
            <View
                style={{
                    width: 45,
                    flexShrink: 1,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Animated.View
                    style={{
                        width: '100%',
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: lineColorAnimated
                    }}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        left: radioAnimated,
                        width: 20,
                        height: 20,
                        borderWidth: 4,
                        borderColor: circleColorAnimated,
                        borderRadius: 15,
                        backgroundColor: COLORS.white
                    }}
                />
            </View>

        </TouchableOpacity>
    )

}

export default ProfileRadioBtn;