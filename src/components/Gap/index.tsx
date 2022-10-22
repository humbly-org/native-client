import flattenChildren from 'react-keyed-flatten-children';
import {View, ViewStyle} from 'react-native';
import React, {Children} from 'react';

type Props = {
  gap?: number;
  direction?: 'vertical' | 'horizontal';
  style?: ViewStyle;
  flex?: number;
  divider?: React.ReactNode;
  children: React.ReactNode;
};

export function Gap({
  gap = 4,
  direction = 'vertical',
  style,
  flex = direction == 'horizontal' ? 1 : undefined,
  divider,
  children,
}: Props) {
  const kids = flattenChildren(children);
  const flexDirection = direction == 'vertical' ? 'column' : 'row';

  const styleKey = direction == 'vertical' ? 'height' : 'width';

  return (
    <View style={[{flexDirection}, style]}>
      {Children.map(kids, (child, index) => {
        return (
          <>
            {index > 0 ? divider || <View style={{[styleKey]: gap}} /> : null}
            <View style={{flex}}>{child}</View>
          </>
        );
      })}
    </View>
  );
}
