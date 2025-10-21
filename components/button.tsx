import { cn } from '@/lib/cn';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
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
      lg: 'rounded-full px-10 h-20',
    },
    variant: {
      primary: 'bg-primary text-on-primary',
      secondary: 'bg-secondary text-on-secondary',
      ghost: 'bg-transparent',
    },
  },
});

type ButtonProps = {} & ComponentProps<typeof Pressable> & VariantProps<typeof buttonVariants>;
const Button = ({ className, size, variant, ...props }: ButtonProps) => {
  return <Pressable className={cn(buttonVariants({ size, variant }), className)} {...props} />;
};

export default Button;
