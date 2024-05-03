import { getToken } from "./authenticate";
export async function CheckInEmployee(uniqueNum, selection) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/check-in/`, {
    method: "POST",
    body: JSON.stringify({
      pin: uniqueNum,
      selection: selection,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function GetEmployeeByUniqueNum(uniqueNum) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/employee/${uniqueNum}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function AddEmployee(name, uniqueNum) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/add-employee`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      uniqueNum: uniqueNum,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function getAllEmployee() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/all-employee`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function updateEmployeeWorkingTime(
  empID,
  time,
  field,
  recordID,
  totalHours
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/update-employee/${empID}`,
    {
      method: "PUT",
      body: JSON.stringify({
        time: time,
        field: field,
        recordID: recordID,
        totalHours: totalHours,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken()}`,
      },
    }
  );
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function getBiweeklyEmployeeHour(startDate, endDate) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/biweekly-work-report`,
    {
      method: "POST",
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken()}`,
      },
    }
  );
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function removeEmployee(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/all-employee/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message);
  }
}
