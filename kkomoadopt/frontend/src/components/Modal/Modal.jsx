import styled from "styled-components";
import Button from "../Button/Button";
import {AnimatePresence, motion} from "framer-motion";
import "./Modal.css";


const Modal = ({
    isOpen, 
    closeModal, 
    onConfirm, 
    confirmText = "확인", 
    cancelText = "취소",
    children,
    modalText,
    zIndex=1050,
    inPut}) => {

        const handleOverlayClick = (e) =>{
            if(e.target === e.currentTarget){
                closeModal();
            }
        }
        return (
          <div
            className={`modal-overlay ${isOpen ? "is-open" : ""}`}
            onClick={handleOverlayClick}
            style={{zIndex : zIndex}}
          >
              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    className="modal-content"
                    initial={{opacity:0, y: "-50%" }}
                    animate={{opacity:1, y: 0 }}
                    exit={{opacity : 0}}
                    transition={{ duration: 0.5 }}
                    style={{ zIndex: zIndex + 10 }}
                  >
                    <p>{modalText}</p>
                    {inPut}
                    {children}
                    <div className="button-container">
                    {cancelText &&(
                      <Button text={confirmText} onClick={onConfirm}></Button>
                    )}
                    {confirmText &&(
                      <Button text={cancelText} onClick={closeModal}></Button>
                    )}
                    </div>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        };
export default Modal;