import { BaseApiClient } from './base-api-client';
import { APIResponse } from '@playwright/test';

export class PostsApiClient extends BaseApiClient {
    private readonly postsPath = '/posts';

    async getUserPosts() {
        return this.get(this.postsPath);
    }

    async getUserPost(postId: number) {
        return this.get(`${this.postsPath}/${postId}`);
    }

    async deleteUserPosts(postId: number) {
        return this.delete(`${this.postsPath}/${postId}`);
    }

    async updatePartOfUserPost(postId: number) {
        return this.patch(`${this.postsPath}/${postId}`, {
            title: 'Just an edited title'
        });
    }

    async createUserPost() {
        return this.post(this.postsPath, {
            title: 'New Post',
            body: 'This is a new post',
            userId: 1
        });
    }

    async updateUserPost(postId: number) {
        return this.put(`${this.postsPath}/${postId}`, {
            id: 1,
            title: 'Existing post',
            body: 'This is a post',
            userId: 1
        });
    }

    async updateNonExistentUser() {
        return this.put(`${this.postsPath}/200`, {
            id: 1,
            title: 'Existing post',
            body: 'This is a post',
            userId: 1
        });
    }
}