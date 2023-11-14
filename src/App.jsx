/** @format */

import { useState } from "react";

import "./App.css";
import Welcome from "./components/parts/Welcome";
import Login from "./components/Login";
import NotesArea from "./components/NotesArea";
import MakeNotes from "./components/MakeNotes";
import { Route, Routes, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Signup from "./components/parts/Signup";
import SignIn from "./components/parts/SignIn";
import Archive from "./components/Archive";
import ShowNote from "./components/ShowNote";

function App() {
  let [darkTheme, setDarkTheme] = useState(false);
  let [notes, setNotes] = useState([
    {
      id: 1,
      heading: "Note 1",
      body: "This is the body of the first note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 2,
      heading: "Note 2",
      body: "This is the body of the second note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 3,
      heading: "Note 3",
      body: "This is the body of the third note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 4,
      heading: "Note 4",
      body: "This is the body of the fourth note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 5,
      heading: "Note 5",
      body: "This is the body of the fifth note.",
      color: "#545FF6",
    },
  ]);
  let [archiveNotes, setArchiveNotes] = useState([
    {
      id: 1,
      heading: "Note 1",
      body: "This is the body of the first note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 2,
      heading: "Note 2",
      body: "This is the body of the second note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 3,
      heading: "Note 3",
      body: "This is the body of the third note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 4,
      heading: "Note 4",
      body: "This is the body of the fourth note.",
      label: "imp",
      color: "#545FF6",
    },
    {
      id: 5,
      heading: "Note 5",
      body: "This is the body of the fifth note.",
      color: "#545FF6",
    },
  ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="/"
          element={<Login />}>
          <Route
            path=""
            element={<Welcome />}></Route>
          <Route
            path="signup"
            element={<Signup />}></Route>
          <Route
            path="signin"
            element={<SignIn />}></Route>
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
            />
          }></Route>
        <Route
          path="makenote"
          element={
            <MakeNotes
              notes={notes}
              setNotes={setNotes}
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

