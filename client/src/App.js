import React from "react";
import { Route, Routes } from 'react-router-dom'; 

//components


import Home from "./people/Home"
import ListPeople from "./people/listPeople"
import MainNavigation from "./components/layout/MainNavigation"
import NewPerson from "./people/newPerson"
import EditPerson from "./people/editPerson";
const App = () => {
  return (

    <div>
     
      <MainNavigation />
      <main>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<ListPeople />} />
          <Route path="/newperson" element={<NewPerson />} />
          <Route path="/people/:peopleId" element={<EditPerson />} />
        </Routes>
      </main>
    
    </div>
  );
};


export default App;
