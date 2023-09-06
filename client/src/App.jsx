import { useEffect, useState } from 'react';
import ListHeader from './component/ListHeader';
import ListItem from './component/ListItem';
import Auth from './component/Auth';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  // console.log(tasks);

  //urutkan berdasarkan tanggal
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {/* passing hasil getData agar data dari api dapat diambil dan diakses listItem di halaman utama*/}
      {!authToken && <Auth />}
      {/* memastikan untuk auth token ada/true agar dapat menampilan dashboard todo list */}
      {authToken && (
        <>
          <ListHeader listName={'My To Do List😄'} getData={getData} />
          {/* menampilkan email user di halaman utama */}
          <p className="user-email">Welcome Back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© 2023 Created by LKHao</p>
    </div>
  );
};

export default App;
