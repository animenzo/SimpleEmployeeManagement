import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notify } from '../utils'
import { CreateEmployee, GetEmployeeByid } from '../api'

const EmployeeDetails = () => {
  const {id} = useParams()
  const [empDetails,setEmpDetails] = React.useState({});
  console.log(empDetails);
  
  const navigate = useNavigate();
  const fetchEmpById = async(employee)=>{
       try {
           const {data}=   await GetEmployeeByid(id);
            setEmpDetails(data);

       } catch (error) {
           notify("Error while creating employee","error");
       }
  }
  useEffect(()=>{
    fetchEmpById();
  },[])
  return (
    <div className="min-h-[60vh] py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden ring-1 ring-black/5">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Employee Details</h2>
            <button
              onClick={() => navigate('/employee')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-zinc-200 dark:bg-zinc-700 dark:border-zinc-600 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-600"
            >
              ← Back to List
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              {/* Image */}
              <div className="shrink-0 mb-6 md:mb-0 flex items-center justify-center">
                {empDetails.profileImage ? (
                  <img
                    src={empDetails.profileImage}
                    alt={empDetails.name || "Profile image"}
                    className="h-36 w-36 rounded-lg object-cover border border-gray-200 dark:border-zinc-700 shadow-sm"
                  />
                ) : (
                  <div className="h-36 w-36 rounded-lg border-2 border-dashed border-gray-200 dark:border-zinc-700 flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                    No image
                  </div>
                )}
              </div>

              {/* Details grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Name</p>
                    <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">{empDetails.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Email</p>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200 wrap-break-word">{empDetails.email || '-'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Phone</p>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{empDetails.phone || '-'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Department</p>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{empDetails.department || '-'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Salary</p>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{empDetails.salary ?? '-'}</p>
                  </div>

                  {/* placeholder for future fields */}
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Employee ID</p>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{empDetails._id || id || '-'}</p>
                  </div>
                </div>

                {/* Action buttons for desktop under details */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => navigate('/employee')}
                    className="px-4 py-2 rounded-md bg-white border border-zinc-200 dark:bg-zinc-700 dark:border-zinc-600 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-600"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => navigate(`/employee/edit/${empDetails._id || id}`)}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default EmployeeDetails
