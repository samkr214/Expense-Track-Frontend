// import { useEffect, useState } from "react";
// import {
//     getCategories,
//     createCategory,
//     updateCategory,
//     deleteCategory
// } from "../api";

// function Categories() {

//     const token = localStorage.getItem("expenseToken");

//     const [categories, setCategories] = useState([]);
//     const [name, setName] = useState("");

//     const [editingId, setEditingId] = useState(null);
//     const [editingName, setEditingName] = useState("");

//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState("");

//     // Load categories
//     useEffect(() => {

//         async function loadCategories() {

//             try {

//                 setLoading(true);
//                 setError("");

//                 const data = await getCategories(token);

//                 setCategories(data);

//             } catch (error) {

//                 setError(error.message);

//             } finally {

//                 setLoading(false);

//             }
//         }

//         loadCategories();

//     }, [token]);


//     // Add category
//     async function handleSubmit(e) {

//         e.preventDefault();

//         setError("");

//         if (!name.trim()) {

//             setError("Category name is required");

//             return;
//         }

//         try {

//             setSaving(true);

//             const data = await createCategory(token, {
//                 name: name.trim()
//             });

//             setCategories((currentCategories) => [
//                 data.category,
//                 ...currentCategories
//             ]);

//             setName("");

//         } catch (error) {

//             setError(error.message);

//         } finally {

//             setSaving(false);

//         }
//     }


//     // Start editing
//     function handleEdit(category) {

//         setEditingId(category.id);
//         setEditingName(category.name);

//     }


//     // Update category
//     async function handleUpdate(id) {

//         setError("");

//         if (!editingName.trim()) {

//             setError("Category name is required");

//             return;
//         }

//         try {

//             await updateCategory(token, id, {
//                 name: editingName.trim()
//             });

//             setCategories((currentCategories) =>
//                 currentCategories.map((category) =>
//                     category.id === id
//                         ? {
//                             ...category,
//                             name: editingName.trim()
//                         }
//                         : category
//                 )
//             );

//             setEditingId(null);
//             setEditingName("");

//         } catch (error) {

//             setError(error.message);

//         }
//     }


//     // Delete category
//     async function handleDelete(id) {

//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this category?"
//         );

//         if (!confirmDelete) {
//             return;
//         }

//         try {

//             await deleteCategory(token, id);

//             setCategories((currentCategories) =>
//                 currentCategories.filter(
//                     (category) => category.id !== id
//                 )
//             );

//         } catch (error) {

//             setError(error.message);

//         }
//     }


//     if (loading) {

//         return (
//             <div>
//                 <h1>Categories</h1>
//                 <p>Loading categories...</p>
//             </div>
//         );
//     }


//     return (
//         <div>

//             <h1>Categories</h1>


//             {error && (
//                 <p>
//                     {error}
//                 </p>
//             )}


//             {/* ADD CATEGORY */}

//             <form onSubmit={handleSubmit}>

//                 <input
//                     type="text"
//                     placeholder="Enter category name"
//                     value={name}
//                     onChange={(e) =>
//                         setName(e.target.value)
//                     }
//                 />

//                 <button
//                     type="submit"
//                     disabled={saving}
//                 >
//                     {saving
//                         ? "Adding..."
//                         : "Add Category"}
//                 </button>

//             </form>


//             {/* CATEGORY LIST */}

//             {categories.length === 0 ? (

//                 <p>
//                     No categories found.
//                 </p>

//             ) : (

//                 <div>

//                     {categories.map((category) => (

//                         <div key={category.id}>

//                             {editingId === category.id ? (

//                                 <>
//                                     <input
//                                         type="text"
//                                         value={editingName}
//                                         onChange={(e) =>
//                                             setEditingName(
//                                                 e.target.value
//                                             )
//                                         }
//                                     />

//                                     <button
//                                         onClick={() =>
//                                             handleUpdate(
//                                                 category.id
//                                             )
//                                         }
//                                     >
//                                         Save
//                                     </button>

//                                     <button
//                                         onClick={() => {
//                                             setEditingId(null);
//                                             setEditingName("");
//                                         }}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </>

//                             ) : (

//                                 <>
//                                     <span>
//                                         {category.name}
//                                     </span>

//                                     <button
//                                         onClick={() =>
//                                             handleEdit(category)
//                                         }
//                                     >
//                                         Edit
//                                     </button>

//                                     <button
//                                         onClick={() =>
//                                             handleDelete(
//                                                 category.id
//                                             )
//                                         }
//                                     >
//                                         Delete
//                                     </button>
//                                 </>

//                             )}

//                             <hr />

//                         </div>

//                     ))}

//                 </div>

//             )}

//         </div>
//     );
// }

// export default Categories;

import { useEffect, useState } from "react";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../api";

function Categories() {

    const token = localStorage.getItem("expenseToken");

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load categories
    useEffect(() => {

        async function loadCategories() {

            try {

                setLoading(true);
                setError("");

                const data = await getCategories(token);

                setCategories(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        }

        loadCategories();

    }, [token]);


    // Add category
    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (!name.trim()) {

            setError("Category name is required");

            return;
        }

        try {

            setSaving(true);

            const data = await createCategory(token, {
                name: name.trim()
            });

            setCategories((currentCategories) => [
                data.category,
                ...currentCategories
            ]);

            setName("");

        } catch (error) {

            setError(error.message);

        } finally {

            setSaving(false);

        }
    }


    // Start editing
    function handleEdit(category) {

        setEditingId(category.id);
        setEditingName(category.name);

    }


    // Update category
    async function handleUpdate(id) {

        setError("");

        if (!editingName.trim()) {

            setError("Category name is required");

            return;
        }

        try {

            await updateCategory(token, id, {
                name: editingName.trim()
            });

            setCategories((currentCategories) =>
                currentCategories.map((category) =>
                    category.id === id
                        ? {
                            ...category,
                            name: editingName.trim()
                        }
                        : category
                )
            );

            setEditingId(null);
            setEditingName("");

        } catch (error) {

            setError(error.message);

        }
    }


    // Delete category
    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteCategory(token, id);

            setCategories((currentCategories) =>
                currentCategories.filter(
                    (category) => category.id !== id
                )
            );

        } catch (error) {

            setError(error.message);

        }
    }


    if (loading) {

        return (
            <div>
                <h1>Categories</h1>
                <p>Loading categories...</p>
            </div>
        );
    }


    return (
        <div className="categories-page">

            <div className="categories-header">
                <h1>Categories</h1>
                <p>Manage your expense categories</p>
            </div>


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {/* ADD CATEGORY */}

            <form
                className="category-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving
                        ? "Adding..."
                        : "Add Category"}
                </button>

            </form>


            {/* CATEGORY LIST */}

            {categories.length === 0 ? (

                <p>
                    No categories found.
                </p>

            ) : (

                <div className="category-list">

                    {categories.map((category) => (

                        <div
                            className="category-card"
                            key={category.id}
                        >

                            {editingId === category.id ? (

                                <>

                                    <input
                                        type="text"
                                        value={editingName}
                                        onChange={(e) =>
                                            setEditingName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        className="save-button"
                                        onClick={() =>
                                            handleUpdate(
                                                category.id
                                            )
                                        }
                                    >
                                        Save
                                    </button>

                                    <button
                                        className="cancel-button"
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditingName("");
                                        }}
                                    >
                                        Cancel
                                    </button>

                                </>

                            ) : (

                                <>

                                    <span className="category-name">
                                        {category.name}
                                    </span>

                                    <div className="category-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(category)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    category.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Categories;