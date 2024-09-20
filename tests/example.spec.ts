import { test, expect } from '../fixtures';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Prueba completa con múltiples steps
test.describe('Pruebas de la barra de navegación en Playwright.dev', () => {
  const baseURL = process.env.BASE_URL || 'https://playwright.dev/';

  test('Verifica que los botones Docs y API en la navbar funcionan correctamente', async ({ page, goBackToHome  }) => {
    
    // Step 1: Navegar a la página principal y verificar que cargó correctamente
    await test.step('Ir a la página principal de Playwright y verificar que cargó correctamente', async () => {
      await page.goto(baseURL);
      await expect(page).toHaveTitle(/Playwright/);
    });

    // Step 2: Verificar que el botón "Docs" funciona correctamente
    await test.step('Verificar que el botón Docs redirige a la página de documentación', async () => {
      const docsButton = page.getByRole('link', { name: 'Docs', exact: true  });
      await expect(docsButton).toBeVisible();
      await docsButton.click();
      await page.waitForURL(`${baseURL}docs/intro`);
      await expect(page).toHaveTitle('Installation | Playwright');
      await goBackToHome();
    });

    // Step 3: Verificar que el botón "API" funciona correctamente
    await test.step('Verificar que el botón API redirige a la página de referencia de la API', async () => {
      const apiButton = page.getByRole('link', { name: 'API', exact: true });
      await expect(apiButton).toBeVisible();
      await apiButton.click();
      await page.waitForURL(`${baseURL}docs/api/class-playwright`);
      await expect(page).toHaveTitle('Playwright Library | Playwright');
      await goBackToHome();
    });

    // Step 4: Pasar el mouse sobre el botón "Node.js" y verificar que se despliega el menú
    await test.step('Pasa el mouse sobre Node.js y se despliega el menú esperado', async () => {
      const nodejsButton = page.getByRole('button', { name: 'Node.js' });
      await nodejsButton.hover();

      const pythonOption = page.getByRole('link', { name: 'Python' });
      const javaOption1 = page.getByRole('link', { name: 'Java' }).nth(0); // First match
const javaOption2 = page.getByRole('link', { name: 'Java' }).nth(1); // Second match
const javaOption3 = page.getByRole('link', { name: 'Java' }).nth(2); // Third match

      const dotNetOption = page.getByRole('link', { name: '.NET' });
      
      // Verifica que las 3 opciones del menú sean visibles
      await expect(pythonOption).toBeVisible();
      // await expect(javaOption).toBeVisible();
      await expect(dotNetOption).toBeVisible();
    });

    // Step 5: Verificar que la opción "Python" funciona correctamente
    await test.step('Verificar la opción Node.js -> Python', async () => {
      const pythonOption = page.getByRole('link', { name: 'Python' });
      await pythonOption.click();
      await page.waitForLoadState('load');
      await page.waitForURL(`${baseURL}python`);
      await expect(page).toHaveTitle(/Python/);
      await page.goBack(); // Vuelve a la página principal
    });

    // Step 6: Verificar que la opción "Java" funciona correctamente
    await test.step('Verificar la opción Node.js -> Java', async () => {
      const javaOption = page.getByRole('link', { name: 'Java' });
      await javaOption.click();
      await page.waitForURL(`${baseURL}java`);
      await expect(page).toHaveTitle(/Java/);
      await page.goBack(); // Vuelve a la página principal
    });

    // Step 7: Verificar que la opción ".NET" funciona correctamente
    await test.step('Verificar la opción Node.js -> .NET', async () => {
      const dotNetOption = page.getByRole('link', { name: '.NET' });
      await dotNetOption.click();
      await page.waitForURL(`${baseURL}dotnet`);
      await expect(page).toHaveTitle(/.NET/);
      await page.goBack(); // Vuelve a la página principal
    });
  });
});
