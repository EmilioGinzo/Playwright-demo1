import { test as base, expect } from '@playwright/test';
import * as locator from '../utils/locators';


// Definir un test personalizado que incluya el fixture para volver a la página principal
const test = base.extend({
  goBackToHome: async ({ page }, use) => {
    await use(async () => {
      // Clic en el ícono de Playwright para volver a la página principal
      const playwrightIcon = page.getByRole('link', { name: 'Playwright logo Playwright' });
      await playwrightIcon.click();
      await page.waitForURL('https://playwright.dev/'); // Ajusta la URL principal según sea necesario
    });
  },
});

export { test, expect };
