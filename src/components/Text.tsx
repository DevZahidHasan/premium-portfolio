import React from 'react';
import { cn } from '../utils/cn';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: 'display' | 'heading' | 'body' | 'label' | 'mono';
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  children,
  className,
  ...props
}) => {
  const baseStyles = {
    display: 'font-display text-fluid-display',
    heading: 'font-heading text-fluid-heading',
    body: 'font-body text-fluid-body',
    label: 'font-label text-sm uppercase tracking-widest',
    mono: 'font-mono text-sm tracking-tight',
  };

  return (
    <Component className={cn(baseStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
};
