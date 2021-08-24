import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CenteredModal(props) {
  let sum = 0;
  let idx = 0;
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable='true'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Past Typings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id='history-body'>
        {props.history.length === 0 ? (
          <h5>
            what are you waiting for...
            <br />
            <br />
            get typing !
          </h5>
        ) : (
          props.history
            .slice(0)
            .reverse()
            .map(({ wpm, gemsGained, time }) => {
              sum += wpm;
              return (
                <div key={idx++} id='history-entry'>
                  <div id='time-div'>
                    <p id='time'>{time}</p>
                  </div>
                  <div id='wpm'>
                    <h3>{wpm}</h3>
                  </div>
                  <div>
                    <span id='gems-delta'>
                      <h3
                        id='gems-delta-header'
                        style={{
                          color:
                            gemsGained > 0
                              ? 'green'
                              : gemsGained < 0
                              ? 'red'
                              : 'black',
                        }}
                      >
                        {gemsGained > 0 && '+'}
                        {gemsGained}
                      </h3>
                      <pre> </pre>
                      <i id='gem-history-icon' className='bi bi-gem'></i>
                    </span>
                  </div>
                </div>
              );
            })
        )}
      </Modal.Body>
      <Modal.Footer id='history-footer'>
        <p>Average Speed</p>
        {props.history.length ? Math.round(sum / props.history.length) : '?'}
      </Modal.Footer>
    </Modal>
  );
}

const HistoryModal = ({ history }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        className='btn'
        variant='outline-dark'
        onClick={() => setModalShow(true)}
      >
        <i className='bi bi-clock-history'></i>
      </Button>
      <CenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        history={history}
      />
    </>
  );
};

export default HistoryModal;
