import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        // Basic validation
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const data = await loginUser({
                email,
                password
            });

            // Save login information
            localStorage.setItem(
                "expenseToken",
                data.token
            );

            localStorage.setItem(
                "expenseUser",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>ExpenseTrack</h1>

                <h2>Welcome Back</h2>

                <p>
                    Login to manage your expenses
                </p>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>
<p>
    Don't have an account?{" "}
    <Link to="/register">
        Register
    </Link>
</p>
            </div>

        </div>
    );
}

export default Login;

