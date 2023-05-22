import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid grid-cols-1 w-full text-center'>
      <div className='justify-self-center w-full'>Display </div>
      <div className='grid grid-cols-3'>
        <div>+</div>
        <div>=</div>
        <div>-</div>
      </div>
      <div className='grid grid-cols-4'>
        <div>10</div>
        <div>20</div>
        <div>30</div>
        <div>40</div>
      </div>
    </div>
  )
}
