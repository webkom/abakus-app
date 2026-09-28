import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { useResolveClassNames } from 'uniwind';
import * as React from 'react';

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
} & React.RefAttributes<LucideIcon>;

/**
 * A wrapper component for Lucide icons with Uniwind `className` support.
 *
 * @component
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@/components/ui/icon';
 *
 * <Icon as={ArrowRight} className="text-red-500" size={16} />
 * ```
 */
function Icon({ as: IconComponent, className, size = 14, color, ...props }: IconProps) {
  const textClass = React.useContext(TextClassContext);
  const resolvedStyles = useResolveClassNames(cn('text-foreground', textClass, className));

  const resolvedColor = color ?? (resolvedStyles as { color?: string } | undefined)?.color;

  return <IconComponent size={size} color={resolvedColor} style={resolvedStyles} {...props} />;
}

export { Icon };
