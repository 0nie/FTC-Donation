import React from 'react'
import ModalWrapperSide from '../../../../partials/modal/ModalWrapperSide';
import { FaTimesCircle } from 'react-icons/fa';

const ModalAddSettingsCategory = (setIsModal) => {

    const [animate, setAnimate] = React.useState("translate-x-full");

    const handleClose = () => {
        setAnimate('translate-x-full');
        setTimeout(() => {
            setIsModal(false);
        }, 200)
       
    };
  return (
    <>
        <ModalWrapperSide handleClose={handleClose} className={`${animate}`}/>
        <div className="relative mb-4 modal__header">
            <h3>{itemEDIT ? "Update" : "Add"} Category</h3>
            <button type='button' className='absolute top-0 right-0'>
                <FaTimesCircle className='text-lg'/>
            </button>
        </div>
        <ModalWrapperSide/>
    </>
  )
}

export default ModalAddSettingsCategory
