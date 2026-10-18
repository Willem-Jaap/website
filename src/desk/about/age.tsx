'use client';

import { getAge } from '~/desk/about/content';

/** Computed when rendered, so it stays right after a birthday without a rebuild */
const Age = () => <span suppressHydrationWarning>{getAge()}</span>;

export default Age;
