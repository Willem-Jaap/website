import { expect, type Page, test } from '@playwright/test';

/** The camera's zoom, read from the world's transform */
const getZoom = (page: Page) =>
    page
        .locator('[data-region="about"]')
        .locator('xpath=..')
        .evaluate(world => new DOMMatrix(getComputedStyle(world).transform).a);

test('the desk loads, framed', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Willem-Jaap · Desk');
    await expect(page.getByRole('heading', { name: 'Willem-Jaap', level: 1 })).toBeAttached();
    for (const region of ['about', 'pixelperfect', 'github', 'writing', 'props']) {
        await expect(page.locator(`[data-region="${region}"]`)).toBeAttached();
    }
    await expect(page.getByRole('navigation', { name: 'Desk' })).toBeVisible();
    expect(await getZoom(page)).toBeLessThan(1);
});

test('dock buttons fly to a region and change the hash', async ({ page }) => {
    await page.goto('/');
    const dock = page.getByRole('navigation', { name: 'Desk' });
    for (const [label, hash] of [
        ['Writing', '#writing'],
        ['Open source', '#github'],
    ]) {
        const button = dock.getByRole('button', { name: label, exact: true });
        await button.click();
        await expect(page).toHaveURL(new RegExp(`${hash}$`));
        await expect(button).toHaveAttribute('aria-current', 'true');
    }
});

test('a deep link starts on its region', async ({ page }) => {
    await page.goto('/#writing');
    await expect(
        page
            .getByRole('navigation', { name: 'Desk' })
            .getByRole('button', { name: 'Writing', exact: true }),
    ).toHaveAttribute('aria-current', 'true');
    await expect(
        page.locator('[data-region="writing"] a[href="/writing/commit-style"]'),
    ).toBeInViewport();
});

test('a post renders', async ({ page }) => {
    await page.goto('/writing/commit-style');
    await expect(
        page.getByRole('heading', { name: 'Your team should pick a commit style', level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /back to the desk/ })).toHaveAttribute(
        'href',
        '/#writing',
    );
});

test('v3 insights redirect to writing', async ({ page, request }) => {
    const response = await request.get('/insights/commit-style', { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers()['location']).toBe('/writing/commit-style');

    await page.goto('/insights/commit-style');
    await expect(page).toHaveURL(/\/writing\/commit-style$/);
});

test('the list view renders without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/list');
    await expect(
        page.getByRole('heading', { name: 'Willem-Jaap Klepper', level: 1 }),
    ).toBeVisible();
    for (const section of ['About me', 'Pixel Perfect', 'Open source', 'Writing']) {
        await expect(page.getByRole('heading', { name: section, level: 2 })).toBeVisible();
    }
    await expect(
        page.getByRole('link', { name: 'Your team should pick a commit style' }),
    ).toBeVisible();
    await context.close();
});

test('on a phone, tapping an object zooms in on it', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Only phones frame regions too small to read');
    await page.goto('/#about');
    const before = await getZoom(page);
    await page.getByRole('article', { name: 'CV' }).tap();
    await expect.poll(() => getZoom(page)).toBeGreaterThan(before * 2);
});
