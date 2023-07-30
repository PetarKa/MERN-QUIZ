import { User } from "../models/user";
import { IDATA } from "../models/data";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" })

    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(creditendials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup", {
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
    password: string,
}

export async function login(creditendials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(creditendials)
    });

    return response.json();
}

export async function logout() {
    await fetchData("api/users/logout", {
        method: "POST"
    })
}

export async function getData(): Promise<IDATA> {
    const response = await fetchData("api/userdata", {
        method: "GET"
    })

    return response.json();
}

export interface UpdateData {
    category: string,
    points: number
}

export async function sendData(data: UpdateData) {
    const response = await fetchData("api/userdata", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response.json();
}
