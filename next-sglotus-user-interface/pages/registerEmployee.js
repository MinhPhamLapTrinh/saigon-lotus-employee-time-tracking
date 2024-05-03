import { useState } from "react";
import { useRouter } from "next/router";
import { AddEmployee } from "@/lib/employeeData";
import HashLoader from "react-spinners/HashLoader";
export default function register() {
  const [employeeName, setEmpoyeeName] = useState("");
  const [uniqueNum, setUniqueNum] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleBackButton = () => {
    setMessage("");
    router.push("/");
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await AddEmployee(employeeName, uniqueNum);
      console.log(result.message);
      setMessage(result.message);
    } catch (err) {
      setMessage(err.message);
    }
    setIsLoading(false);
    setEmpoyeeName("");
    setUniqueNum("");
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="bg-slate-50 flex items-center justify-center min-h-screen fixed inset-0">
            <HashLoader
              color={"#9b38f3"}
              loading={isLoading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : (
        <>
          {message ? (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <p className="text-2xl font-mono text-white font-bold">
                {message}
              </p>
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium 
          text-gray-900 focus:outline-none bg-white rounded-full border 
          border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
          focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
          dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleBackButton}
              >
                Back
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={submitForm}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Employee Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeName"
                    type="text"
                    placeholder="Employee Name"
                    value={employeeName}
                    required
                    onChange={(e) => setEmpoyeeName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    type="password"
                  >
                    Unique Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="uniqueNum"
                    type="password"
                    required
                    placeholder="******************"
                    value={uniqueNum}
                    onChange={(e) => setUniqueNum(e.target.value)}
                  />
                  <p className="text-red-500 text-xs italic">
                    Please choose your unique number
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
              <p className="text-center text-gray-500 text-xs">
                &copy;{new Date().getFullYear()} Saigon Lotus
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
