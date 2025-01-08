import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }


    protected async get(path: string) {
        return await this.request.get(path);
    }

    protected async post(path: string, body?: object) {
        return await this.request.post(path, { data: body });
    }

    protected async put(path: string, body?: object) {
        return await this.request.put(path, { data: body });
    }

    protected async patch(path: string, body?: object) {
        return await this.request.patch(path, { data: body });
    }

    protected async delete(path: string) {
        return await this.request.delete(path);
    }
    async checkAnimalsEndpoint() {
        return await this.request.get('/animals');
    }
}