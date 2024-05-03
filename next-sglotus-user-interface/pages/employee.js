import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetEmployeeByUniqueNum } from "@/lib/employeeData";
import EmployeeDetail from "@/components/EmployeeDetail";
import HashLoader from "react-spinners/HashLoader";
export default function Employee() {
  const router = useRouter();
  const [uniqueNum, setUniqueNum] = useState("");
  const [employeeObject, setEmployeeObject] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleUniqueNumChange = (e) => {
    const value = e.target.value;
    setUniqueNum(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await GetEmployeeByUniqueNum(uniqueNum);
      setEmployeeObject(result);
    } catch (err) {
      setMessage("Incorrect Unique Number");
    }
    setIsLoading(false);
    setUniqueNum("")
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      setMessage("");
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [message]);

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
            <>
              <p className="text-2xl font-mono text-white font-bold flex items-center justify-center min-h-screen">
                {message}
              </p>
            </>
          ) : (
            <>
              {employeeObject.employeeName ? (
                <>
                  <EmployeeDetail employee={employeeObject} />
                  <div className="flex justify-center mt-4">
                    <button
                      type="button"
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium 
          text-gray-900 focus:outline-none bg-white rounded-full border 
          border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
          focus:ring-4 focus:ring-gray-100"
                      onClick={() => router.push("/")}
                    >
                      Back
                    </button>
                  </div>
                </>
              ) : (
                <form
                  className="flex flex-col items-center justify-center min-h-screen"
                  onSubmit={handleSubmit}
                >
                  <div className="flex items-center bg-white border-b border-teal-500 shadow-2xl py-2">
                    <input
                      className="appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="password"
                      placeholder="Your Unique Number"
                      aria-label="Unique Number"
                      id={uniqueNum}
                      value={uniqueNum}
                      onChange={handleUniqueNumChange}
                      required
                    />
                    <button
                      className="flex-shrink-0 bg-violet-400 hover:bg-violet-700 border-violet-400 hover:border-violet-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="submit"
                    >
                      Sign In
                    </button>
                    <button
                      className="flex-shrink-0 border-transparent border-4 text-violet-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
