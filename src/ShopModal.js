import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Notification = (props) => {
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Body>
        <div>
          <h4>
            <i id='green-notification-icon' className='bi bi-check2-circle'></i>{' '}
          </h4>
          <h5>
            Purchased {props.title},{' '}
            {props.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} gems
            deducted
          </h5>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Item = ({
  gems_balance,
  purchased,
  url,
  name,
  title,
  description,
  cost,
  action,
}) => {
  const [notify, setNotify] = useState(false);
  const invisible =
    title !== 'Purple Drip' && (gems_balance < cost || purchased[name]);

  return (
    <div className='shop-item'>
      <div id='item-picture'>
        <img src={url} alt={title} width='78rem' />
      </div>
      <div id='item-description'>
        <h6>{title}</h6>
        <div>
          <label>{description}</label>
        </div>
      </div>
      <div className='item-button'>
        <Button
          className='item-button'
          id='item-button'
          onClick={() => {
            if (name !== 'purpleDrip' || !purchased[name]) {
              setNotify(true);
              setTimeout(() => setNotify(false), 1800);
            }
            action();
          }}
          variant={invisible ? 'light' : 'primary'}
          style={{
            color: invisible ? '#C0C0C0' : 'white',
          }}
          disabled={invisible}
        >
          {(name === 'purpleDrip' && purchased[name] && 'toggle') ||
            cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          {(name !== 'purpleDrip' || !purchased[name]) && (
            <i id='item-gem-icon' className='bi bi-gem'></i>
          )}
        </Button>
      </div>
      <Notification show={notify} title={title} cost={cost}></Notification>
    </div>
  );
};

const ShopModal = ({ gems_balance, items, purchased }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        className='btn'
        variant='outline-dark'
        onClick={() => setModalShow(true)}
      >
        <i className='bi bi-shop'></i>
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {items.map((item) => (
            <Item
              key={item.id}
              {...item}
              gems_balance={gems_balance}
              purchased={purchased}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <b>Note:</b> power-ups can be used in unison.
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShopModal;
