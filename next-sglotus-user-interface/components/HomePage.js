import { useState, useEffect } from "react";
import UniqueNumberModal from "./UniqueNumberModal";
import { CheckInEmployee } from "@/lib/employeeData";
import ClockinClockOut from "./ClockinClockout";
import Clock from "./Clock";
import HashLoader from "react-spinners/HashLoader";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [uniqueNumber, setUniqueNumber] = useState(""); // State to store the unique number
  const [selection, setSelection] = useState("");
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Function to handle input change for unique number
  const handleUniqueNumberChange = (number) => {
    setUniqueNumber(uniqueNumber + number);
  };

  // Function to handle selection from employees
  const handleSelectionChange = (e) => {
    const employeeChoice = e.target.value;
    setSelection(employeeChoice);
  };

  // Function to handle removing each digit for unique number
  const removeTheLastDigit = () => {
    setUniqueNumber(uniqueNumber.slice(0, -1));
  };

  // Function to handle first modal submission
  const handleFirstSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setShowModal(false); // Close the first modal after submission
    setShowSecondModal(true); // Open the second modal
  };

  const handleCancelButton = () => {
    setShowModal(false);
    setSelection("");
    setUniqueNumber("");
    setShowSecondModal(false);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSecondModal(false);
    setIsLoading(true);
    try {
      const result = await CheckInEmployee(uniqueNumber, selection);
      setMessage(result.message);
      // Reset the unique number and selection
    } catch (error) {
      setMessage(error.message);
    }
    setIsLoading(false);
    setUniqueNumber("");
    setSelection("");
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      setMessage("");
    }, 2000);
    return () => {
      clearTimeout(timerID);
    };
  }, [message]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
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
                <p className="text-2xl font-mono text-white font-bold">
                  {message}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-mono text-white font-bold">
                  SAIGON LOTUS
                </h1>
                <br />
                <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-lg font-medium 
          text-gray-900 focus:outline-none bg-white rounded-full border 
          border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
          focus:ring-4 focus:ring-gray-100"
                  onClick={() => setShowModal(true)}
                >
                  Get started
                </button>
                <br />
              </>
            )}
            <Clock />
          </>
        )}
      </div>
      {showModal && (
        <UniqueNumberModal
          uniqueNumber={uniqueNumber}
          handleSubmit={handleFirstSubmit}
          isHandleNumberChangeClicked={handleUniqueNumberChange}
          isRemoveDigitClicked={removeTheLastDigit}
          isCancelClicked={handleCancelButton}
        />
      )}
      {showSecondModal && (
        <ClockinClockOut
          handleSecondSubmit={handleSubmit}
          handleSelectionChange={handleSelectionChange}
          isCancelButtonClicked={handleCancelButton}
        />
      )}
    </>
  );
}
