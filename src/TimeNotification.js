import Modal from 'react-bootstrap/Modal';

const TimeNotification = (props) => {
  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Body className='notification'>
        <h4>
          {props.message !== null &&
            (props.message === '20 seconds left' ? (
              <i
                id='twenty-second-notification'
                className='bi bi-exclamation-triangle-fill'
              ></i>
            ) : (
              <i id='timer-notification' className='bi bi-alarm-fill'></i>
            ))}{' '}
          {props.message}
        </h4>
      </Modal.Body>
    </Modal>
  );
};

export default TimeNotification;
