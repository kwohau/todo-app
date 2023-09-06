import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';
import Modal from './Modal';
import { useState } from 'react';

const ListItem = ({ task, getData }) => {
  // menentukan nilai awal modal
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) {
        console.log('data berhasil dihapus');
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(task.progress);

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        {/* mendapatkan task item dari parameter task hasil fetch api dari app */}
        <p className="task-title">{task.title}</p>
        {/* <ProgressBar progress={task.progress} /> */}
      </div>
      <div className="button-container">
        {/* button edit akan trigger pop up showModal karena showModal berubah menjadi true */}
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {/* bila showModal true, akan tampilkan pop up modal dengan mode edit */}
      {showModal && (
        <Modal
          mode="edit"
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </li>
  );
};

export default ListItem;
