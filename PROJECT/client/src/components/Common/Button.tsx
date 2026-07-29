import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  active?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  active = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...rest
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    active ? 'btn-active' : '',
    fullWidth ? 'btn-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      className={classes}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      whileHover={disabled ? undefined : { y: -1 }}
      disabled={disabled}
      {...rest}
    >
      <>
        {icon && <span className="btn-icon-slot">{icon}</span>}
        {children}
      </>
    </motion.button>
  );
};

export default Button;
