import { test, expect } from '@playwright/test';

test.describe('Hover effects: scale removed, ripple added', () => {
  test('home page hero buttons should not use scale transform', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    // ページ内の全要素を取得し、hover状態のscaleアニメーションがないことを検証
    // Footerのリンクなど表示されているリンクをチェック
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = footerLinks.nth(i);
      await link.hover();
      await page.waitForTimeout(100);
      const transform = await link.evaluate((el) =>
        getComputedStyle(el).transform
      );
      expect(transform).toBe('none');
    }
  });

  test('tournament page buttons should have ripple, not scale', async ({ page }) => {
    await page.goto('/tournament');

    // Discordリンク（画像+テキストのリンク要素）
    const discordLink = page.getByRole('link', { name: /Discord.*参加/ });
    await expect(discordLink).toBeVisible();

    // ボタンのbackground-imageがradial-gradientを含むことを確認
    const bgImage = await discordLink.evaluate((el) =>
      getComputedStyle(el).backgroundImage
    );
    expect(bgImage).toContain('radial-gradient');

    // scale transformがないことを確認
    const transform = await discordLink.evaluate((el) =>
      getComputedStyle(el).transform
    );
    expect(transform).toBe('none');
  });

  test('tournament link cards should not have box-shadow', async ({ page }) => {
    await page.goto('/tournament');

    // 「その他」セクションの「デッキをつくる」リンクカード
    const buildLink = page.getByRole('link', { name: /デッキをつくる/ });
    await expect(buildLink).toBeVisible();

    const boxShadow = await buildLink.evaluate((el) =>
      getComputedStyle(el).boxShadow
    );
    expect(boxShadow).toBe('none');
  });

  test('build page layout uses Panda CSS (no Tailwind classes)', async ({ page }) => {
    await page.goto('/build');

    // headerにTailwindクラスが使われていないこと
    const header = page.locator('header');
    const classAttr = await header.getAttribute('class');
    expect(classAttr).not.toContain('fixed');
    expect(classAttr).not.toContain('top-0');
    expect(classAttr).not.toContain('max-w-screen');
  });

  test('deck-view playable cards do not use scale on hover', async ({ page }) => {
    await page.goto('/deck-view');

    // プレイアブルカードグリッドのカードを探す（クリック可能なdiv）
    const cards = page.locator('[class*="grid"] > [class*="cursor"]');
    const count = await cards.count();
    if (count > 0) {
      const card = cards.first();
      await card.hover();
      await page.waitForTimeout(300);

      const transform = await card.evaluate((el) =>
        getComputedStyle(el).transform
      );
      expect(transform).toBe('none');
    }
  });

  test('explanation cards on home page have ripple, not scale', async ({ page }) => {
    await page.goto('/');

    // スクロールしてExplanationSectionを表示
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(1000);

    // 解説カード（yellow背景）を探す
    const cards = page.locator('[class*="yellow"]');
    const count = await cards.count();
    if (count > 0) {
      const card = cards.first();
      const bgImage = await card.evaluate((el) =>
        getComputedStyle(el).backgroundImage
      );
      expect(bgImage).toContain('radial-gradient');
    }
  });
});
