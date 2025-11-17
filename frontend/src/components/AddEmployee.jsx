import React, { useEffect, useState } from "react";
import { CreateEmployee, UpdateEmployeeByid } from "../api";
import { notify } from "../utils";

const AddEmployee = ({ showModal, setShowModal, fetchEmployees, updateEmpObj }) => {
  const [employee, setEmployee] = React.useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      profileImage: null,
    });
  };

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (updateEmpObj) {
      setUpdateMode(true);
      setEmployee(updateEmpObj);
    } else {
      setUpdateMode(false);
    }
  }, [updateEmpObj]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setEmployee({
      ...employee,
      profileImage: e.target.files[0],
    });
  };

  //addEmployee
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("employee", employee);
    try {
      const { success, message } = updateMode
        ? await UpdateEmployeeByid(employee, employee._id)
        : await CreateEmployee(employee);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetEmployeeStates();
      fetchEmployees();
    } catch (error) {
      notify("Error while creating employee", "error");
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-700">
          <h5 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {updateMode ? "Update Employee" : "Add Employee"}
          </h5>
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700"
            onClick={handleClose}
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Name</span>
              <input
                type="text"
                placeholder="Full name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Email</span>
              <input
                type="email"
                placeholder="name@example.com"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Phone</span>
              <input
                type="text"
                placeholder="+91 98765 43210"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </label>
          </div>

          {/* Right column */}
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Department</span>
              <input
                type="text"
                placeholder="Department"
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Salary</span>
              <input
                type="text"
                placeholder="Salary"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Profile Image</span>

              <div className="mt-1 flex items-center gap-3">
                <label className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-dashed border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700">
                  <input
                    type="file"
                    placeholder="profile-image"
                    name="profileImage"
                   
                    onChange={handleFileChange}
                    className="sr-only"
                    accept="image/*"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Choose image</span>
                </label>

                <div className="h-12 w-12 rounded-md border border-gray-200 dark:border-zinc-700 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
                  {employee.profileImage ? (
                    // If profileImage is a URL string it will be displayed; if it's a File this won't preview (kept minimal since this change is style-only)
                    typeof employee.profileImage === "string" ? (
                      <img src={employee.profileImage} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="h-6 w-6 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4M3 11h18" />
                      </svg>
                    )
                  ) : (
                    <span className="text-xs text-zinc-400">No image</span>
                  )}
                </div>
              </div>
            </label>

            <div className="mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-md bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {updateMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
