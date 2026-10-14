import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail } from "../api";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Verifying your email...");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setMessage("Verification token is missing.");
            return;
        }

        verifyEmail(token)
            .then((response) => {
                setMessage(
                    response.message || "Email verified successfully!"
                );
                setSuccess(true);
            })
            .catch((error) => {
                setMessage(
                    error.message || "Email verification failed. Please try again."
                );
            });
    }, [searchParams]);

    return (
        <div style={{ maxWidth: "500px", margin: "100px auto", textAlign: "center", padding: "24px" }}>
            <h1>ExpenseTrack</h1>
            <h2>{message}</h2>

            {success && (
                <p>
                    <Link to="/login">Go to Login</Link>
                </p>
            )}
        </div>
    );
}
