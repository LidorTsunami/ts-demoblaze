import { APIRequestContext } from '@playwright/test';
import { PostsApiClient } from './posts-api-client';
import { BaseApiClient } from './base-api-client';

export class ApiManager {
    public readonly postsApiClient: PostsApiClient;
    public readonly baseApiClient: BaseApiClient;

    constructor(request: APIRequestContext) {
        this.postsApiClient = new PostsApiClient(request);
        this.baseApiClient = new BaseApiClient(request);
    }
}