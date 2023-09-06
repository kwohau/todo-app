import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Modal = ({ mode, setShowModal, task, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  // membuat kondisi bila mode bervalue edit, maka form title dan function yang dijalankan adalah edit
  const editMode = mode === 'edit' ? true : false;

  // state dasar yang digunakan untuk menampung data
  const [data, setData] = useState({
    // bila edit mode, value dasar akan mengikuti data yang ada pada task sesuai yang di call dari api
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  // fungsi untuk menambahkan data
  const postData = async (e) => {
    // agar form tidak refres terus menurus
    e.preventDefault();
    try {
      // memanggil api todos menggunakan metode post dan memasukan informasi dari state data yg ada diatas
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        console.log('data berhasil ditambahkan');
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fungsi untuk mengedit data
  const editData = async (e) => {
    e.preventDefault();
    try {
      // melakukan update task menggunakan parameter task.id sebagai kunciannya
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log('data berhasil diubah');
        // untuk menutup pop up modal saat selesai melakukan update
        setShowModal(false);
        // untuk menampilkan di dashbord apabila ada perubahan data
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fungsi untuk mengubah data dalam state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} a task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task is here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
