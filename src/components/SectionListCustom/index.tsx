import React, { Component } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
} from 'react-native'
export interface IPartThree {
  index: number;
  title: string;
  data: string[];
}
interface IProps {
  section: any[];
  renderSectionHeader:
    | ((info: {
        section: SectionListData<any>,
      }) => React.ReactElement<any> | null)
    | undefined;
  renderItem: SectionListRenderItem<any> | undefined;
}
class SectionListCustom extends Component<IProps> {
  render() {
    return (
      <SectionList
        showsVerticalScrollIndicator={false}
        renderItem={this.props.renderItem}
        renderSectionHeader={this.props.renderSectionHeader}
        sections={this.props.section}
        keyExtractor={(item, index) => item + index}
      />
    )
  }
}

export default SectionListCustom
