import { getAllEmployee } from "@/lib/employeeData";
import EmployeeDetail from "@/components/EmployeeDetail";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { removeEmployee } from "@/lib/employeeData";
export default function EmployeeList() {
  const { data, error } = useSWR("all-employee", getAllEmployee);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);
  const [employeeObj, setEmployeeObj] = useState({});

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const handleButton = (emp) => {
    setEmployeeObj(emp);
    setShowEmployeeDetail(true);
  };

  const handleDelete = async (id) => {
    try {
      await removeEmployee(id);
      mutate("all-employee"); // Re-fetch the data after deleting
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!showEmployeeDetail ? (
        <>
          <br />
          <table className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg divide-y divide-gray-200 min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((employee, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <span className="flex justify-between items-center w-full">
                      {employee.employeeName}
                      <div className="flex justify-between items-center p-4 gap-4 rounded-lg">
                        <button
                          className="text-indigo-700 border border-indigo-600 py-2 px-4 rounded inline-flex items-center"
                          type="button"
                          onClick={() => handleButton(employee)}
                        >
                          View More
                        </button>

                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(employee._id)}
                        >
                          X
                        </button>
                      </div>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <EmployeeDetail employee={employeeObj} />
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium 
          text-gray-900 focus:outline-none bg-white rounded-full border 
          border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
          focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
          dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => setShowEmployeeDetail(false)}
          >
            Back
          </button>
        </>
      )}
      <br />
    </>
  );
}
