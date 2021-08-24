import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const numberofWords = [20, 30, 40, 50];

const SettingsModal = ({ updateNumberOfWords, updateGoalWpm }) => {
  const [goalWpm, setGoalWpm] = useState(50);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        className='btn'
        variant='outline-dark'
        onClick={() => setModalShow(true)}
      >
        <i className='bi bi-sliders'></i>
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        scrollable='true'
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id='settings'>
            <label id='settings-number-of-words'>Number of Words</label>
            <ButtonGroup id='numberOfWords'>
              {numberofWords.map((num) => {
                return (
                  <Button
                    key={num}
                    variant='primary'
                    onClick={() => updateNumberOfWords(num)}
                  >
                    {num}
                  </Button>
                );
              })}
            </ButtonGroup>
          </div>
          <div id='settings-goal-wpm'>
            <input
              id='settings-input-range'
              type='range'
              value={goalWpm}
              onChange={(evt) => {
                setGoalWpm(evt.target.value);
                updateGoalWpm(Number(evt.target.value));
              }}
              min='30'
              max='200'
              step='5'
            />
            <label for='settings-input-range'>
              Goal wpm: <b>{goalWpm}</b>
            </label>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SettingsModal;
