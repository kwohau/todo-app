import Modal from './Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  // state yang digunakan untuk menentukan Modal akan ditampilkan atau tidak, bila true akan pop up modal
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    console.log('sign out');
    removeCookie('AuthToken');
    removeCookie('Email');

    window.location.reload();
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        {/* button create akan trigger pop up showModal karena showModal berubah menjadi true */}
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signOut" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {/* bila showModal true, akan tampilkan pop up modal  */}
      {showModal && (
        <Modal mode="create" setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
