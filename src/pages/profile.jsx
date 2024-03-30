import React, {useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import instance from "../../ethereum/election_creation";
import web3 from "../../ethereum/web3";
import ballot from "../../ethereum/ballot";



const Profile = ()=> {
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [district,setDistrict] = useState('');
  const [filteredCandidates,setFilteredCandidates] = useState([]);
  useEffect(()=>{
    const election = async()=> {
      try {
        const accounts = await web3.eth.getAccounts();
        const electionAddresses = await instance.methods.getsDeployedBallots().call();
        const ballotAddresses = []
          for (const address of electionAddresses) {
            const ballotAddress = await ballot(address)
            ballotAddresses.push(ballotAddress)
          }
          console.log("ballot addresses",ballotAddresses)
          const details = [];

          for (const addresses of ballotAddresses)
          {
            const candidateName = await addresses.methods.getCandidateName(0).call()
            const candidateParty = await addresses.methods.getCandidateParty(0).call()
            const district = await addresses.methods.votingDistrict().call()
            details.push({
              name: candidateName,
              party: candidateParty,
              district: district
            });

          }
          console.log("candidate details: ",details);
          setCandidateDetails(details);
          setFilteredCandidates(details); 
      }
      catch (error) {
        console.error("election error",error)
      }
      
    };

    election();

  },[]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    const filtered = candidateDetails.filter(array => array.district === selectedDistrict)
    setFilteredCandidates(filtered);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Candidate Details</h2>
      <div className="mb-4">
        <label htmlFor="district" className="mr-2">Select District:</label>
        <select id="district" value={district} onChange={handleDistrictChange} className="px-2 py-1 border rounded">
          <option value="">All</option>
          <option value="kozhikode">kozhikode</option>
          <option value="ccc">ccc</option>
          <option value="ggg">ggg</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredCandidates.map((candidate, index) => (
          <li key={index} className="py-4">
            <p className="text-lg font-semibold">Candidate Name: {candidate.name}</p>
            <p className="text-gray-600">Candidate Party: {candidate.party}</p>
            <p className='text-white-600'>District: {candidate.district}</p>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default Profile;