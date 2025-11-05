import { HomeIcon, icons } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { ComponentProps, memo, useMemo } from 'react';

type IconName = keyof typeof icons;

/**
 * The HomeIcon component is used since an arbitrary component has to be used to
 * extract all props associated with a lucide icon component. It does not matter
 * what component is used for this purpose. It could just as well had been
 * PencilIcon or something else.
 */
type IconProps = { name: IconName; className?: string } & ComponentProps<typeof HomeIcon>;

/**
 * Use this component to apply nativewind color stylings such as `text-on-primary` to lucide icons.
 * @example ```
    <Icon name="HouseIcon" size={20} className="text-on-primary" />
 ```
 */
const Icon: React.FC<IconProps> = memo(({ name, className, ...props }) => {
  const CustomIcon = useMemo(() => {
    // eslint-disable-next-line import/namespace
    const Icon = icons[name];
    Icon.displayName = name;

    return cssInterop(Icon, {
      className: {
        target: 'style',
        nativeStyleToProp: {
          color: true,
          width: true,
          height: true,
        },
      },
    });
  }, [name]);

  return <CustomIcon className={className} {...props} />;
});

export default Icon;
