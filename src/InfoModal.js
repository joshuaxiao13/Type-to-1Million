import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InfoModal = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        className='btn'
        variant='outline-dark'
        onClick={() => setModalShow(true)}
      >
        <i className='bi bi-info-circle-fill'></i>
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        scrollable='true'
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className='info-header'>What Is Type To 1Million?</h2>
          <div>
            <p>
              Type to 1Million <b>isn't your typical typing experience</b>.
              Here, you not only track and improve your typing speed, but earn
              gems along the way to purchase power-ups and work your way up to 1
              million gems to reveal the mystery prize. Type to 1Million is{' '}
              <b>typing made fun</b>.
            </p>
          </div>
          <br></br>
          <h2 className='info-header'>How It Works</h2>
          <div>
            <p>
              Set a goal for your typing speed in Settings. You can change your
              goal at any time. Speed is tracked the moment you begin typing.
              When you match or surpass your goal, you earn an amount of gems
              equal to your goal. You must type all words correctly before
              moving onto the next typing. If you fall short, you'll lose an
              amount of gems directly proportional to your goal and the
              difference you were from the goal.
            </p>
            <p id='second-paragraph'>
              In other words, the larger you set your goal and the lower you are
              from your goal, the more gems you lose. But don't set your goal
              too low, or you won't earn gems fast enough. Your balance will
              never drop below 0. Purchase power-ups and customizations to earn
              gems faster.
            </p>
          </div>
          <div>
            <a
              href='https://github.com/joshuaxiao13'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-github'></i>
            </a>{' '}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InfoModal;
