export enum PostPrivacy {
    public_all = 'public',
    friends_only = 'friend',
    private_group = 'private'
}

export function getArrayPostPrivacy() {
    return [PostPrivacy.public_all, PostPrivacy.friends_only];
}

export const mapPostPrivacy = new Map<PostPrivacy, string>([
    [PostPrivacy.public_all, 'public_all'],
    [PostPrivacy.friends_only, 'friends_only'],
    [PostPrivacy.private_group, 'private_group'],

]);
