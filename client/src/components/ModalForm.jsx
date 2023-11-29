import React from 'react'
import { IoCloseOutline } from "react-icons/io5";

const ModalForm = (props) => {
  return (
    <div>
        { props.modalType != "delete-modal" && 
            <div id={props.id} className={`bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 w-full h-full z-20 ${(props.id == props.modalType) && props.showModal ? "block" : "hidden"}`}>
                <div className="flex justify-center items-center w-screen h-screen">
                    <div className="bg-white w-4/5 h-fit max-h-[80%] overflow-y-auto max-w-xl opacity-100 rounded-md">
                        <div className="flex justify-between items-center border-b px-5 py-3">
                            <h1 className="text-sm font-bold sm:text-base md:text-lg">{ props.title }</h1>
                            <IoCloseOutline onClick={() => props.setShowModal(!props.showModal)} className="cursor-pointer text-lg font-medium sm:text-xl md:text-lg" />
                        </div>

                        <div className="px-5 py-3">
                            { props.children }
                        </div>
                    </div>
                </div>
            </div>
        }

        { props.modalType == "delete-modal" &&
            <div id={props.id} className={`bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 w-full h-full z-20 ${(props.id == props.modalType) && props.showModal ? "block" : "hidden"}`}>
                <div className="flex justify-center items-start pt-20 w-screen h-screen">
                    <div className="bg-white w-4/5 max-w-sm opacity-100 rounded-md">
                        <div className="flex justify-between items-center border-b px-5 py-3">
                            <h1 className="text-sm font-bold sm:text-base md:text-lg">{ props.title }</h1>
                            <IoCloseOutline onClick={() => props.setShowModal(!props.showModal)} className="cursor-pointer text-lg font-medium sm:text-xl md:text-lg" />
                        </div>

                        <div className="px-5 py-3">
                            { props.children }
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
    
  )
}

export default ModalForm