// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import ExpenseForm from "./pages/ExpenseForm";
// import Expenses from "./pages/Expenses";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route
//           path="/"
//           element={<h1>ExpenseTrack</h1>}
//         />
// <Route
//     path="/expenses"
//     element={<h1>Expenses</h1>}
// />
// <Route
//     path="/expenses/new"
//     element={<ExpenseForm />}
// />
//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

// <Route
//     path="/dashboard"
//     element={<Dashboard />}
// />

//         <Route
//           path="/expenses"
//           element={<h1>Expenses</h1>}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import ExpenseForm from "./pages/ExpenseForm";
// import Expenses from "./pages/Expenses";
// import EditExpense from "./pages/EditExpense";
// import Categories from "./pages/Categories";
// import ProtectedRoute from "./components/ProtectedRoute";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route
//           path="/"
//           element={<h1>ExpenseTrack</h1>}
//         />
        

//         <Route
//           path="/expenses"
//           element={<Expenses />}
//         />
//         <Route
//     path="/categories"
//     element={<Categories />}
// />

// <Route
//     path="/expenses"
//     element={
//         <ProtectedRoute>
//             <Expenses />
//         </ProtectedRoute>
//     }
// />

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />
//         <Route
//     path="/expenses/:id/edit"
//     element={<EditExpense />}
// />

// <Route
//     path="/dashboard"
//     element={
//         <ProtectedRoute>
//             <Dashboard />
//         </ProtectedRoute>
//     }
// />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExpenseForm from "./pages/ExpenseForm";
import Expenses from "./pages/Expenses";
import EditExpense from "./pages/EditExpense";
import Categories from "./pages/Categories";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<h1>ExpenseTrack</h1>}
        />


        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses/new"
          element={
            <ProtectedRoute>
              <ExpenseForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/expenses/:id/edit"
          element={
            <ProtectedRoute>
              <EditExpense />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;