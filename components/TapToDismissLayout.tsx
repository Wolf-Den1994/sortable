import { useMemo, type PropsWithChildren } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

type Props = PropsWithChildren & {
  onTapEnd?: () => void;
};

const TapToDismissLayout = ({ children, onTapEnd }: Props) => {
  const tapToDismiss = useMemo(() => {
    return Gesture.Tap()
      .maxDistance(20)
      .cancelsTouchesInView(false)
      .onEnd(() => {
        if (onTapEnd) {
          runOnJS(onTapEnd)();
        }
      });
  }, [onTapEnd]);

  return <GestureDetector gesture={tapToDismiss}>{children}</GestureDetector>;
};

export default TapToDismissLayout;
