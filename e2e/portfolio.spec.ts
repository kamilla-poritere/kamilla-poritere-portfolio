import { test, expect } from "@playwright/test";

test.describe("Portfolio Website", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/");

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Kamilla Poriter/);

    // Check if main sections are visible
    await expect(page.locator("#hero-section")).toBeVisible();
    await expect(page.locator("#about-section")).toBeVisible();
  });

  test("should display header with navigation", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check navigation links in header specifically
    await expect(
      header.getByRole("link", { name: /experience/i })
    ).toBeVisible();
    await expect(
      header.getByRole("link", { name: /education/i })
    ).toBeVisible();
    await expect(
      header.getByRole("link", { name: /portfolio/i })
    ).toBeVisible();
    await expect(header.getByRole("link", { name: /skills/i })).toBeVisible();
    await expect(header.getByRole("link", { name: /contact/i })).toBeVisible();
  });

  test("should navigate smoothly to sections", async ({ page }) => {
    await page.goto("/");

    // Click on Experience link in header
    const header = page.locator("header");
    await header.getByRole("link", { name: /experience/i }).click();

    // Wait for smooth scroll animation
    await page.waitForTimeout(500);

    // Check if experience section is in viewport
    const experienceSection = page.locator("#experience-section");
    await expect(experienceSection).toBeInViewport();
  });

  test("should switch language", async ({ page }) => {
    await page.goto("/");

    // Click language switcher
    const langButton = page.locator("#lang-trigger");
    await langButton.click();

    // Select Russian
    await page.locator('[data-lang-option="ru"]').click();

    // Wait for translation
    await page.waitForTimeout(500);

    // Check if content changed (looking for Russian text)
    const currentLang = await langButton.textContent();
    expect(currentLang).toContain("RU");
  });

  test("should toggle theme", async ({ page }) => {
    await page.goto("/");

    const themeButton = page.locator("#theme-toggle");
    await expect(themeButton).toBeVisible();

    const htmlElement = page.locator("html");
    const initialTheme = await htmlElement.getAttribute("data-theme");

    await themeButton.click();
    await page.waitForTimeout(300);

    const newTheme = await htmlElement.getAttribute("data-theme");

    // Should toggle between "" (dark) and "light"
    if (initialTheme === "light") {
      expect(newTheme).toBe("");
    } else {
      expect(newTheme).toBe("light");
    }
  });

  test('should load experience items on "Load More" click', async ({
    page,
  }) => {
    await page.goto("/");

    // Navigate to experience section
    await page.locator("#experience-section").scrollIntoViewIfNeeded();

    // Check initial state - only 1 item visible
    const visibleItems = page.locator(".experience__item.is-visible");
    await expect(visibleItems).toHaveCount(1);

    // Click "Load More" button
    const loadMoreBtn = page.locator(".experience__btn");
    await loadMoreBtn.click();

    // Wait for animation
    await page.waitForTimeout(500);

    // Should have 2 items visible now
    await expect(visibleItems).toHaveCount(2);
  });

  test("should display footer with social links", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    // Check social links in footer specifically
    await expect(
      footer.locator('.footer__social-link[aria-label="GitHub"]')
    ).toBeVisible();
    await expect(
      footer.locator('.footer__social-link[aria-label="LinkedIn"]')
    ).toBeVisible();
    await expect(
      footer.locator('.footer__social-link[aria-label="Email"]')
    ).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check if content is visible and properly laid out
    await expect(page.locator("#hero-section")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
  });
});
