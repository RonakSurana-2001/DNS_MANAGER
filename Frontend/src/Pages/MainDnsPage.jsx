import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';
import Papa from 'papaparse';


function Modal({ show, onClose,getAllHostZoneNames }) {
  if (!show) {
    return null;
  }

  const [isOpen, setisOpen] = useState(false)

  const listType = ["us-east-1", "us-east-2", "us-west-1", "us-west-2", "eu-west-1", "eu-west-2", "eu-west-3", "eu-central-1", "eu-central-2", "ap-east-1", "me-south-1", "us-gov-west-1", "us-gov-east-1", "us-iso-east-1", "us-iso-west-1", "us-isob-east-1", "me-central-1", "ap-southeast-1", "ap-southeast-2", "ap-southeast-3", "ap-south-1", "ap-south-2", "ap-northeast-1", "ap-northeast-2", "ap-northeast-3", "eu-north-1", "sa-east-1", "ca-central-1", "cn-north-1", "af-south-1", "eu-south-1", "eu-south-2", "ap-southeast-4", "il-central-1", "ca-west-1"]

  const [currType, setcurrType] = useState("Select VPC Region")

  const [domainInfo, setdomainInfo] = useState({
    domainName: "",
    description: "",
    isPrivate: false,
    vpcId: "",
    vpcRegion: currType
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setdomainInfo((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  useEffect(() => {
    setdomainInfo((prevState) => ({
      ...prevState,
      vpcRegion: currType,
    }));
  }, [currType]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (domainInfo.isPrivate == false) {
      try {
        const { data } = await axios.post("https://dns-manager-s2o7.onrender.com/hostedZones/createZone", {
          domainName: domainInfo.domainName,
          description: domainInfo.description,
          isPrivate: domainInfo.isPrivate
        })
        if (data.success) {
          console.log(data.message)
          await getAllHostZoneNames()
          await onClose()
        }
        else {
          console.error("Not Created")
        }
      } catch (error) {
        console.log("Some Error Occurred")
      }
    }
    else {
      try {
        const { data } = await axios.post("https://dns-manager-s2o7.onrender.com/hostedZones/createZone/privateZone", {
          domainName: domainInfo.domainName,
          description: domainInfo.description,
          isPrivate: domainInfo.isPrivate,
          vpcId: domainInfo.vpcId,
          vpcRegion: domainInfo.vpcRegion
        })
        if (data.success) {
          console.log(data.message)
          await getAllHostZoneNames()
        }
        else {
          console.error("Not Created")
        }
      } catch (error) {
        console.log("Some Error Occurred")
      }
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

              {/* For Private */}
              {domainInfo.isPrivate ?

                <div>
                  <label
                    htmlFor="vpcId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    VPC Id
                  </label>
                  <input
                    type="text"
                    name="vpcId"
                    id="vpcId"
                    placeholder="Something..."
                    value={domainInfo.vpcId}
                    onChange={handleChange}
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>

                : ""
              }

              {domainInfo.isPrivate ?
                <div>
                  <div className="dropdown">
                    <button id="dropdownButton" className="dropdown-toggle" type="button" onClick={() => setisOpen(!isOpen)}>{currType}</button>
                    {isOpen &&
                      <div id="dropdownContent" className="dropdown-content">
                        {listType.map((val, id) =>
                          <div key={id} onClick={() => setcurrType(val)}>{val}</div>
                        )}
                      </div>
                    }
                  </div>
                </div>
                : ""}

              {/*End Private*/}

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


function UpdateModal({ show, onClose, domainToUpdate, getAllHostZoneNames }) {
  if (!show) {
    return null;
  }

  const [domainInfo, setdomainInfo] = useState({
    comment: domainToUpdate.comment
  })

  console.log(domainInfo)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setdomainInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async () => {
    // e.preventDefault()
    try {
      const { data } = await axios.post("https://dns-manager-s2o7.onrender.com/hostedZones/updateZone", {
        hostedZoneId: domainToUpdate.Id,
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

  const [domainToUpdate, setdomainToUpdate] = useState("0")

  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(false)

  const [csvData, setCsvData] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  function unformatUrl(formattedUrl) {
    const unescapeMap = {
      '\\072': ':',
      '\\057': '/'
    };
    const standardUrl = formattedUrl.replace(/\\072|\\057/g, match => unescapeMap[match]);

    return standardUrl;
  }


  const getAllHostZoneNames = async () => {
    const { data } = await axios.get("https://dns-manager-s2o7.onrender.com/hostedZones/listAllZone")
    if (data.success) {
      data.message.HostedZones.map((record) => {
        record.Name = unformatUrl(record.Name)
      })
      sethostedDomainNames(data.message.HostedZones)
      setLoading(false)
    }
    else {
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
      const { data } = await axios.post("https://dns-manager-s2o7.onrender.com/hostedZones/deleteZone", {
        hostedZoneId: hId
      })
      if (data.success) {
        await getAllHostZoneNames()
      }
      else {
        toast.error("Unable to delete")
      }
    } catch (error) {
      toast.error("Unable to delete")
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

  const UploadFn = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error('No file selected.');
      return;
    }

    const fileType = file.name.split('.').pop().toLowerCase();
    if (fileType !== 'csv' && fileType !== 'json') {
      toast.error('Please upload a CSV or JSON file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      if (fileType === 'csv') {
        Papa.parse(fileContent, {
          complete: (result) => {
            console.log('Parsed CSV data:', result.data);
            setCsvData(result.data);
          },
          header: true,
        });
      } else if (fileType === 'json') {
        try {
          const parsedData = JSON.parse(fileContent);
          console.log('Parsed JSON data:', parsedData);
          setJsonData(parsedData);
          setCsvData(parsedData); 
        } catch (error) {
          toast.error('Error parsing JSON file.');
        }
      }
    };
    
    reader.onerror = (e) => {
      console.error('Error reading file:', e);
      toast.error('Error reading file.');
    };

    reader.readAsText(file);
  };



  const conversionFn = async () => {
    const res = JSON.stringify(csvData, null, 2);
    setJsonData(res);
    const jsonParsed = JSON.parse(res);
    if (jsonParsed.length > 0) {
      jsonParsed.map((data) =>
        uploadHostedZones(data)
      )
    }
    await getAllHostZoneNames()
    await window.location.reload()
  };

  const uploadHostedZones = async (domainInfo) => {
    console.log(domainInfo)
    try {
      const { data } = await axios.post("https://dns-manager-s2o7.onrender.com/hostedZones/createZone", {
        domainName: domainInfo.domainName,
        description: (domainInfo.Comment).length < 0 ? "" : domainInfo.Comment,
        isPrivate: false
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

  function unformatUrl(formattedUrl) {
    const unescapeMap = {
      '\\072': ':',
      '\\057': '/'
    };
    const standardUrl = formattedUrl.replace(/\\072|\\057/g, match => unescapeMap[match]);
    return standardUrl;
  }



  return (
    <>

      <Modal show={showModal} onClose={toggleModal} getAllHostZoneNames={getAllHostZoneNames}/>

      <UpdateModal show={showUpdateModal} onClose={toggleUpdateModal} domainToUpdate={domainToUpdate} getAllHostZoneNames={getAllHostZoneNames} />

      <div className='flex flex-col my-4 mx-3'>
        <div className='flex flex-row space-x-3 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
          <button className="bg-yellow-400 p-2 max-sm:p-3 rounded-sm max-sm:w-1/2" onClick={toggleModal}>Create Hosted Zones</button>

          <div className='w-2/4 flex flex-row justify-between max-sm:mt-2 max-md:flex max-md:flex-col max-md:w-4/5 bg-gray-100'>
            <input
              type="file"
              onChange={UploadFn}
              style={{
                padding: "10px"
              }}
            />
            <button
              className="button max-sm:mt-2"
              onClick={conversionFn}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }} 
            >
              Upload
            </button>
          </div>


          <input type="text" placeholder="Search domain names or comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg max-sm:mt-2 max-sm:w-full sm:w-3/6"
          />
        </div>
        <div className='my-10 overflow-auto rounded-lg'>
          <table className='w-full'>
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
            <tbody className=' md:text-sm'>
              {filteredDomains?.length > 0 ? (filteredDomains.map((record, index) =>
                <tr key={index} style={{ border: '2px solid black' }}>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}><Link to={'/dnsRecords' + record.Id}>{record.Name}</Link></td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.Config.PrivateZone == false ? "Public" : "Private"}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.ResourceRecordSetCount}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>{record.Config.Comment.length == 0 ? "-" : record.Config.Comment}</td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }} onClick={() => {
                    toggleUpdateModal()
                    setdomainToUpdate({
                      Id: record.Id,
                      comment: record.Config.Comment
                    })
                  }}><FaRegEdit /></td>
                  <td style={{ border: '2px solid black', padding: '8px', textAlign: 'center', cursor: "pointer" }} onClick={() => deleteDomain(record.Id)}><MdDelete /></td>
                </tr>
              )) : (
                (loading ? <ReactLoading type={"bars"} color={"blue"} height={50} width={200} /> :
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