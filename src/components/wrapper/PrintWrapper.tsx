import { ReactNode, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";

interface DoctorData {
  doctorName?: string | "";
  clinicName?: string | "";
  degree?: string | "";
  registrationNumber?: string | "";
  emailId?: string | "";
  clinicNumber?: string | "";
  clinicAddress?: string | "";
  clinicLogo?: string | "/Logo.svg";
  signaturePhoto?: string | "/Logo.svg";
}

interface PatientInfo {
  patient_unique_Id?: string | "";
  last_visited?: string | "";
  first_name?: string | "";
  last_name?: string | "";
  mobile_number?: string | "";
  gender?: string | "";
  age?: number | 0;
  street_address?: string | "";
  city?: string | "";
  state?: string | "";
  zip?: string | "";
}

const PrintWrapper = ({
  children,
  doctorData,
  patientData,
  time,
}: {
  children: ReactNode;
  doctorData: DoctorData;
  patientData: PatientInfo;
  time: any;
}) => {
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
    @page { 
      size: A4; 
      margin: 5mm; 
      background: white;
        }
        body {
          -webkit-print-color-adjust: exact;
        }
        .print-container {
          position: relative;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .print-footer {
          content: 'This report generated by DardiBook software';
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 10px;
          color: gray;
        }
        .bg-cover {
          position: absolute;
          top: 25%;
          left: 25%;
          width: 50%;
          background-image: url('/Logo.svg');
          aspect-ratio:266/389;
          opacity: 0.1;
          z-index: -1;
        }
        .bottom-line {
        position: fixed !important;
        }
        .page-break {
        page-break-before: always;
      }
        .hide-this-compoo{
        display:none;
        }
      `,
    bodyClass: "bg-white",
    documentTitle: `${patientData?.first_name} ${patientData?.last_name}`,
  });
  // const downloadPrint = () => {};
  return (
    <div className="join-item flex flex-col">
      <div className="w-full flex flex-row justify-end gap-2 sm:pr-10 mb-4">
        <button
          onClick={handlePrint}
          className="border-gray-200 btn animate-none hover:border-gray-300 btn-success join-item text-sm font-semibold leading-6 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* <button
          onClick={downloadPrint}
          className="border-gray-200 btn btn-md animate-none hover:border-gray-300 btn-neutral text-sm font-semibold text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
      </div>
      <div className="custom-zoom w-full flex items-center justify-center">
        <div
          ref={printRef}
          id="componentToPrint"
          className="relative print-container w-full px-8 py-4 font-sans max-w-[800px] border-2 border-gray-400 shadow-lg rounded-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <Image
                src={doctorData?.clinicLogo || ""}
                alt="Clinic Logo"
                width={96}
                height={96}
                className="w-24"
              />
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">{doctorData?.clinicName}</h2>
              <p className="text-sm">{doctorData?.clinicAddress}</p>
              <p className="text-sm">Email: {doctorData?.emailId}</p>
              <p className="text-sm">Phone: {doctorData?.clinicNumber}</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
            <table className="w-full border-collapse border border-gray-400">
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-1 pl-2 font-medium">
                    ID
                  </td>
                  <td className="border border-gray-400 p-1 pl-2">
                    {patientData?.patient_unique_Id}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 pl-2 font-medium">
                    Visited Time
                  </td>
                  <td className="border border-gray-400 p-1 pl-2">
                    {new Date(time ? time : "").toLocaleString("en-GB")}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 pl-2 font-medium">
                    Name
                  </td>
                  <td className="border border-gray-400 p-1 pl-2">
                    {patientData?.first_name} {patientData?.last_name}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 pl-2 font-medium">
                    Age
                  </td>
                  <td className="border border-gray-400 p-1 pl-2">
                    {patientData?.age}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 pl-2 font-medium">
                    Gender
                  </td>
                  <td className="border border-gray-400 p-1 pl-2">
                    {patientData?.gender}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 pl-2 font-medium">
                    Address
                  </td>
                  <td className="border border-gray-400 p-1 pl-2">
                    {[
                      patientData?.street_address,
                      patientData?.city,
                      patientData?.state,
                      patientData?.zip,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 pl-2 font-medium">
                    Mobile
                  </td>
                  <td className="border border-gray-400 p-1 pl-2">
                    {patientData?.mobile_number}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {children}
          <div className="text-right mt-0">
            <Image
              src={doctorData?.signaturePhoto || ""}
              alt="Doctor Signature"
              width={48}
              height={48}
              className="w-12 inline-block mt-2"
            />
            <p className="font-medium">{doctorData?.doctorName}</p>
            <p className="font-medium">{doctorData?.degree}</p>
            <p className="font-medium">{doctorData?.registrationNumber}</p>
          </div>
          <div className="absolute bottom-line bottom-0 w-full text-center print-footer">
            This report generated by DardiBook software
          </div>
          <div className="fixed top-[25%] left-[25%] w-1/2 aspect-[266/389] bg-cover opacity-50 z-[10]"></div>
        </div>
      </div>
    </div>
  );
};

export default PrintWrapper;
