export const login = async (username: string, password: string) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
};

export const register = async (username: string, password: string, role: string) => {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};