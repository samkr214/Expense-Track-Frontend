import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getExpenses } from "../api";

function Dashboard() {
    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("expenseToken");
    const user = JSON.parse(
        localStorage.getItem("expenseUser")
    );

    useEffect(() => {

        async function loadExpenses() {

            try {

                setLoading(true);
                setError("");

                const data = await getExpenses(token);

                setExpenses(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        }

        if (token) {
            loadExpenses();
        } else {
            setLoading(false);
            setError("You are not logged in.");
        }

    }, [token]);


    // Logout
    function handleLogout() {
        localStorage.removeItem("expenseToken");
        localStorage.removeItem("expenseUser");
        navigate("/login");
    }


    // Calculate total
    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );


    // Current month total
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses
        .filter((expense) => {

            const expenseDate = new Date(expense.date);

            return (
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear
            );

        })
        .reduce(
            (total, expense) => total + Number(expense.amount),
            0
        );


    return (
        <div className="dashboard">

            <header className="dashboard-header">

                <div>
                    <h1>ExpenseTrack</h1>

                    <p>
                        Welcome, {user?.name || "User"} 👋
                    </p>
                </div>

                <Link
                    to="/expenses/new"
                    className="add-button"
                >
                    + Add Expense
                </Link>

                <Link to="/expenses">
                    View Expenses
                </Link>

                <Link to="/categories">
                    Categories
                </Link>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </header>


            <main>

                {/* SUMMARY CARDS */}

                <div className="summary-grid">

                    <div className="summary-card">

                        <span>Total Expenses</span>

                        <h2>
                            ₹{totalExpenses.toFixed(2)}
                        </h2>

                    </div>


                    <div className="summary-card">

                        <span>This Month</span>

                        <h2>
                            ₹{monthlyExpenses.toFixed(2)}
                        </h2>

                    </div>


                    <div className="summary-card">

                        <span>Total Records</span>

                        <h2>
                            {expenses.length}
                        </h2>

                    </div>

                </div>


                {/* RECENT EXPENSES */}

                <section className="recent-section">

                    <div className="section-header">

                        <h2>Recent Expenses</h2>

                        <Link to="/expenses">
                            View All
                        </Link>

                    </div>


                    {loading && (
                        <div className="loading">
                            Loading expenses...
                        </div>
                    )}


                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}


                    {!loading &&
                        !error &&
                        expenses.length === 0 && (

                            <div className="empty-state">

                                <h3>
                                    No expenses yet
                                </h3>

                                <p>
                                    Start tracking your spending.
                                </p>

                                <Link to="/expenses/new">
                                    Add your first expense
                                </Link>

                            </div>
                        )
                    }


                    {!loading &&
                        !error &&
                        expenses.length > 0 && (

                            <div className="expense-list">

                                {expenses
                                    .slice(0, 5)
                                    .map((expense) => (

                                        <div
                                            className="expense-item"
                                            key={expense.id}
                                        >

                                            <div>

                                                <h3>
                                                    {expense.title}
                                                </h3>

                                                <p>
                                                    {expense.categoryName}
                                                    {" • "}
                                                    {expense.date}
                                                </p>

                                            </div>

                                            <strong>
                                                ₹
                                                {Number(
                                                    expense.amount
                                                ).toFixed(2)}
                                            </strong>

                                        </div>

                                    ))
                                }

                            </div>
                        )
                    }

                </section>

            </main>

        </div>
    );
}

export default Dashboard;