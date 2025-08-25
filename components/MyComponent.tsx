import { View, Text } from 'tamagui';
import { useWindowDimensions } from 'react-native';
import { GAP, PAGE_PADDING, SAFE_FUDGE } from '../constants/layout';

type Props = {
  item: string;
};

const MyComponent = ({ item }: Props) => {
  const { width: windowWidth } = useWindowDimensions();
  const availableWidth = windowWidth - PAGE_PADDING * 2 - GAP;
  const slotWidth = Math.floor(availableWidth / 2) - SAFE_FUDGE;
  const smallWidth = slotWidth;
  const largeWidth = slotWidth * 2 + GAP;

  return (
    <View p="$5" bg="$blue6" height={170} width={Number(item) % 6 === 0 ? largeWidth : smallWidth} collapsable={false}>
      <Text fontSize={22}>{item}</Text>
    </View>
  );
};

export default MyComponent;
