import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
    client: {
        NEXT_PUBLIC_URL: z.string().url().optional(),
    },
    // Since Next.js 13.4.4 or later, only client variables need to be specified.
    experimental__runtimeEnv: {
        NEXT_PUBLIC_URL:
            process.env.NEXT_PUBLIC_URL ??
            (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : `http://localhost:${process.env.PORT ?? 3000}`),
    },
});

export { env };
