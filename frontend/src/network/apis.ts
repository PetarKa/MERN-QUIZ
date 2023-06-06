import { User } from "../models/user";

export async function getLoggedInUser(): Promise<User> {
    const response = await fetch("/api/users", { method: "GET" })

    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    passwrod: string
}

export async function signUp(creditendials: SignUpCredentials): Promise<User> {
    const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(creditendials)
    });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    email: string,
}

export async function login(creditendials: LoginCredentials): Promise<User> {
    const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(creditendials)
    });
    return response.json();
}

export async function logout() {
    await fetch("api/users/logout", {
        method: "POST"
    })
}