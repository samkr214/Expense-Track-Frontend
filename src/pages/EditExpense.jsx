import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getExpense,
    getCategories,
    updateExpense
} from "../api";

function EditExpense() {

    const navigate = useNavigate();
    const { id } = useParams();

    const token = localStorage.getItem("expenseToken");

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadData() {

            try {

                setLoading(true);
                setError("");

                const [expenseData, categoriesData] =
                    await Promise.all([
                        getExpense(token, id),
                        getCategories(token)
                    ]);

                setTitle(expenseData.title);
                setAmount(expenseData.amount);
                setCategoryId(expenseData.categoryId);
                setDate(expenseData.date);
                setDescription(
                    expenseData.description || ""
                );

                setCategories(categoriesData);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        }

        loadData();

    }, [token, id]);


    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (!title || !amount || !categoryId || !date) {

            setError(
                "Title, amount, category and date are required"
            );

            return;
        }

        if (Number(amount) <= 0) {

            setError(
                "Amount must be greater than 0"
            );

            return;
        }

        try {

            setSaving(true);

            await updateExpense(token, id, {
                title,
                amount: Number(amount),
                categoryId: Number(categoryId),
                date,
                description
            });

            navigate("/expenses");

        } catch (error) {

            setError(error.message);

        } finally {

            setSaving(false);

        }
    }


    if (loading) {

        return (
            <div>
                <h1>Edit Expense</h1>
                <p>Loading expense...</p>
            </div>
        );
    }


    return (
        <div className="form-page">

            <div className="form-card">

                <h1>Edit Expense</h1>

                <p>
                    Update your expense
                </p>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />


                    <label>
                        Amount
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                    />


                    <label>
                        Category
                    </label>

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


                    <label>
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />


                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Expense"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditExpense;