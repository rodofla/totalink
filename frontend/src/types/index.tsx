export type User = {
    _id: string
    name: string
    email: string
    handle: string
    description: string
}

export type RegisterFormData = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string
    password_confirmation: string
};

export type LoginFormData = Pick<User, 'email'> & {
    password: string
}

export type ProfileForm = Pick<User, 'handle' | 'description'>