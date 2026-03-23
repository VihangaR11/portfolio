import React, { useRef } from 'react';

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RippleButton({ className = '', onClick, children, ...props }: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const existing = button.getElementsByClassName('ripple')[0];
    if (existing) {
      existing.remove();
    }

    const circle = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.className = 'ripple';

    button.appendChild(circle);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    if (onClick) onClick(event);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`ripple-btn ${className}`}
      {...props}>
      {children}
    </button>
  );
}
