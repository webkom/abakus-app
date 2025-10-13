import { cn } from '@/lib/cn';
import { ComponentProps } from 'react';
import { Text, View } from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

const cardVariants = tv({
  base: 'rounded-3xl p-7 flex flex-col gap-2.5',
  defaultVariants: {
    variant: 'primary',
  },
  variants: {
    variant: {
      primary: 'bg-primary-container',
      secondary: 'bg-secondary-container',
    },
  },
});

const titleVariants = tv({
  base: 'text-2xl font-semibold',
  defaultVariants: {
    variant: 'primary',
  },
  variants: {
    variant: {
      primary: 'text-on-primary-container',
      secondary: 'text-on-secondary-container',
    },
  },
});

type CardProps = {
  title?: string;
} & ComponentProps<typeof View> &
  VariantProps<typeof cardVariants>;
const Card = ({ title, className, children, variant, ...props }: CardProps) => {
  return (
    <View className={cn(cardVariants({ variant }), className)} {...props}>
      <Text className={cn(titleVariants({ variant }))}>{title}</Text>
      {children}
    </View>
  );
};

export default Card;
