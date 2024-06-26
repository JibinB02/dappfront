//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;


contract Electioncreation {
    address[] public deployedBallots;
    function startelec (string[][] memory candidates,string[][] memory party, string[] memory district , uint hour) public {
        
        for(uint i =0;i<district.length;i++)
            {
            Ballot newBallot=new Ballot (candidates[i],party[i], district[i], msg.sender, hour);
            // a = newBallot.getAddress();
            deployedBallots.push(address(newBallot));
            }
        }
    function getsDeployedBallots() public view returns( address[] memory)
    {return deployedBallots;}
}

contract Ballot 
{ 
struct candidate
{
    string name;
    string party;
    uint voteCount;
    uint creationDate;
    uint expirationDate;
}

candidate[] public candidates;
address public manager;
string public votingDistrict;
mapping (address => bool) public voters;
modifier restricted() 
{
require(msg.sender== manager);
_;
}
constructor (string[] memory candidateNames,string[] memory candidateParty, string memory district, address creator, uint amountofHours) 
{
manager = creator;
votingDistrict = district;
for(uint i=0; i< candidateNames.length;i++)
    {
    candidates.push(candidate(
    {   
        name: candidateNames[i],
        party: candidateParty[i],
        voteCount: 0,
        creationDate: block.timestamp,
        expirationDate: block.timestamp + amountofHours
    }));
    }
    //LogAddr(address(this));
}
function vote(uint index) public
    {
    require(! voters[msg.sender]);
  //  if(now>candidates[index].expirationDate)
  //  {
  //  revert();
   // }
    candidates[index].voteCount +=1;
    voters[msg.sender] = true;
    }

function getCandidateName(uint index) public view returns (string memory)
{
    require(block.timestamp>candidates[index].expirationDate);
    return candidates[index].name;
}
function getCandidateParty(uint index) public view returns (string memory)
{
    require(block.timestamp>candidates[index].expirationDate);
    return candidates[index].party;
}

function getVoteCount(uint index)
public restricted view
returns(uint)
{
require(block.timestamp>candidates[index].expirationDate);
    return candidates[index].voteCount;
}

}