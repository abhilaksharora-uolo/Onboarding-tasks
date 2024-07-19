import React from "react";
import styled from "styled-components";

const ModalMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Modal = styled.div`
  width: 400px;
  height: 224px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ModalImg = styled.img`
  width: 80px;
  height: 80px;
`;

const SuccessModal = ({ text }) => {
  return (
    <ModalMain>
      <Modal>
        <ModalImg
          src="https://s3-alpha-sig.figma.com/img/afe4/9163/c8cd31c37cf6a026d0c095699cebe9f2?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jrKqvYqN-t2z4xSd7fs3LeNhnCFNO34HGGFE8SY3iRpDRxnMnbAYsPo6gTClKlXmxnnrbU9t71XouNw0oqGNCm7c0oNOU-lhk3F3MNT804xV32goNImV-wzzyzpyktvek~4HUEpLP5ncMqWNIq8DB5zOCpQLDHeOFdZDZkeS4jGP8hkQi8LAgPo3tptQtD9Dkqc2esQ2B0nwtVeodlL2-eURil~3NGLdQM92EqRzV3-wqkM-JVW-lwTonswABLP9FffKT2mzDitT0nBlHdee1aZSvzKjt32-WfftmJPnd48RZQL5KCUafSwpkVmYQ~kY4hRVE-1TpnY~8tTYxlVByw__"
          alt="success"
        />
        <p>{text}</p>
      </Modal>
    </ModalMain>
  );
};

export default SuccessModal;
