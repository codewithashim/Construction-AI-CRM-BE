import { z } from 'zod';
import { ENUM_USER_ROLE } from '../../../shared/enums/users-enum';

const userValidationMessages = {
    email: {
        required: 'Email is required',
        invalid: 'Invalid email format',
    },
    password: {
        required: 'Password is required',
        minLength: 'Password must be at least 6 characters long',
    },
    role: {
        required: 'Role is required',
        invalid: 'Invalid role',
    },
    name: {
        required: 'Name is required',
    },
    phone: {
        required: 'Phone number is required',
        invalid: 'Invalid phone number format',
    },
};

const createUserZodSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: userValidationMessages.email.required,
            })
            .email(userValidationMessages.email.invalid),
        password: z
            .string({
                required_error: userValidationMessages.password.required,
            })
            .min(6, userValidationMessages.password.minLength),
        role: z.enum(Object.values(ENUM_USER_ROLE) as [string, ...string[]], {
            required_error: userValidationMessages.role.required,
            invalid_type_error: userValidationMessages.role.invalid,
        }),
        name: z.string({
            required_error: userValidationMessages.name.required,
        }),
        phone: z
            .string({
                required_error: userValidationMessages.phone.required,
            })
            .regex(/^\+?[1-9]\d{1,14}$/, userValidationMessages.phone.invalid),
    }),
});

const updateUserZodSchema = z.object({
    body: z
        .object({
            name: z.string().optional(),
            email: z
                .string()
                .email(userValidationMessages.email.invalid)
                .optional(),
            role: z
                .enum(Object.values(ENUM_USER_ROLE) as [string, ...string[]], {
                    invalid_type_error: userValidationMessages.role.invalid,
                })
                .optional(),
            password: z
                .string()
                .min(6, userValidationMessages.password.minLength)
                .optional(),
            phone: z
                .string()
                .regex(
                    /^\+?[1-9]\d{1,14}$/,
                    userValidationMessages.phone.invalid,
                )
                .optional(),
        })
        .optional(),
});

const loginUserZodSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: userValidationMessages.email.required,
            })
            .email(userValidationMessages.email.invalid),
        password: z.string({
            required_error: userValidationMessages.password.required,
        }),
    }),
});

const refreshTokenSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required',
        }),
    }),
});

export const userValidation = {
    createUserZodSchema,
    updateUserZodSchema,
    loginUserZodSchema,
    refreshTokenSchema,
};