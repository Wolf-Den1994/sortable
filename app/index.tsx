import { YStack } from 'tamagui';
import { useCallback, useEffect, useState } from 'react';
import Sortable, { type SortableFlexDragEndParams } from 'react-native-sortables';
import Animated, { useAnimatedRef, SlideOutUp, SlideInUp } from 'react-native-reanimated';
import { mock } from '../constants/mock';
import MyComponent from '../components/MyComponent';
import { PAGE_PADDING } from '../constants/layout';
import TapToDismissLayout from '../components/TapToDismissLayout';
import StyledContextMenu from '../components/StyledContextMenu';

export default function TabOneScreen() {
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
    <TapToDismissLayout>
      <YStack flex={1} items="center" gap="$8" p={PAGE_PADDING} bg="$accent7">
        <Animated.ScrollView
          ref={scrollableRef}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
        >
          <Sortable.Flex
            gap={10}
            justifyContent="space-between"
            sortEnabled={true}
            dragActivationDelay={600}
            scrollableRef={scrollableRef}
            enableActiveItemSnap={false}
            onDragEnd={handleDragEnd}
            hapticsEnabled
            itemEntering={SlideInUp.duration(200)}
            itemExiting={SlideOutUp.duration(200)}
          >
            {data.map((item) => (
              <TapToDismissLayout key={item}>
                <StyledContextMenu>
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
