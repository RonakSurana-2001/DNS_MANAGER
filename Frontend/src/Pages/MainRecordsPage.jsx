import React, { useEffect, useState } from 'react'
import axios from "axios"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../../Styles/dropdowncontent.css"
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';

function Modal({ show, onClose, getAllRecordNames }) {
  if (!show) {
    return null;
  }

  const [currType, setcurrType] = useState("Select Type")

  const [domainInfo, setdomainInfo] = useState({
    domainName: "",
    recordValue: "",
    ttl: "",
    type: currType,
    hostedZoneId: window.location.pathname.slice(23)
  })


  const [isOpen, setisOpen] = useState(false)

  useEffect(() => {
    setdomainInfo(prevState => ({
      ...prevState,
      type: currType
    }));
  }, [currType]);

  const handleChange = (e) => {
    setdomainInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dns = domainInfo.recordValue.split(',');
    const formattedRecords = dns.map(record => ({ Value: record }));
    try {
      const { data } = await axios.post("http://localhost:3000/dnsRecords/createRecord", {
        dnsName: domainInfo.domainName,
        recordValue: formattedRecords,
        ttl: Number(domainInfo.ttl),
        type: domainInfo.type,
        hostedZoneId: domainInfo.hostedZoneId
      })
      if (data.success) {
        getAllRecordNames();
        toast.success("Record Created Successfully")
        onClose();
      }
      else {
        toast.error("Not Created")
      }
    } catch (error) {
      toast.error("Enter Credentials Correctly")
    }
  }

  const listType = ['A', 'AAAA', 'CNAME', 'MX', ' NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DS']

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-md p-4 max-h-full mb-20">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Record
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
                  Record Value
                </label>
                <input
                  type="text"
                  name="recordValue"
                  id="recordValue"
                  placeholder="1.1.1.1"
                  value={domainInfo.recordValue}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="ttl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  TTL
                </label>
                <input
                  type="text"
                  name="ttl"
                  id="ttl"
                  placeholder="1-300"
                  value={domainInfo.ttl}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <div className="dropdown">
                  <button id="dropdownButton" className="dropdown-toggle" type="button" onClick={() => setisOpen(!isOpen)}>{currType}</button>
                  {isOpen && <div id="dropdownContent" className="dropdown-content">
                    {listType.map((val, id) =>
                      <div key={id} onClick={() => setcurrType(val)}>{val}</div>
                    )}
                  </div>}
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Record
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


function UpdateModal({ show, onClose, getAllRecordNames, updateModalInfo }) {
  if (!show) {
    return null;
  }


  const [currType, setcurrType] = useState(updateModalInfo.Type)

  const [domainInfo, setdomainInfo] = useState({
    domainName: updateModalInfo.Name,
    recordValue: updateModalInfo.ResourceRecords.map(record => record.Value).join(', '),
    ttl: updateModalInfo.TTL,
    type: currType,
    hostedZoneId: window.location.pathname.slice(23)
  })


  const [isOpen, setisOpen] = useState(false)

  useEffect(() => {
    setdomainInfo(prevState => ({
      ...prevState,
      type: currType
    }));
  }, [currType]);

  const handleChange = (e) => {
    setdomainInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dns = domainInfo.recordValue.split(',');
    const formattedRecords = dns.map(record => ({ Value: record }));
    try {
      const { data } = await axios.post("http://localhost:3000/dnsRecords/updateRecord", {
        dnsName: domainInfo.domainName,
        recordValue: formattedRecords,
        ttl: Number(domainInfo.ttl),
        type: domainInfo.type,
        hostedZoneId: domainInfo.hostedZoneId
      })
      if (data.success) {
        getAllRecordNames();
        toast.success("Record Updated Successfully")
        onClose();
      }
      else {
        toast.error("Not Created")
      }
    } catch (error) {
      toast.error("Enter details Correctly")
    }
  }

  const listType = ['A', 'AAAA', 'CNAME', 'MX', ' NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DS']

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-md p-4 max-h-full mb-20">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Record
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
                  Record Value
                </label>
                <input
                  type="text"
                  name="recordValue"
                  id="recordValue"
                  placeholder="1.1.1.1"
                  value={domainInfo.recordValue}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="ttl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  TTL
                </label>
                <input
                  type="text"
                  name="ttl"
                  id="ttl"
                  placeholder="1-300"
                  value={domainInfo.ttl}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <div className="dropdown">
                  <button id="dropdownButton" className="dropdown-toggle" type="button" onClick={() => setisOpen(!isOpen)}>{currType}</button>
                  {isOpen && <div id="dropdownContent" className="dropdown-content">
                    {listType.map((val, id) =>
                      <div key={id} onClick={() => setcurrType(val)}>{val}</div>
                    )}
                  </div>}
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Record
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

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [updateModalInfo, setupdateModalInfo] = useState()

  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(false)



  const getAllRecordNames = async (e) => {
    const { data } = await axios.post(`http://localhost:3000/dnsRecords/listRecords/${window.location.pathname.slice(23)}`)
    if (data.success) {
      sethostedDomainNames(data.message.ResourceRecordSets)
      setLoading(false)
    }
    else {
      toast.error("Unable to Load please try again later")
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    getAllRecordNames()
  }, [])

  const deleteDomain = async (record) => {
    try {
      const { data } = await axios.post("http://localhost:3000/dnsRecords/deleteRecord", {
        dnsName: record.Name,
        recordValue: record.ResourceRecords,
        ttl: Number(record.TTL),
        type: record.Type,
        hostedZoneId: window.location.pathname.slice(23)
      })
      if (data.success) {
        await getAllRecordNames()
        toast.success("Record Deleted Successfully")
      }
      else {
        // console.log(data.message)
        toast.error("Unable to Delete")
      }
    } catch (error) {
      // console.log(error)
      toast.error("Some Error Occurred")
    }
  }


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };


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

      <Modal show={showModal} onClose={toggleModal} getAllRecordNames={getAllRecordNames} />

      <UpdateModal show={showUpdateModal} onClose={toggleUpdateModal} getAllRecordNames={getAllRecordNames} updateModalInfo={updateModalInfo} />

      <div className='flex flex-col my-4 mx-3'>
        <div className='flex flex-row space-x-3'>
          <button style={{ backgroundColor: "orange", padding: "10px", borderRadius: "5px" }} onClick={toggleModal}>Create Record</button>
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
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }} onClick={() => {
                    toggleUpdateModal(),
                      setupdateModalInfo(record)
                  }
                  }><FaRegEdit /></td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }} onClick={() => deleteDomain(record)}><MdDelete /></td>
                </tr>
              )) : (
                (
                  loading ? <ReactLoading type={"bars"} color={"blue"} height={50} width={200} /> :
                    <tr>
                      <td>No Records</td>
                    </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MainRecordsPage