import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    as?: React.ElementType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', as: Comp = 'button', ...props }, ref) => {
        return (
            <Comp
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
                    {
                        'bg-navy text-white hover:bg-navy/90 focus:ring-navy': variant === 'primary',
                        'bg-soft-white text-navy border border-stroke hover:bg-gray-50 focus:ring-gray-200': variant === 'secondary',
                        'bg-accent-blue text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30 focus:ring-blue-500': variant === 'accent',
                        'bg-transparent text-navy hover:bg-gray-100': variant === 'ghost',
                        'bg-transparent border border-navy text-navy hover:bg-navy hover:text-white': variant === 'outline',

                        'h-9 px-4 text-sm': size === 'sm',
                        'h-11 px-6 text-base': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button, cn };
