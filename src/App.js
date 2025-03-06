import React, { useState } from "react";

const addToCalendar = (title, dateTime) => {
  if (!dateTime) return;
  const event = {
    title: title,
    startDate: new Date(dateTime).toISOString(),
    endDate: new Date(
      new Date(dateTime).getTime() + 60 * 60 * 1000
    ).toISOString(),
    notes: "Applicant Appointment",
  };
  const url = `webcal://addtocalendar.com/?title=${encodeURIComponent(
    event.title
  )}&start=${encodeURIComponent(event.startDate)}&end=${encodeURIComponent(
    event.endDate
  )}&details=${encodeURIComponent(event.notes)}`;
  window.open(url, "_blank");
};

const ApplicantStatusTracker = () => {
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "John Doe",
      status: {
        documents: {
          passport: false,
          photographs: false,
        },
        medical: {
          appointmentDateTime: "",
        },
        FCDO: {
          submittedDate: "",
          expectedDate: "",
        },
        CV: false,
        SaudiPaperwork: {
          contract: false,
          letter: false,
          POA: false,
          visaNumber: false,
        },
        visaIssued: false,
      },
      tasheer: {
        appointmentDateTime: "",
      },
    },
  ]);

  const updateStatus = (id, key, subKey = null, value = null) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id
          ? subKey
            ? {
                ...applicant,
                status: {
                  ...applicant.status,
                  [key]: {
                    ...applicant.status[key],
                    [subKey]: value ?? !applicant.status[key][subKey],
                  },
                },
              }
            : {
                ...applicant,
                status: {
                  ...applicant.status,
                  [key]: value ?? !applicant.status[key],
                },
              }
          : applicant
      )
    );
  };

  const addApplicant = () => {
    const newApplicant = {
      id: applicants.length + 1,
      name: "New Applicant",
      status: {
        documents: {
          passport: false,
          photographs: false,
        },
        medical: {
          appointmentDateTime: "",
        },
        FCDO: {
          submittedDate: "",
          expectedDate: "",
        },
        CV: false,
        SaudiPaperwork: {
          contract: false,
          letter: false,
          POA: false,
          visaNumber: false,
        },
        visaIssued: false,
      },
      tasheer: {
        appointmentDateTime: "",
      },
    };
    setApplicants([...applicants, newApplicant]);
  };

  const deleteApplicant = (id) => {
    setApplicants((prev) => prev.filter((applicant) => applicant.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Applicant Tracker
      </h1>
      <button
        onClick={addApplicant}
        className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg shadow-md transition"
      >
        + Add Applicant
      </button>
      <div className="w-full max-w-md mt-6 space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="bg-white shadow-xl rounded-xl p-5 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={applicant.name}
                onChange={(e) =>
                  setApplicants((prev) =>
                    prev.map((a) =>
                      a.id === applicant.id ? { ...a, name: e.target.value } : a
                    )
                  )
                }
                className="text-lg font-semibold border-b focus:outline-none w-2/3"
              />
              <button
                onClick={() => deleteApplicant(applicant.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm"
              >
                Delete
              </button>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📄 Documents</h3>
              {Object.keys(applicant.status.documents).map((doc) => (
                <label key={doc} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={applicant.status.documents[doc]}
                    onChange={() =>
                      updateStatus(applicant.id, "documents", doc)
                    }
                  />
                  {doc.charAt(0).toUpperCase() + doc.slice(1)}
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📜 Saudi Paperwork</h3>
              {Object.keys(applicant.status.SaudiPaperwork).map((subKey) => (
                <label key={subKey} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={applicant.status.SaudiPaperwork[subKey]}
                    onChange={() =>
                      updateStatus(applicant.id, "SaudiPaperwork", subKey)
                    }
                  />
                  {subKey.replace(/([A-Z])/g, " $1")}
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📅 Appointments</h3>
              <label className="block">
                Medical Appointment
                <input
                  type="datetime-local"
                  className="block w-full rounded-lg border-gray-300 shadow-sm"
                  value={applicant.status.medical.appointmentDateTime}
                  onChange={(e) =>
                    updateStatus(
                      applicant.id,
                      "medical",
                      "appointmentDateTime",
                      e.target.value
                    )
                  }
                />
              </label>
              <button
                onClick={() =>
                  addToCalendar(
                    "Medical Appointment",
                    applicant.status.medical.appointmentDateTime
                  )
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow"
              >
                Save to Calendar
              </button>
              <label className="block">
                Tasheer Appointment
                <input
                  type="datetime-local"
                  className="block w-full rounded-lg border-gray-300 shadow-sm"
                  value={applicant.tasheer.appointmentDateTime}
                  onChange={(e) =>
                    updateStatus(
                      applicant.id,
                      "tasheer",
                      "appointmentDateTime",
                      e.target.value
                    )
                  }
                />
              </label>
              <button
                onClick={() =>
                  addToCalendar(
                    "Tasheer Appointment",
                    applicant.tasheer.appointmentDateTime
                  )
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow"
              >
                Save to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
<h1 className="text-3xl font-bold text-blue-500">Tailwind is Working!</h1>;

export default ApplicantStatusTracker;
