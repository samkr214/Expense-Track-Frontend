
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email");
            return;
        }

        try {
            setLoading(true);
            const data = await forgotPassword(email.trim());
            setMessage(data.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>ExpenseTrack</h1>
                <h2>Forgot Password?</h2>
                <p>Enter your registered email to request a reset link.</p>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                {message && (
                    <div className="success-message">{message}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Requesting..." : "Send Reset Link"}
                    </button>
                </form>

                <p>
                    Remember your password? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
