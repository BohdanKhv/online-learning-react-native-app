import * as settingsActionsTypes from "./settingsActions";
import { selectedTheme } from '../../constants/theme';

const initialState = {
    appTheme: selectedTheme,
    error: null
}

const settingsReducer = ( state = initialState, action ) => {
    switch (action.type){
        case settingsActionsTypes.TOGGLE_THEME_BEGIN:
            return {
                ...state,
                error: null
            }
        case settingsActionsTypes.TOGGLE_THEME_SUCCESS:
            return {
                ...state,
                appTheme: action.payload.selectedTheme
            }
        case settingsActionsTypes.TOGGLE_THEME_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default settingsReducer;