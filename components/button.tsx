import { cn } from '@/lib/cn';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, View } from 'react-native';
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
} & VariantProps<typeof buttonVariants>;
const Button = ({ className, size, variant, list, children, ...props }: ButtonProps) => {
  return (
    <Pressable className={cn(buttonVariants({ size, variant, list }), className)} {...props}>
      <View className="flex w-full flex-row items-center justify-center gap-2.5">{children}</View>
    </Pressable>
  );
};

export default Button;
