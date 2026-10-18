import Image from 'next/image';

import { formatDate, type Post } from '~/content/writing';
import serif from '~/desk/writing/serif';
import cn from '~/utils/cn';

/** A4 proportions, a little smaller than life so three fit in the corner */
export const SHEET_WIDTH = 640;
export const SHEET_HEIGHT = Math.round(SHEET_WIDTH * Math.SQRT2);

interface Props {
    post: Post;
    className?: string;
}

/**
 * An article as it comes out of the printer: browser header and footer included. A div rather
 * than an article, as it sits inside a link, which takes its accessible name from this text.
 */
const Sheet = ({ post, className }: Props) => (
    <div
        className={cn(
            'paper shadow-object relative flex flex-col px-14 pb-10 pt-6',
            serif.className,
            className,
        )}
        style={{ width: SHEET_WIDTH, height: SHEET_HEIGHT }}>
        <div aria-hidden className="flex justify-between gap-8 font-sans text-[11px] text-ink/50">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="truncate">{post.title} | Willem-Jaap</span>
        </div>
        <p className="mt-5 text-[15px] uppercase tracking-[0.2em] text-ink/55">
            {formatDate(post.publishedAt)}
        </p>
        <h3 className="mt-2 text-[40px] font-medium leading-[1.08] tracking-[-0.01em] text-balance">
            {post.title}
        </h3>
        <p className="mt-6 text-[22px] leading-[1.5] text-ink/80">{post.summary}</p>
        <Image
            src={post.image.src}
            alt=""
            width={post.image.width}
            height={post.image.height}
            sizes="900px"
            className="mt-8 max-h-[340px] w-full object-cover object-left-top mix-blend-multiply saturate-[0.85]"
        />
        <div aria-hidden className="mt-auto flex justify-between font-sans text-[11px] text-ink/50">
            <span>willemjaap.com/writing/{post.slug}</span>
            <span>1/2</span>
        </div>
    </div>
);

export default Sheet;
