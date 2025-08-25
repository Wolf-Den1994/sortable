import * as ContextMenu from 'zeego/context-menu';
import type { PropsWithChildren, CSSProperties } from 'react';

const itemHeight = 25;

const contextStyles: Record<string, CSSProperties> = {
  content: {
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff8',
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    // animationKeyframes: {
    //   '0%': { opacity: 0, transform: [{ scale: 0.5 }] },
    //   '100%': { opacity: 1, transform: [{ scale: 1 }] },
    // },
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'System',
    transformOrigin: 'var(--radix-context-menu-content-transform-origin)',
    // no animations here yet, since I don't know how to style based on data-side attributes
  },
  item: {
    borderRadius: 3,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: itemHeight,
    height: itemHeight,
    transformOrigin: 'var(--radix-dropdown-menu-item-transform-origin)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    font: '14px system-ui',
    // flexDirection: 'row',
    outline: 'none',
  },
};

type Props = {
  onDragStart?: () => void;
} & PropsWithChildren;

const StyledContextMenu = ({ children, onDragStart }: Props) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content style={contextStyles.content}>
        <ContextMenu.Preview>{children}</ContextMenu.Preview>

        <ContextMenu.Item
          style={contextStyles.item}
          onSelect={() => {
            console.log('add');
          }}
          key="favorite"
        >
          <ContextMenu.ItemIcon ios={{ name: 'star' }} androidIconName="star" />
          <ContextMenu.ItemTitle>Add to favorite</ContextMenu.ItemTitle>
        </ContextMenu.Item>

        <ContextMenu.Item style={contextStyles.item} onSelect={onDragStart} key="drag">
          <ContextMenu.ItemTitle>Reorder</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

export default StyledContextMenu;
