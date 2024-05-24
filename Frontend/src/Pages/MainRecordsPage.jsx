import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Modal({ show, onClose }) {
  if (!show) {
    return null;
  }

  const [domainInfo, setdomainInfo] = useState({
    domainName: "",
    description: "",
    isPrivate: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setdomainInfo((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    console.log(domainInfo)
  }

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/hostedZones/createZone", {
        domainName: domainInfo.domainName,
        description: domainInfo.description,
        isPrivate: domainInfo.isPrivate
      })
      if (data.success) {
        console.log(data.message)
      }
      else {
        console.error("Not Created")
      }
    } catch (error) {
      console.log("Some Error Occurred")
    }
  }

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-md p-4 max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Hosted Zone
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="domainName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Domain Name
                </label>
                <input
                  type="text"
                  name="domainName"
                  id="domainName"
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="www.domain.com" value={domainInfo.domainName}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Something..."
                  value={domainInfo.description}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="isPrivate"
                      name="isPrivate"
                      type="checkbox"
                      onChange={handleChange}
                      checked={domainInfo.isPrivate}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="isPrivate"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Mark Private
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Hosted Zone
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainRecordsPage() {

  const [hostedDomainNames, sethostedDomainNames] = useState([])

  const [showModal, setShowModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');



  const getAllRecordNames = async () => {
    const { data } = await axios.post(`http://localhost:3000/dnsRecords/listRecords/${window.location.pathname.slice(23)}`)
    console.log(data.message.ResourceRecordSets)
    sethostedDomainNames(data.message.ResourceRecordSets)
  }

  useEffect(() => {
    getAllRecordNames()
  }, [])

  // const deleteDomain = async (hId) => {
  //   try {
  //     const { data } = await axios.post("http://localhost:3000/hostedZones/deleteZone", {
  //       hostedZoneId: hId
  //     })
  //     if (data.success) {
  //       await getAllHostZoneNames()
  //     }
  //     else {
  //       console.log("Some Error")
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   console.log(hId)
  // }


  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };


  const filteredDomains = hostedDomainNames.filter((record) => {
    if (record.Name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    if (record.ResourceRecords?.length > 0) {
      return record.ResourceRecords.some((val) =>
        val.Value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  });


  return (
    <>
      {/* <Modal show={showModal} onClose={toggleModal} /> */}
      <div className='flex flex-col my-4 mx-3'>
        <div className='flex flex-row space-x-3'>
          <button style={{ backgroundColor: "orange", padding: "10px", borderRadius: "5px" }}>Create Record</button>
          <input
            type="text"
            placeholder="Search by Record Name or Value/Route traffic to..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-4/12"
          />

        </div>
        <div className='mx-3 my-10'>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ border: '2px solid black' }}>
                <th style={{ border: '2px solid black', padding: '8px' }}>Record Name</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Type</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Value/Route traffic to</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>TTL</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Edit</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains?.length > 0 ? (filteredDomains.map((record, index) =>
                <tr key={index} style={{ border: '2px solid black' }}>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.Name}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.Type}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{
                    record.ResourceRecords?.length > 0 ? record.ResourceRecords.map((val, index) =>
                      <p key={index}>
                        {val.Value}
                      </p>
                    ) : <div key={index}>-</div>
                  }</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.TTL}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }}><FaRegEdit /></td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }}><MdDelete /></td>
                </tr>
              )) : (
                <tr>
                  <td>No DNS Records</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MainRecordsPage