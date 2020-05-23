import AntDesign from 'react-native-vector-icons/AntDesign'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import * as React from 'react'
import { HOME } from '../../utils/icon'
import CommonStyles from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'
import { IProduct } from '../../stores/object/product.object'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
interface IProps {
  badgeCount: number;
  icon: ImageSourcePropType;
  iconFocus: ImageSourcePropType;
  focused: boolean;
  name: string;
}
export default ({ badgeCount, icon, iconFocus, focused, name }: IProps) => {
  const badge: number = useSelector((state: RootState) => state.cart.badge)
  switch (name) {
    case 'cart':
      badgeCount = badge
      break

    default:
      badgeCount = 0
      break
  }

  return (
    <View
      style={{
        marginTop: moderateScale(10),
      }}
    >
      <Image
        style={CommonStyles.iconSize}
        source={focused ? iconFocus : icon}
      />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  )
}
