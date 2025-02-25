import React, { useState } from 'react'
import { FaHome } from "react-icons/fa"
import { MdOutlineReorder, MdTableBar } from "react-icons/md"
import { CiCircleMore } from "react-icons/ci"
import { BiSolidDish } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'


const BottomNav = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questCount, setQuestCount] = useState(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => {
    if(questCount >= 6) return;
    setQuestCount((prev) => prev + 1);
  }
  const decrement = () => {
    if(questCount <= 0) return;
    setQuestCount((prev) => prev - 1);
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around'>
      <button onClick={() => navigate('/')} className='flex items-center justify-center text-[#f5f5f5] bg-[#343434] w-[200px] rounded-[20px] '> <FaHome className='inline mr-2' size={30}/> <p>Home</p> </button>
      <button onClick={() => navigate('/orders')} className='flex items-center justify-center text-[#ababab] w-[200px]'> <MdOutlineReorder className='inline mr-2' size={30}/> <p>Orders</p> </button>
      <button onClick={() => navigate('/tables')} className='flex items-center justify-center text-[#ababab] w-[200px]'> <MdTableBar className='inline mr-2' size={30}/> <p>Tables</p> </button>
      <button className='flex items-center justify-center text-[#ababab] w-[200px]'> <CiCircleMore className='inline mr-2' size={30}/> <p>More</p></button>
      <button 
        onClick={openModal}
        className='absolute bottom-6 bg-[#f6b100] text-[#f5f5f5] rounded-full p-3 items-center'><BiSolidDish size={40} />
        </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title='Create Order'>
        <div>
          <label className='block text-[#ababab] mb-2 text-sm font-medium'>Customer Name</label>
          <div className='flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
            <input type="text" name='' placeholder='Enter Customer Name' id='' className='bg-transparent flex-1 text-white focus:outline-none'/>
          </div>
        </div>
        <div>
          <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Customer Phone</label>
          <div className='flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
            <input type="number" name='' placeholder='Enter Customer Phone' id='' className='bg-transparent flex-1 text-white focus:outline-none'/>
          </div>
        </div>
        <div>
          <label className='block mb-2 mt-3 text-sm font-medium text-[#ababab]'>Guest</label>
          <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg'>
            <button onClick={decrement} className='text-yellow-500 text-2xl'>&minus;</button>
            <span className='text-white'>{questCount} Person</span>
            <button onClick={increment} className='text-yellow-500 text-2xl'>&#43;</button>
          </div>
        </div>
        <button onClick={() => navigate("/tables")} className='w-full bg-[#f68100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700'>
          Create Order
        </button>
      </Modal>
    </div>
  )
}

export default BottomNav