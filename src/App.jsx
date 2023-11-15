/** @format */

import { useEffect, useState } from "react";

import "./App.css";
import Welcome from "./components/parts/Welcome";
import Login from "./components/Login";
import NotesArea from "./components/NotesArea";
import MakeNotes from "./components/MakeNotes";
import {
  Route,
  Routes,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Signup from "./components/parts/Signup";
import SignIn from "./components/parts/SignIn";
import Archive from "./components/Archive";
import ShowNote from "./components/ShowNote";
import { db, auth } from "./components/config/firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  documentId,
} from "firebase/firestore";

function App() {
  let [userEmail, setUserEmail] = useState("");
  let [data, setData] = useState();
  let [darkTheme, setDarkTheme] = useState(false);
  let [notes, setNotes] = useState([]);
  let [archiveNotes, setArchiveNotes] = useState([]);

  console.log(auth?.currentUser?.email, notes, archiveNotes, userEmail)
  useEffect(() => {
    if (userEmail) {
      let documentRef = (doc(db, "stickyNotes", userEmail));
      const userData = async () => {
        try {
          const item = await getDoc(documentRef);
          if (item.data()) {
            setData(item.data());
            setNotes(item.data().notes);
            setArchiveNotes(item.data().archiveNotes);
          }
        } catch (error) {
          console.error(error);
        }
      };
      userData();
    }
  }, [userEmail]);
  console.log(auth?.currentUser?.email, notes, archiveNotes, userEmail)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="/"
          element={<Login />}>
          <Route
            path=""
            element={
              <Welcome
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              />
            }></Route>
          <Route
            path="signup"
            element={
              <Signup
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              />
            }></Route>
          <Route
            path="signin"
            element={
              <SignIn
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              />
            }></Route>
        </Route>
        <Route
          path="/home"
          element={
            <NotesArea
              notes={notes}
              setNotes={setNotes}
              archiveNotes={archiveNotes}
              setArchiveNotes={setArchiveNotes}
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
              userEmail={userEmail}
            />
          }></Route>
        <Route
          path="makenote"
          element={
            <MakeNotes
              notes={notes}
              setNotes={setNotes}
              userEmail={userEmail}
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
              archiveNotes={archiveNotes}
            />
          }></Route>
        <Route
          path="edit"
          element={
            <MakeNotes
              notes={notes}
              setNotes={setNotes}
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
              archiveNotes={archiveNotes}
              userEmail={userEmail}
              edit={1}
            />
          }></Route>
        <Route
          path="archive"
          element={
            <Archive
              notes={notes}
              setNotes={setNotes}
              archiveNotes={archiveNotes}
              setArchiveNotes={setArchiveNotes}
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
              userEmail={userEmail}
            />
          }></Route>
        <Route
          path="show"
          element={
            <ShowNote
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
            />
          }></Route>
      </Route>
    )
  );

  return (
    <>
      <div
        className="body1"
        style={{ background: darkTheme ? "#778899" : " rgb(194, 223, 248)" }}>
        <div
          className="main-container"
          style={{
            background: darkTheme ? "#2C3333" : "#fff",
            color: darkTheme ? "white" : "#000",
          }}>
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;
