import dotenv from 'dotenv';
dotenv.config();

import { auth } from './src/config/auth.js';

async function createTestUser() {
    try {
        console.log("Attempting to create test user...");
        const result = await auth.api.signUpEmail({
            body: {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            }
        });
        console.log("Success! Created user:", result.user.email);
    } catch (err) {
        console.error("Failed to create user:", err);
    }
}

createTestUser();
