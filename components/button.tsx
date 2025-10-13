import { cn } from '@/lib/cn';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'rounded-lg px-5 py-4 flex items-center flex-row gap-2.5',
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
  variants: {
    size: {
      md: '',
      lg: 'rounded-full py-6 px-10',
    },
    color: {
      primary: 'bg-primary text-on-primary',
      secondary: '',
    },
  },
});

type ButtonProps = {} & ComponentProps<typeof Pressable> & VariantProps<typeof buttonVariants>;
const Button = ({ className, size, color, ...props }: ButtonProps) => {
  return <Pressable className={cn(buttonVariants({ size, color }), className)} {...props} />;
};

export default Button;
