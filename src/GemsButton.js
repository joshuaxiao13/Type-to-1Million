import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Notification = (props) => {
  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Body className='notification'>
        <h4>
          <i
            id='green-notification-icon'
            className='bi bi-currency-exchange'
          ></i>{' '}
          Balance:{' '}
          {props.gems_balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </h4>
      </Modal.Body>
    </Modal>
  );
};

const GemsButton = ({ gems_balance }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        id='gems-button'
        variant='outline-primary'
        size='sm'
        onMouseEnter={() => {
          setModalShow(true);
          setTimeout(() => setModalShow(false), 1500);
        }}
      >
        <p id='gems-balance'>
          {gems_balance >= 1000000
            ? Math.floor(gems_balance / 100000) / 10 + 'M'
            : gems_balance >= 10000
            ? Math.floor(gems_balance / 1000) + 'K'
            : gems_balance >= 1000
            ? Math.floor(gems_balance / 100) / 10 + 'K'
            : gems_balance}
        </p>
        <i id='gem-balance-icon' className='bi bi-gem'></i>
      </Button>
      <Notification show={modalShow} gems_balance={gems_balance} />
    </>
  );
};

export default GemsButton;
