import { useState } from "react";
import { readToken } from "@/lib/authenticate";
import { updateEmployeeWorkingTime } from "@/lib/employeeData";
export default function EmployeeDetail({ employee }) {
  const [newRecord, setNewRecord] = useState(employee.timeRecord);
  let token = readToken();

  const handleChange = async (idx, recordID, field, value, storedTime) => {
    let totalHours = 0;
    const newValues = [...newRecord];
    const newTime = new Date(storedTime);
    const [hours, minutes] = value.split(":");
    newTime.setHours(hours, minutes);
    newValues[idx][field] = newTime.toISOString();
    setNewRecord(newValues);
    if (field == "startTime") {
      totalHours =
        (new Date(newValues[idx].endTime).getTime() -
          new Date(newTime).getTime()) /
        (1000 * 60 * 60);
    } else if (field == "endTime") {
      totalHours =
        (new Date(newTime).getTime() -
          new Date(newValues[idx].startTime).getTime()) /
        (1000 * 60 * 60);
    }
    try {
      await updateEmployeeWorkingTime(
        employee._id,
        newValues[idx][field],
        field,
        recordID,
        totalHours
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {token ? (
        <>
          <div className="flex flex-col">
            <div className="text-2xl font-bold mb-4">
              Employee: {employee.employeeName}
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-b from-gray-200">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          Start Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          End Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          Total Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employee.timeRecord?.map((record, index) => {
                        const date = new Date(record.date).toDateString();
                        const start = new Date(record.startTime).getTime();
                        const end = new Date(record.endTime).getTime();
                        const totalWorkingHours =
                          (end - start) / (1000 * 60 * 60);
                        const totalHours = Math.floor(totalWorkingHours);
                        const totalMinutes = Math.floor(
                          (totalWorkingHours - totalHours) * 60
                        );
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {" "}
                              {date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="time"
                                value={new Date(
                                  record.startTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    record._id,
                                    "startTime",
                                    e.target.value,
                                    record.date
                                  )
                                }
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="time"
                                value={new Date(
                                  record.endTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    record._id,
                                    "endTime",
                                    e.target.value,
                                    record.date
                                  )
                                }
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {record.endTime
                                ? `${totalHours} hours and ${totalMinutes} minutes.`
                                : "0"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="text-2xl font-bold mb-4">
              Employee: {employee.employeeName}
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-b from-gray-200">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          Start Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          End Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          Total Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employee.timeRecord?.map((record, index) => {
                        const date = new Date(record.date).toDateString();
                        const start = new Date(record.startTime).getTime();
                        const end = new Date(record.endTime).getTime();
                        const totalWorkingHours =
                          (end - start) / (1000 * 60 * 60);
                        const totalHours = Math.floor(totalWorkingHours);
                        const totalMinutes = Math.floor(
                          (totalWorkingHours - totalHours) * 60
                        );
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {" "}
                              {date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(record.startTime).toLocaleTimeString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {record.endTime ? new Date(record.endTime).toLocaleTimeString(): "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {record.endTime
                                ? `${totalHours} hours and ${totalMinutes} minutes.`
                                : "0"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
