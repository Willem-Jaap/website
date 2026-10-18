import type { ComponentProps } from 'react';

import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

import cn from '~/utils/cn';

/** Long-form typography for a printed article */
const prose = {
    h2: ({ className, ...props }: ComponentProps<'h2'>) => (
        <h2
            className={cn(
                'mb-4 mt-14 text-[28px] font-medium leading-tight tracking-[-0.01em] text-ink',
                className,
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: ComponentProps<'h3'>) => (
        <h3
            className={cn('mb-3 mt-10 text-[22px] font-medium leading-snug text-ink', className)}
            {...props}
        />
    ),
    p: ({ className, ...props }: ComponentProps<'p'>) => (
        <p className={cn('my-5', className)} {...props} />
    ),
    a: ({ className, href = '', ...props }: ComponentProps<'a'>) => {
        const classes = cn(
            'underline decoration-mat/60 decoration-[1.5px] underline-offset-[3px] transition-colors hover:decoration-mat',
            className,
        );
        return href.startsWith('/') ? (
            <Link href={href} className={classes} {...props} />
        ) : (
            <a href={href} className={classes} target="_blank" rel="noreferrer" {...props} />
        );
    },
    strong: ({ className, ...props }: ComponentProps<'strong'>) => (
        <strong className={cn('font-semibold text-ink', className)} {...props} />
    ),
    ul: ({ className, ...props }: ComponentProps<'ul'>) => (
        <ul
            className={cn('my-5 list-disc space-y-2 pl-6 marker:text-ink/40', className)}
            {...props}
        />
    ),
    ol: ({ className, ...props }: ComponentProps<'ol'>) => (
        <ol
            className={cn('my-5 list-decimal space-y-2 pl-6 marker:text-ink/50', className)}
            {...props}
        />
    ),
    li: ({ className, ...props }: ComponentProps<'li'>) => (
        <li className={cn('pl-1', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
        <blockquote
            className={cn(
                'my-8 border-l-2 border-ink/25 pl-6 text-[22px] italic text-ink/75',
                className,
            )}
            {...props}
        />
    ),
    hr: ({ className, ...props }: ComponentProps<'hr'>) => (
        <hr className={cn('mx-auto my-12 w-24 border-ink/20', className)} {...props} />
    ),
    pre: ({ className, ...props }: ComponentProps<'pre'>) => (
        <pre
            className={cn(
                'my-7 overflow-x-auto rounded-sm bg-ink/[0.045] px-5 py-4 font-mono text-[14px] leading-relaxed text-ink/90 sm:-mx-5',
                className,
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }: ComponentProps<'code'>) => (
        <code
            className={cn(
                'font-mono text-[0.8em] [pre>&]:text-[1em] [:not(pre)>&]:rounded-sm [:not(pre)>&]:bg-ink/[0.06] [:not(pre)>&]:px-1.5 [:not(pre)>&]:py-0.5',
                className,
            )}
            {...props}
        />
    ),
} satisfies MDXComponents;

export default prose;
