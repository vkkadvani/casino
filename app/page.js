"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import ABI from './abi/ABI.json'
import TokenABI from './abi/TokenABI.json'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ethers = require("ethers")

export default function Home() {

  const [option, setOption] = useState(4)
  const [coin, setCoin] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [num, setNum] = useState('00')
  const options = ['Number Greater Than 5', 'Number Less Than 5', 'Number Equal To 5']
  const whitemod_flag = true
  const callOption = (opt) => {
    setOption(opt)
  }

  useEffect(() => {
    console.log('option :', option, ' coin :', coin);
  }, [option, coin])


  async function startGame() {
    console.log("game starting with para : ", option, coin);
    try {
      fireToast("sucess", "test")
      const contractAddress = '0xD76430bebB84EB7dE10F01AE2Bb341b1211B3EfD';
      const TokenAddress = '0x783adA73A6202083C03A90970e9d4C58cC275e6a'
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const walletAddress = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const TokenContract = new ethers.Contract(TokenAddress, TokenABI, signer);
      const balanceBefore = await TokenContract.balanceOf(contractAddress);
      const allowance = await TokenContract.allowance(walletAddress[0], contractAddress);
      if (allowance < coin) {
        setLoading(true)
        const tx = await TokenContract.approve(contractAddress, coin);
        await tx.wait();
        setLoading(false)
      }
      setLoading(true)
      const tx = await contract.bet(option, coin);
      await tx.wait();
      const balanceAfter = await TokenContract.balanceOf(contractAddress);
      const number = await contract.number()
      setLoading(false)
      setNum(Number(number))
      if (balanceBefore < balanceAfter)
        setResult("you are win and get 2X Token");
      else if (balanceBefore > balanceAfter)
        setResult("You Lose..Better Luck Next Time");
    }
    catch (e) {
      let msg = e.message;

      if (await msg.includes("execution reverted: Currently Betting is risky.")) {
        fireToast("error", "Currently Betting is risky.")
        console.log("fire");

      }
    }
    finally {
      setLoading(false)
    }

  }
  async function withdraw() {
    console.log("here you can withdraw ur balance from contract ");
    try {

      tx = await Contract.collectTokenOwner();
      await tx.await()
    }
    catch (e) {
      console.log(e);
    }
  }
  function fireToast(type, msg) {
    if (type == 'error') {
      console.log("called");
      toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: whitemod_flag ? "light" : "dark",
      })
    }
    if (type == 'success') {
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: whitemod_flag ? "light" : "dark",
      })
    }
    if (type == 'warn') {
      toast.warn(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: whitemod_flag ? "light" : "dark",
      });
    }
  }
  return (
    <div className='grid grid-cols-1 w-full text-center p-10 bg-white'>
      <div className='justify-self-center grid grid-cols-4 w-full h-80 bg-red-500 rounded-lg'>
        <div><p className='m-4 font-sans text-white font-bold text-2xl drop-shadow-lg'>CASINO</p></div>
        <div className='col-span-2 pt-10'>
          <p className='text-2xl pt-10'>
            Your Bet
          </p>
          <p className='bg-black text-white rounded-lg'> {options[option - 1]} | Amount : {coin} </p>
          <p className='text-9xl font-mono'>{num}</p>
          <p className="bg-white rounded-full font-sans">{result}</p>
        </div>
        <div className='justify-self-end '>

        </div>
      </div>
      {
        loading
          ?
          <div className='grid grid-cols-1'><Loader className='justify-self-center' /></div>
          :
          <>
            <div className='grid grid-cols-3 h-48 rounded py-10 '>
              <div className='bg-green-500 rounded-lg' >
                <p>
                  Number is greter than 5
                </p>
                <button className='bg-black text-white rounded-lg p-2' onClick={() => callOption(1)}>Select</button>
              </div>
              <div className='bg-yellow-300 rounded-lg mx-10'>
                <p>
                  Number is Equal to 5
                </p>
                <button className='bg-black text-white rounded-lg p-2' onClick={() => callOption(3)}>Select</button>
              </div>
              <div className='bg-blue-500 rounded-lg '>
                <p>
                  Number is less than 5
                </p>
                <button className='bg-black text-white rounded-lg p-2' onClick={() => callOption(2)}>Select</button>
              </div>
            </div>
            <div className='grid grid-cols-5 py-10 '>
              <div className='rounded-full mx-6 grid grid-cols-1 justify-items-center h-fit'>
                <Image
                  src="/coin.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                  className='items-centerr'
                  onClick={() => setCoin(10)} />
                <p>
                  10
                </p>
              </div>
              <div className='rounded-full mx-6 grid grid-cols-1 justify-items-center h-fit'>
                <Image
                  src="/coin.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                  className='items-centerr'
                  onClick={() => setCoin(100)} />
                <p>
                  100
                </p>
              </div>
              <div className='rounded-full mx-6 grid grid-cols-1 justify-items-center  h-fit'>
                <Image
                  src="/coin.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                  className='items-centerr'
                  onClick={() => setCoin(200)} />
                <p>
                  200
                </p>
              </div>
              <div className='rounded-full  mx-6 grid grid-cols-1 justify-items-center  h-fit'>
                <Image
                  src="/coin.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                  className='items-centerr'
                  onClick={() => setCoin(500)} />
                <p>
                  500
                </p>
              </div>
              <div className='rounded-full mx-6 grid grid-cols-1 justify-items-center  h-fit'>
                <Image
                  src="/coin.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                  className='items-centerr'
                  onClick={() => setCoin(1000)} />
                <p>
                  1000
                </p>
              </div>
            </div>
            <div>
              <button className='bg-black text-white rounded-full p-4 px-10 mx-6' onClick={startGame}>Start</button>
              <button className='bg-black text-white rounded-full p-4 px-10 mx-6' onClick={withdraw}>Withdraw</button>
            </div>
          </>
      }
    </div>
  )
}
