import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "../Button/Button";

const ModalEx = ()=>{

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const [confirmModal, setConfirmModal] = useState(false);
    const [modalZIndex, setModalZIndex] = useState(1050);
    const [selectedOption, setSelectedOption] = useState("");
    
  
    const openModal = () => {
        setIsModalOpen(true); 
        setModalZIndex(1050);};
    const closeModal = () => setIsModalOpen(false);
  
    const handleConfirm = () => {
    //   alert("삭제되었습니다.")
        setConfirmModal(true);
        setModalZIndex(1100);
      closeModal();
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
    }

    const handleDropdownChange = (e) => {
      setSelectedOption(e.target.value);
    };

    return(
        <>
        <Button text={"삭제"} onClick={openModal}></Button>
        { confirmModal &&(
             <Modal
                isOpen={confirmModal}
                closeModal={closeConfirmModal}
                modalText={"삭제되었습니다."}
                confirmText={null}
                cancelText={null}
                zIndex={modalZIndex + 10}
                >
                <Button text={"확인"} onClick={closeConfirmModal}></Button>
                </Modal>
        )}    
        <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            onConfirm={handleConfirm}
            modalText={"정말 삭제하시겠습니까?"}
            inPut={
            <>
              <input
                type='password'
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                placeholder='비밀번호를 입력하세요'
              />
              <select value={selectedOption} onChange={handleDropdownChange}>
              <option value="">옵션을 선택하세요</option>
              <option value="option1">옵션 1</option>
              <option value="option2">옵션 2</option>
              <option value="option3">옵션 3</option>
            </select>
              </>
            }
            confirmText="확인"
            cancelText="취소"
            zIndex={modalZIndex}
        />
      </>
    )
}
export default ModalEx;