import web3 from './web3';
//const {Web3} = require('web3');
import Ballot from '../ethereum/build/Ballot.json';
//const Ballot = require('./build/Ballot.json')
//const web3 = new Web3("https://sepolia.infura.io/v3/840152b62f154721b04b828a8edcb024")

const ballot = (address) => {
    return new web3.eth.Contract(Ballot.abi, address);
}

export default ballot;