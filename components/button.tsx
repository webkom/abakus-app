import { cn } from '@/lib/cn';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { ClassNameValue } from 'tailwind-merge';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'rounded-lg px-5 py-4 flex items-center flex-row gap-2.5 justify-center',
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
  variants: {
    size: {
      md: '',
      lg: 'rounded-xl px-10 h-20',
    },
    variant: {
      primary: 'bg-primary text-on-primary',
      secondary: 'bg-secondary text-on-secondary',
      tertiary: 'bg-tertiary-container',
      ghost: 'bg-transparent',
      error: 'bg-error text-on-error',
    },
    list: {
      top: 'rounded-t-2xl',
      bottom: 'rounded-b-2xl',
    },
  },
});

type ButtonProps = Omit<ComponentProps<typeof Pressable>, 'children'> & {
  children?: ReactNode;
  innerClassName?: ClassNameValue;
} & VariantProps<typeof buttonVariants>;
const Button = ({
  className,
  size,
  variant,
  list,
  children,
  innerClassName,
  ...props
}: ButtonProps) => {
  return (
    <Pressable className={cn(buttonVariants({ size, variant, list }), className)} {...props}>
      <View className={cn('flex flex-row items-center justify-center gap-2.5', innerClassName)}>
        {children}
      </View>
    </Pressable>
  );
};

export default Button;
