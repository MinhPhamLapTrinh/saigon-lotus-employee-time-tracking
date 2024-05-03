import { useState } from "react";
import Modal from "react-modal";
import { getBiweeklyEmployeeHour } from "@/lib/employeeData";
import HashLoader from "react-spinners/HashLoader";
Modal.setAppElement("#__next"); // This line is important for accessibility reasons.
export default function BiWeeklyHours() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const handleEndDateChange = (endDate) => {
    setEndDate(endDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await getBiweeklyEmployeeHour(startDate, endDate);
      setEmployeeList(res);
      setModalIsOpen(true);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
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
          <main className="flex flex-col items-center justify-center min-h-screen">
            <form className="w-full max-w-xs" onSubmit={handleSubmit}>
              <section>
                <label
                  htmlFor="startDate"
                  className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  required
                  value={startDate}
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  onChange={(e) => handleStartDateChange(e.target.value)}
                />
              </section>
              <section>
                <label
                  htmlFor="endDate"
                  className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  required
                  value={endDate}
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  onChange={(e) => handleEndDateChange(e.target.value)}
                />
              </section>
              <button
                type="submit"
                className="mt-4 bg-teal-300 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
            </form>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Employee Working Hours"
            >
              <h2 className="text-lg font-semibold">
                Employee Working Hours from{" "}
                <span className="text-blue-600 font-bold">{startDate}</span> to{" "}
                <span className="text-blue-600 font-bold">{endDate}</span>
              </h2>
              <br />
              <br />
              <table className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg divide-y divide-gray-400 min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Total Working Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employeeList.map((employee, index) => {
                    const totalHours = Math.floor(employee.time);
                    const totalMinutes = Math.floor(
                      (employee.time - totalHours) * 60
                    );
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          <span className="flex justify-between items-center w-full">
                            {employee.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          <span className="flex justify-between items-center w-full">
                            {`${totalHours} hours and ${totalMinutes} minutes.`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Modal>
          </main>
        </>
      )}
    </>
  );
}
