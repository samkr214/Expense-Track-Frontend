const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}


// Authentication
export function registerUser(userData) {
    return request("/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

export function loginUser(credentials) {
    return request("/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    });
}


// Categories
export function getCategories(token) {
    return request("/categories", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function createCategory(token, categoryData) {
    return request("/categories", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
    });
}
export function updateCategory(token, id, categoryData) {
    return request(`/categories/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
    });
}

export function deleteCategory(token, id) {
    return request(`/categories/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// Expenses
export function getExpenses(token) {
    return request("/expenses", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function createExpense(token, expenseData) {
    return request("/expenses", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(expenseData)
    });
}

export function updateExpense(token, id, expenseData) {
    return request(`/expenses/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(expenseData)
    });
}
export function getExpense(token, id) {
    return request(`/expenses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export function deleteExpense(token, id) {
    return request(`/expenses/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}