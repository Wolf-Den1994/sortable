import { YStack, Text } from 'tamagui';
import { useCallback, useEffect, useState } from 'react';
import Sortable, { type SortableFlexDragEndParams } from 'react-native-sortables';
import Animated, { useAnimatedRef, SlideOutUp, SlideInUp } from 'react-native-reanimated';
import { mock } from '../constants/mock';
import MyComponent from '../components/MyComponent';
import { PAGE_PADDING } from '../constants/layout';
import TapToDismissLayout from '../components/TapToDismissLayout';
import StyledContextMenu from '../components/StyledContextMenu';

const delay = 300;

export default function TabOneScreen() {
  const [dragEnable, setDragEnable] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [sortedDataIds, setSortedDataIds] = useState<number[]>([]);
  const scrollableRef = useAnimatedRef<Animated.ScrollView>();

  const handleDragEnd = useCallback(
    (params: SortableFlexDragEndParams) => {
      const newIds = params.order(sortedDataIds);
      setSortedDataIds(newIds);
    },
    [sortedDataIds],
  );

  useEffect(() => {
    setData(mock);
  }, []);

  return (
    <TapToDismissLayout onTapEnd={() => setDragEnable(false)}>
      <YStack flex={1} items="center" gap={10} p={PAGE_PADDING} bg="$accent7">
        <Text color="$red6">dragEnable: {dragEnable ? 'true' : 'false'}</Text>
        <Text color="$red6">delay: {delay}</Text>
        <Animated.ScrollView
          ref={scrollableRef}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
        >
          <Sortable.Flex
            gap={10}
            justifyContent="space-between"
            sortEnabled={dragEnable}
            dragActivationDelay={delay}
            scrollableRef={scrollableRef}
            enableActiveItemSnap={false}
            onDragEnd={handleDragEnd}
            hapticsEnabled
            itemEntering={SlideInUp.duration(200)}
            itemExiting={SlideOutUp.duration(200)}
          >
            {data.map((item) => (
              <TapToDismissLayout key={item} onTapEnd={() => setDragEnable(false)}>
                <StyledContextMenu onDragStart={() => setDragEnable(true)} dragEnable={dragEnable}>
                  <MyComponent item={item} />
                </StyledContextMenu>
              </TapToDismissLayout>
            ))}
          </Sortable.Flex>
        </Animated.ScrollView>
      </YStack>
    </TapToDismissLayout>
  );
}
