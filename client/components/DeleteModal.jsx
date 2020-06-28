import React from 'react';
import { Modal, Button } from 'react-materialize';


const modalTrigger = <button type="button" href="#delete-modal" node="button" className="editItinerary">Delete List</button>

const DeleteModal = (props) => {
  const { handleDeleteList, currentListId } = props;

  return (
    <Modal
      actions={[
        // <button type="button" node="button" className="modal-close editItinerary">Cancel</button>
        // <button type="button" node="button" className="modal-close editItinerary" onClick={() => handleDeleteList(currentListId)}>Confirm</button>
        <Button flat modal="close"  node="button" waves="green" className="editItinerary" onClick={() => handleDeleteList(currentListId)}>Confirm</Button>,
        <Button flat modal="close"  node="button" waves="green" className="editItinerary">Close</Button>
      ]}
      id="delete-modal"
      className="modal"
      header="Confirm Deletion"
      trigger={modalTrigger}
    >
        <div className="modal-content">
            <p>Are you sure you want to delete this list?</p>
        </div>
    </Modal>
  );
};

export default DeleteModal;
