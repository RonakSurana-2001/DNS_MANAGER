import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';


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


function UpdateModal({ show, onClose,domainToUpdate,getAllHostZoneNames }) {
  if (!show) {
    return null;
  }

  const [domainInfo, setdomainInfo] = useState({
    comment:domainToUpdate.comment
  })

  console.log(domainInfo)


  const handleChange = (e) => {
    const { name, value} = e.target;
    setdomainInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async () => {
    // e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:3000/hostedZones/updateZone", {
        hostedZoneId:domainToUpdate.Id,
        comment: domainInfo.comment
      })
      if (data.success) {
        // await getAllHostZoneNames()
        console.log(data.message)
        // await onClose()
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
              Update Hosted Zone
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
                  htmlFor="comment"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Comment
                </label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Something..."
                  value={domainInfo.comment}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Hosted Zone
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainDnsPage() {

  const [hostedDomainNames, sethostedDomainNames] = useState([])

  const [showModal, setShowModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [domainToUpdate,setdomainToUpdate]=useState("0")

  const [searchQuery, setSearchQuery] = useState('');

  const [loading,setLoading]=useState(false)



  const getAllHostZoneNames = async () => {
    const { data } = await axios.get("http://localhost:3000/hostedZones/listAllZone")
    console.log(data.message.HostedZones)
    if(data.success){
      sethostedDomainNames(data.message.HostedZones)
      setLoading(false)
    }
    else{
      toast.error("Unable to Load please try again later")
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    getAllHostZoneNames()
  }, [])

  const deleteDomain = async (hId) => {
    try {
      const { data } = await axios.post("http://localhost:3000/hostedZones/deleteZone", {
        hostedZoneId: hId
      })
      if (data.success) {
        await getAllHostZoneNames()
      }
      else {
        console.log("Some Error")
      }
    } catch (error) {
      console.log(error)
    }
    // console.log(hId)
  }


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };


  const filteredDomains = hostedDomainNames.filter(record =>
    record.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.Config.Comment.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>

      <Modal show={showModal} onClose={toggleModal} />

      <UpdateModal show={showUpdateModal} onClose={toggleUpdateModal} domainToUpdate={domainToUpdate} getAllHostZoneNames={getAllHostZoneNames}/>

      <div className='flex flex-col my-4 mx-3'>
        <div className='flex flex-row space-x-3'>
          <button style={{ backgroundColor: "orange", padding: "10px", borderRadius: "5px" }} onClick={toggleModal}>Create Hosted Zones</button>
          <input
            type="text"
            placeholder="Search domain names or comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-4/12"
          />

        </div>
        <div className='mx-3 my-10'>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ border: '2px solid black' }}>
                <th style={{ border: '2px solid black', padding: '8px' }}>Hosted Domain Names</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Type</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Records Count</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Comments</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Edit</th>
                <th style={{ border: '2px solid black', padding: '8px' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains?.length > 0 ? (filteredDomains.map((record, index) =>
                <tr key={index} style={{ border: '2px solid black' }}>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}><Link to={'/dnsRecords' + record.Id}>{record.Name}</Link></td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.Config.PrivateZone == false ? "Public" : "Private"}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.ResourceRecordSetCount}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.Config.Comment.length == 0 ? "-" : record.Config.Comment}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }} onClick={()=>{
                    toggleUpdateModal()
                    setdomainToUpdate({
                      Id:record.Id,
                      comment:record.Config.Comment
                    })
                  }}><FaRegEdit /></td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }} onClick={() => deleteDomain(record.Id)}><MdDelete /></td>
                </tr>
              )) : (
                (loading?<ReactLoading type={"bars"} color={"blue"} height={50} width={200} />:
                <tr>
                  <td>No DNS Records</td>
                </tr>)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MainDnsPage