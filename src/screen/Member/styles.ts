import { StyleSheet } from 'react-native'
import { CommonVariables } from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: CommonVariables.whiteColor,
    alignItems: 'center',
    paddingVertical: moderateScale(15),
  },
  member: {
    color: '#4D4D4D',
    fontFamily: CommonVariables.fonts.OPENSANS_LIGHT,
  },
  tableHead: {
    backgroundColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    zIndex: 999,
  },
  tableHeadRow: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  separate: {
    height: moderateScale(30),
    width: 1,
    backgroundColor: '#C4C4C4',
  },
  textHeaderRow: {
    textAlign: 'center',
    color: '#545454',
  },
})

export default styles
