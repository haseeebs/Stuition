import {z} from 'zod';

// User validation schema
export const userSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    accountType: z.string().min(1, { message: 'Account type is required' }),
    contactNumber: z.string().min(1, { message: 'Contact number is required' }),
    otp: z.string().min(1, { message: 'OTP is required' }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
});

// Login validation schema
export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

// Change Password validation schema
export const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, { message: 'Old password must be at least 6 characters long' }),
    newPassword: z.string().min(6, { message: 'New password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters long' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"], // Path of the error
});