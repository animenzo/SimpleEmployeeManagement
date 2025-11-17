import React, { useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import { DeleteEmployeeByid, GetAllEmployees } from "../api";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [updateEmpObj, setUpdateEmpObj] = React.useState(false);
  const [employeeData, setEmployeeData] = React.useState({
    employees: [],
    pagination: {
      totalEmployees: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 5,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEmployees(search, page, limit);
      // console.log(data.data);
      setEmployeeData(data.data);
    } catch (error) {
      console.log("error fetch emp", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleUpdateEmployee = (empObj) => {
    setUpdateEmpObj(empObj);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (empObj) => {
    try {
      const { success, message } = await DeleteEmployeeByid(empObj._id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchEmployees()
    } catch (error) {
      console.log("error fetch emp", error);
      notify("Failed to delete employee", "error");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    fetchEmployees(term);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            Employee Management
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage employees — add, edit, delete and search quickly.
          </p>
        </header>

        <main className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md ring-1 ring-black/5 overflow-hidden">
          {/* Top controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 border-b border-gray-100 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAddEmployee()}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                + Add Employee
              </button>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Total: {employeeData?.pagination?.totalEmployees ?? 0}</span>
            </div>

            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="sr-only">Search employees</label>
              <div className="relative">
                <input
                  id="search"
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search by name, email or phone..."
                  className="block w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Table area */}
          <div className="p-4">
            <div className="overflow-x-auto">
              <div className="min-w-full bg-white dark:bg-zinc-800 rounded-lg">
                <EmployeeTable
                  handleDeleteEmployee={handleDeleteEmployee}
                  handleUpdateEmployee={handleUpdateEmployee}
                  employees={employeeData?.employees ?? []}
                  pagination={employeeData.pagination}
                  fetchEmployees={fetchEmployees}
                />
              </div>
            </div>
          </div>

          {/* Footer / pagination area */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
              <div>
                Showing <strong>{employeeData?.employees?.length ?? 0}</strong> of <strong>{employeeData?.pagination?.totalEmployees ?? 0}</strong> employees
              </div>
              <div>
                {/* Pagination is handled by EmployeeTable; this area is available for global info or controls */}
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddEmployee
        updateEmpObj={updateEmpObj}
        fetchEmployees={fetchEmployees}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default EmployeeManagementApp;
