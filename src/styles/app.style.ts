import { moderateScale } from './common.variables';

const AppStyle = {
    Color: {
        Background: '#ECEEF4',
        DarkBlue: "#12326D",
        NightBlue: "#1F4AA5",
        LightBlue: "#425D86",
        Blue: '#5485F5',
        Gray: '#A0A8B9',
        Green: '#4F9F46',
        Red: '#E2655F',

    },
    Text: {
        Large: moderateScale(18),
        Medium: moderateScale(15),
        Normal: moderateScale(13),
        Small: moderateScale(11)
    },
    backButtonHeader: {
        marginLeft: 10,
        backgroundColor: '#E6E5E5',
        width: moderateScale(30), height: moderateScale(30),
        borderRadius: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    }
}

export default AppStyle;