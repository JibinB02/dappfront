import React, {useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import instance from "../../ethereum/election_creation";
import web3 from "../../ethereum/web3";
import ballot from "../../ethereum/ballot";



const Profile = ()=> {
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [district,setDistrict] = useState('');
  const [filteredCandidates,setFilteredCandidates] = useState([]);
  const [voteCount,setVoteCount] = useState(0)
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(null);

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

  const handleVote = async(candidate) => {
    try {
        console.log("candidate name",candidate.name)
        console.log("candidate district",candidate.district)
        console.log("candidate party",candidate.party)
        const accounts = await web3.eth.getAccounts();
        for ( const [index,candidateDetail] of candidateDetails.entries()) {
          if (candidateDetail.name === candidate.name && candidateDetail.party === candidate.party && candidateDetail.district === candidate.district) {
            const deployedballots = await instance.methods.deployedBallots(index).call()
            //console.log("deployedBallots",deployedballots)
            const ballots = await ballot(deployedballots) 
            await ballots.methods.vote(0).send({
              from: accounts[0],
              gas:"1000000"
            })
        }
    }
  }
    catch (error) {
      console.error("error voting ",error)
    }
  }

  const handleVoteCount = async(candidate,index) => {
    try {
        console.log("candidate name",candidate.name)
        console.log("candidate district",candidate.district)
        console.log("candidate party",candidate.party)
        const accounts = await web3.eth.getAccounts();
        for ( const [index1,candidateDetail] of candidateDetails.entries()) {
          console.log("index",index1,candidateDetail)
          if (candidateDetail.name === candidate.name && candidateDetail.party === candidate.party && candidateDetail.district === candidate.district) {
            const deployedballots = await instance.methods.deployedBallots(index1).call()
            console.log("deployedBallots",deployedballots)
            const ballots = await ballot(deployedballots) 
            const candidates = await ballots.methods.candidates(0).call();
            console.log(candidates)
            if(candidates.creationDate < candidates.expirationDate)
            {
                const voteCount = await ballots.methods.getVoteCount(0).call({
                  from: accounts[0]
                })
                const votecount1 = Number(voteCount)
                setVoteCount(votecount1)
                setSelectedCandidateIndex(index);
            }
            
        }
    }
  }
    catch (error) {
      console.error("error voting ",error)
    }
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
            {selectedCandidateIndex === index && <p>Vote Count: {voteCount}</p>}
            <div>
                <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={() => handleVote(candidate)}>Vote
            </button>
            </div>

            <div>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={() => handleVoteCount(candidate,index)}>Get Vote Count
            </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  )

}

export default Profile;