import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    createExpense,
    getCategories
} from "../api";

function ExpenseForm() {

    const navigate = useNavigate();

    const token = localStorage.getItem("expenseToken");

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [error, setError] = useState("");

    // Load categories from API
    useEffect(() => {

        async function loadCategories() {

            try {

                setCategoriesLoading(true);

                const data = await getCategories(token);
// console.log("CATEGORIES FROM API:", data);
                setCategories(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setCategoriesLoading(false);

            }
        }

        loadCategories();

    }, [token]);


    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        // Validation
        if (!title || !amount || !categoryId || !date) {
            setError(
                "Title, amount, category and date are required"
            );
            return;
        }

        if (Number(amount) <= 0) {
            setError("Amount must be greater than 0");
            return;
        }


        try {

            setLoading(true);

            await createExpense(token, {
                title,
                amount: Number(amount),
                categoryId: Number(categoryId),
                date,
                description
            });

            // Go back to dashboard
            navigate("/dashboard");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="form-page">

            <div className="form-card">

                <h1>Add Expense</h1>

                <p>
                    Record a new expense
                </p>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    {/* TITLE */}

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
                        placeholder="e.g. Dinner"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />


                    {/* AMOUNT */}

                    <label>
                        Amount
                    </label>

                    <input
                        type="number"
                        placeholder="e.g. 450"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                    />


                    {/* CATEGORY */}

                    <label>
                        Category
                    </label>

                    {categoriesLoading ? (

                        <p>Loading categories...</p>

                    ) : (

                        <select
                            value={categoryId}
                            onChange={(e) =>
                                setCategoryId(e.target.value)
                            }
                        >

                            <option value="">
                                Select category
                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>

                            ))}

                        </select>

                    )}


                    {/* DATE */}

                    <label>
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                    />


                    {/* DESCRIPTION */}

                    <label>
                        Description
                    </label>

                    <textarea
                        placeholder="Optional description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />


                    <button
                        type="submit"
                        disabled={loading || categoriesLoading}
                    >
                        {loading
                            ? "Saving..."
                            : "Add Expense"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ExpenseForm;