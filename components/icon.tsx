import { HomeIcon, icons } from 'lucide-react-native';
import { withUniwind } from 'uniwind';
import React, { ComponentProps, memo } from 'react';

type IconName = keyof typeof icons;

/**
 * The HomeIcon component is used since an arbitrary component has to be used to
 * extract all props associated with a lucide icon component. It does not matter
 * what component is used for this purpose. It could just as well had been
 * PencilIcon or something else.
 */
type IconProps = { name: IconName; className?: string } & ComponentProps<typeof HomeIcon>;

const iconCache = new Map<IconName, React.ComponentType<any>>();

function getStyledIcon(name: IconName) {
  let Styled = iconCache.get(name);
  if (!Styled) {
    // eslint-disable-next-line import/namespace
    const IconComponent = icons[name];
    Styled = withUniwind(IconComponent as unknown as React.ComponentType<any>, {
      color: {
        fromClassName: 'className',
        styleProperty: 'color',
      },
      style: {
        fromClassName: 'className',
      },
    });
    iconCache.set(name, Styled);
  }
  return Styled;
}

/**
 * Use this component to apply color stylings such as `text-on-primary` to lucide icons.
 * @example ```
    <Icon name="HouseIcon" size={20} className="text-on-primary" />
 ```
 */
const Icon: React.FC<IconProps> = memo(({ name, className, ...props }) => {
  const CustomIcon = getStyledIcon(name);
  return <CustomIcon className={className} {...props} />;
});

export default Icon;
