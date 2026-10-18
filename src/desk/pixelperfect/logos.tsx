import type { SVGProps } from 'react';

/** The Pixel Perfect mark: a square with a pixel cut into its corner */
export const PixelPerfectMark = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
        <path fillRule="evenodd" d="M16 0V16H0V0H16ZM14 14V2H2V14H14Z" fill="currentColor" />
        <path d="M0 7.33H8.67V16H6.67V9.33H0V7.33Z" fill="currentColor" />
    </svg>
);

export const EyesMark = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 18" aria-hidden {...props}>
        <path
            d="M15.75 0C14.9894 1.53905e-05 14.2388 0.044242 13.5 0.125977V17.8857C14.2401 17.9593 14.9905 18 15.75 18C16.5094 18 17.26 17.9592 18 17.8857V0.125977C17.2613 0.044306 16.5105 0 15.75 0ZM20.25 17.5488C21.8155 17.2309 23.321 16.7487 24.75 16.124V11.25H20.25V17.5488ZM6.75 16.124C8.17887 16.7489 9.68454 17.2308 11.25 17.5488V2.8125H6.75V16.124ZM27 14.9873C28.6426 14.0366 30.1538 12.8847 31.5 11.5645V7.875H27V14.9873ZM0 11.5605C1.34622 12.8814 2.85723 14.0342 4.5 14.9854V9H0V11.5605Z"
            fill="currentColor"
        />
    </svg>
);

/** Tencil's pin with a cursor in it */
export const TencilMark = ({
    cursor = '#fff',
    ...props
}: SVGProps<SVGSVGElement> & { cursor?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
        <path d="M3 21V9a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6Z" fill="currentColor" />
        <path
            d="M9.25 7.5 16.5 12.6l-3.55.75-1.75 3.4Z"
            fill={cursor}
            stroke={cursor}
            strokeLinejoin="round"
        />
    </svg>
);
