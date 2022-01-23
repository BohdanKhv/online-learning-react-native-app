import React from 'react';
import { View } from 'react-native';

import { COLORS } from '../constants';

const LiveDivider = ({ lineStyle }) => {
    return (
        <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: COLORS.gray20,
                ...lineStyle
            }}
        >

        </View>
    )
}

export default LiveDivider;