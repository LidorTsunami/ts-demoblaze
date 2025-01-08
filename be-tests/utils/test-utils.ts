import { test as base } from '@playwright/test';
import { ApiManager } from '../helpers/api-managers';

export const test = base.extend<{
    apiManager: ApiManager;
}>({
    // @ts-ignore
    apiManager: async ({ request }, use) => {
        const apiManager = new ApiManager(request);
        await use(apiManager);
    },
});