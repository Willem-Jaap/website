'use client';

import { type MouseEvent, type ReactNode, useRef } from 'react';

import gsap from 'gsap';
import Link, { type LinkProps } from 'next/link';

import cn from '~utils/cn';

type Props =
    | (LinkProps & {
          children: ReactNode;
          className?: string;
      })
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
          children: ReactNode;
          className?: string;
          href?: never;
      });

const Button = ({ children, className, href, onClick, ...props }: Props) => {
    const buttonAccentRef = useRef<HTMLSpanElement>(null);
    const buttonGradientRef = useRef<HTMLSpanElement>(null);
    const buttonContentRef = useRef<HTMLSpanElement>(null);

    const buttonClassName = cn(
        'relative inline-block w-fit rounded-full border-2 border-charade-700 whitespace-nowrap hover:border-charade-600 transition-colors duration-200 ease-in-out overflow-hidden',
        className,
    );

    const onMouseEnter = () => {
        gsap.to(buttonAccentRef.current, {
            duration: 0.4,
            opacity: 1,
            ease: 'power4.inOut',
        });

        gsap.to(buttonGradientRef.current, {
            duration: 0.4,
            y: -8,
            ease: 'power4.inOut',
        });
    };

    const onMouseMove = (event: MouseEvent) => {
        if (!buttonAccentRef.current) return;
        const { clientX, target } = event;

        const { left, width } = (target as HTMLButtonElement).getBoundingClientRect();
        const positionOnButton = clientX - left - width / 2;

        gsap.to(buttonAccentRef.current, {
            x: positionOnButton / 4,
            duration: 0,
            ease: 'power4.inOut',
        });
    };

    const onMouseLeave = () => {
        gsap.to(buttonAccentRef.current, {
            duration: 0.2,
            opacity: 0,
            ease: 'power4.inOut',
        });

        gsap.to(buttonGradientRef.current, {
            duration: 0.2,
            y: 0,
            ease: 'power4.inOut',
        });
    };

    const onMouseDown = () => {
        gsap.to(buttonContentRef.current, {
            duration: 0.2,
            scale: 0.95,
            ease: 'power4.inOut',
        });

        gsap.to(buttonGradientRef.current, {
            duration: 0.2,
            scale: 1.1,
            y: 8,
            ease: 'power4.inOut',
        });
    };

    const onMouseUp = () => {
        gsap.to(buttonContentRef.current, {
            duration: 0.2,
            scale: 1,
            ease: 'power4.inOut',
        });

        gsap.to(buttonGradientRef.current, {
            duration: 0.2,
            scale: 1,
            y: 0,
            ease: 'power4.inOut',
        });
    };

    const eventListeners = {
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
    };

    const ButtonContent = () => (
        <>
            <span className="relative block py-2 px-5 rounded-full border border-charade-500 hover:border-charade-500 transition-colors duration-200 ease-in-out overflow-hidden">
                <span
                    className="absolute block inset-0 h-[200%] -translate-y-1/2 bg-[radial-gradient(circle_at_center_top,#2d2c35_20%,#111014_80%)] opacity-90"
                    ref={buttonGradientRef}
                />
                <span className="relative block z-10" ref={buttonContentRef}>
                    {children}
                </span>
            </span>
            <span
                className="w-8 h-[1px] absolute left-1/2 top-0 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,#545062,transparent)] opacity-0"
                ref={buttonAccentRef}
            />
        </>
    );

    if (href) {
        return (
            <Link
                className={cn(buttonClassName, className)}
                href={href}
                {...(props as Omit<LinkProps, 'href'>)}
                {...eventListeners}>
                <ButtonContent />
            </Link>
        );
    }

    return (
        <button
            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
            className={cn(buttonClassName, className)}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            {...eventListeners}>
            <ButtonContent />
        </button>
    );
};

export default Button;
