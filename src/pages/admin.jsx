
import React, { useState} from 'react';
import instance from "../../ethereum/election_creation";
import web3 from "../../ethereum/web3";
import supabase from "../../supaBase";

const Admin = () => {
  const [electionAddresses, setElectionAddresses] = useState([]);
  const [message, setMessage] = useState('');
  const [candidates, setCandidates] = useState([[]]);
  const [party, setParty] = useState([[]]);
  const [district, setDistrict] = useState("");
  const [hour, setHour] = useState("");

  

  const onSubmit = async (event) => {
    event.preventDefault();
    setCandidates([[]]);
    setParty([[]]);
    setDistrict("");
    setHour("");

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts + " requests");
      await instance.methods.startelec([[candidates]], [[party]], [district], hour).send({
        from: accounts[0]
      });

      setMessage("Election Successfully started.");

      const { data, error } = await supabase.from("candidates").insert([
        { candidate: candidates, party: party, district: district, hour: hour }
      ]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const election = async (event) => {
    event.preventDefault();
    try {
      const electionAddresses = await instance.methods.getsDeployedBallots().call();
      setElectionAddresses(electionAddresses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="container mx-auto mt-8">
          <form onSubmit={onSubmit} className="flex flex-col space-y-4 max-w-sm mx-auto">
            <input
              type="text"
              name="Candidate Name"
              value={candidates}
              onChange={(event) => setCandidates(event.target.value)}
              placeholder="Candidate Name"
              className="bg-neutral-900 border border-neutral-700 text-white py-2 px-4 rounded-md"
            />
             <input
            type="text"
            name="Candidate Party"
            value={party}
            onChange={(event) => setParty(event.target.value)}
            placeholder="Candidate Party"
            className="bg-neutral-900 border border-neutral-700 text-white py-2 px-4 rounded-md"
          />
          <input
            type="text"
            name="District"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            placeholder="District"
            className="bg-neutral-900 border border-neutral-700 text-white py-2 px-4 rounded-md"
          />
          <input
            type="text"
            name="Hour"
            value={hour}
            onChange={(event) =>setHour(event.target.value )}
            placeholder="Hour"
            className="bg-neutral-900 border border-neutral-700 text-white py-2 px-4 rounded-md"
          />
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-4 rounded-md text-white">
              Submit
            </button>
            {message && <p className="text-red-500 mt-2">{message}</p>}
          </form>
        </div>
        <button onClick={election} className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-4 rounded-md text-white">
          Get Election Address
        </button>

        <h2>Election Addresses</h2>
        <ul>
          {electionAddresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Admin;
