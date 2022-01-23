import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';

import { COLORS, SIZES, FONTS } from '../constants';

const CategoryCard = ({ sharedElementPrefix, category, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 200,
                height: 150,
                ...containerStyle
            }}
        >
            {/* Image backgroud */}
            <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category.id}`}
                style={[ StyleSheet.absoluteFillObject ]}
            >
                <Image
                    source={category.thumbnail}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: SIZES.radius
                    }}
                />
            </SharedElement>

            {/* Title */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 40,
                    left: 15,
                }}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                    style={[ StyleSheet.absoluteFillObject ]}
                >
                    <Text
                        style={{
                            ...FONTS.h2,
                            position: 'absolute',
                            color: COLORS.white,
                        }}
                    >
                        {category.title}
                    </Text>
                </SharedElement>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard;