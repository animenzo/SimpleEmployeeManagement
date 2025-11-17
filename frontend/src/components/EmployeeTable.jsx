import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employees = [], pagination, fetchEmployees, handleUpdateEmployee, handleDeleteEmployee }) => {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { totalEmployees, totalPages, currentPage, pageSize } = pagination;

  // destructure props correctly
  const TableRow = ({ employee }) => {
    return (
      <tr className="even:bg-white odd:bg-gray-50 dark:even:bg-zinc-800 dark:odd:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-zinc-700 transition-colors">
        <td className="px-4 py-3 align-top">
          <Link
            to={`/employee/${employee._id}`}
            className="inline-flex items-center gap-3 no-underline text-indigo-600 hover:underline"
          >
            {/* small avatar if available */}
           
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{employee.name}</span>
          </Link>
        </td>

        <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200 wrap-break-word">{employee.email}</td>
        <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200">{employee.phone}</td>
        <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200">{employee.department}</td>

        <td className="px-4 py-3 text-right space-x-2">
          <button
            type="button"
            aria-label={`Edit ${employee.name}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-indigo-600 text-indigo-600 rounded-md text-sm hover:bg-indigo-50 dark:hover:bg-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onClick={() => handleUpdateEmployee(employee)}
          >
            Edit
          </button>

          <button
            type="button"
            aria-label={`Delete ${employee.name}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-red-500 text-red-600 rounded-md text-sm hover:bg-red-50 dark:hover:bg-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => handleDeleteEmployee(employee)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  const pageNumbers = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };
  const handlePagination = (pageNum) => {
    fetchEmployees("", pageNum, pageSize);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-zinc-700">
        <table className="w-full min-w-[720px] table-auto">
          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="text-left px-4 py-3 text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="p-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No employees to show.
                </td>
              </tr>
            ) : (
              employees.map((emp) => <TableRow key={emp._id} employee={emp} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">{employees.length}</span> of{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{totalEmployees ?? 0}</span>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50 dark:bg-zinc-900/40"
                : "border-gray-300 bg-white hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700"
            }`}
          >
            Prev
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                className={`px-3 py-1 rounded-md text-sm ${
                  pageNum === currentPage
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-gray-50"
                }`}
                onClick={() => handlePagination(pageNum)}
                aria-current={pageNum === currentPage ? "page" : undefined}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50 dark:bg-zinc-900/40"
                : "border-gray-300 bg-white hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700"
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </>
  );
};

export default EmployeeTable;
