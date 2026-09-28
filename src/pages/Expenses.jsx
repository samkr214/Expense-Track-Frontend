// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { getExpenses } from "../api";

// // function Expenses() {
// //     const token = localStorage.getItem("expenseToken");

// //     const [expenses, setExpenses] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState("");

// //     useEffect(() => {
// //         async function loadExpenses() {
// //             try {
// //                 setLoading(true);

// //                 const data = await getExpenses(token);

// //                 setExpenses(data);
// //             } catch (error) {
// //                 setError(error.message);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         }

// //         loadExpenses();
// //     }, [token]);

// //     if (loading) {
// //         return <p>Loading expenses...</p>;
// //     }

// //     if (error) {
// //         return <p>{error}</p>;
// //     }

// //     return (
// //         <div>
// //             <h1>Expenses</h1>

// //             <Link to="/expenses/new">
// //                 + Add Expense
// //             </Link>

// //             {expenses.length === 0 ? (
// //                 <p>No expenses found.</p>
// //             ) : (
// //                 <div>
// //                     {expenses.map((expense) => (
// //                         <div key={expense.id}>
// //                             <h3>{expense.title}</h3>

// //                             <p>
// //                                 ₹{Number(expense.amount).toFixed(2)}
// //                             </p>

// //                             <p>
// //                                 Category ID: {expense.categoryId}
// //                             </p>

// //                             <p>
// //                                 Date: {expense.date}
// //                             </p>

// //                             {expense.description && (
// //                                 <p>{expense.description}</p>
// //                             )}

// //                             <hr />
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// // export default Expenses;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//     getExpenses,
//     getCategories,
//     deleteExpense
// } from "../api";

// function Expenses() {

//     const token = localStorage.getItem("expenseToken");

//     const [expenses, setExpenses] = useState([]);
//     const [categories, setCategories] = useState([]);

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // Load expenses and categories
//     useEffect(() => {

//         async function loadData() {

//             try {

//                 setLoading(true);
//                 setError("");

//                 const [expensesData, categoriesData] =
//                     await Promise.all([
//                         getExpenses(token),
//                         getCategories(token)
//                     ]);

//                 setExpenses(expensesData);
//                 setCategories(categoriesData);

//             } catch (error) {

//                 setError(error.message);

//             } finally {

//                 setLoading(false);

//             }
//         }

//         loadData();

//     }, [token]);


//     // Find category name using category ID
//     function getCategoryName(categoryId) {

//         const category = categories.find(
//             (category) => category.id === categoryId
//         );

//         return category
//             ? category.name
//             : "Unknown Category";
//     }


//     // Delete expense
//     async function handleDelete(id) {

//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this expense?"
//         );

//         if (!confirmDelete) {
//             return;
//         }

//         try {

//             await deleteExpense(token, id);

//             // Remove deleted expense from screen
//             setExpenses((currentExpenses) =>
//                 currentExpenses.filter(
//                     (expense) => expense.id !== id
//                 )
//             );

//         } catch (error) {

//             setError(error.message);

//         }
//     }


//     if (loading) {
//         return (
//             <div>
//                 <h1>Expenses</h1>
//                 <p>Loading expenses...</p>
//             </div>
//         );
//     }


//     return (
//         <div>

//             <h1>Expenses</h1>

//             <Link to="/expenses/new">
//                 + Add Expense
//             </Link>


//             {error && (
//                 <p>
//                     {error}
//                 </p>
//             )}


//             {expenses.length === 0 ? (

//                 <p>
//                     No expenses found.
//                 </p>

//             ) : (

//                 <div>

//                     {expenses.map((expense) => (

//                         <div key={expense.id}>

//                             <h3>
//                                 {expense.title}
//                             </h3>

//                             <p>
//                                 ₹
//                                 {Number(
//                                     expense.amount
//                                 ).toFixed(2)}
//                             </p>

//                             <p>
//                                 Category:{" "}
//                                 {getCategoryName(
//                                     expense.categoryId
//                                 )}
//                             </p>

//                             <p>
//                                 Date: {expense.date}
//                             </p>

//                             {expense.description && (
//                                 <p>
//                                     {expense.description}
//                                 </p>
//                             )}


//                             <button
//                                 onClick={() =>
//                                     handleDelete(
//                                         expense.id
//                                     )
//                                 }
//                             >
//                                 Delete
//                             </button>
// <Link to={`/expenses/${expense.id}/edit`}>
//     Edit
// </Link>
//                             <hr />

//                         </div>

//                     ))}

//                 </div>

//             )}

//         </div>
//     );
// }

// export default Expenses;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getExpenses,
    getCategories,
    deleteExpense
} from "../api";

function Expenses() {

    const token = localStorage.getItem("expenseToken");

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load expenses and categories
    useEffect(() => {

        async function loadData() {

            try {

                setLoading(true);
                setError("");

                const [expensesData, categoriesData] =
                    await Promise.all([
                        getExpenses(token),
                        getCategories(token)
                    ]);

                setExpenses(expensesData);
                setCategories(categoriesData);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        }

        loadData();

    }, [token]);


    // Find category name using category ID
    function getCategoryName(categoryId) {

        const category = categories.find(
            (category) => category.id === categoryId
        );

        return category
            ? category.name
            : "Unknown Category";
    }


    // Delete expense
    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteExpense(token, id);

            // Remove deleted expense from screen
            setExpenses((currentExpenses) =>
                currentExpenses.filter(
                    (expense) => expense.id !== id
                )
            );

        } catch (error) {

            setError(error.message);

        }
    }


    if (loading) {
        return (
            <div>
                <h1>Expenses</h1>
                <p>Loading expenses...</p>
            </div>
        );
    }


    return (
        <div className="expenses-page">

            <div className="expenses-header">

                <div>
                    <h1>Expenses</h1>
                    <p>Manage your recorded expenses</p>
                </div>

                <Link
                    to="/expenses/new"
                    className="add-button"
                >
                    + Add Expense
                </Link>

            </div>


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {expenses.length === 0 ? (

                <p>
                    No expenses found.
                </p>

            ) : (

                <div className="expenses-list">

                    {expenses.map((expense) => (

                        <div
                            className="expense-card"
                            key={expense.id}
                        >

                            <h3>
                                {expense.title}
                            </h3>

                            <p>
                                ₹
                                {Number(
                                    expense.amount
                                ).toFixed(2)}
                            </p>

                            <p>
                                Category:{" "}
                                {getCategoryName(
                                    expense.categoryId
                                )}
                            </p>

                            <p>
                                Date: {expense.date}
                            </p>

                            {expense.description && (
                                <p>
                                    {expense.description}
                                </p>
                            )}


                            <button
                                className="delete-button"
                                onClick={() =>
                                    handleDelete(
                                        expense.id
                                    )
                                }
                            >
                                Delete
                            </button>

                            <Link
                                className="edit-button"
                                to={`/expenses/${expense.id}/edit`}
                            >
                                Edit
                            </Link>

                            <hr />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Expenses;