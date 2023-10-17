import React, {useEffect, useState} from 'react';
import {useHttpClient} from '../components/hooks/http-hook';
import {Link} from 'react-router-dom';
import ErrorModal from './ErrorModal';

import {Button, Modal, Alert} from "react-bootstrap";

import moment from 'moment';


import LoadingSpinner from '../components/UIElements/LoadingSpinner';



const ListPeople = (props) => {
  const { isLoading, error, sendRequest, clearError, responseMessage } = useHttpClient();
  const [people, setPeople] = useState([]);
 
  
 


  const [personMessage, setPersonMessage] = useState(null);
  const [show, setShow]= useState(false);
  const [deletedId,setDeletedId]=useState("");
  const [search, setSearch] = useState({
    id: '',
    firstname: '',
    lastname: '',
    dateofbirth: ''
  });




  const refreshPage=() => {
    window.location.reload();
  }
  
const handleClose =()=>{
  setShow(false)
}

const handleClickDelete =(id)=> {
  setDeletedId(id)
  setPersonMessage(`The Person '${deletedId}' was deleted successfully.`);
  setShow(true)
  console.log(id)
}

  
  useEffect(() => {
      const fetchPeople = async () => {
        try {
          const responseData = await sendRequest(
            'http://192.168.2.6:5000/people'
          );
          setPeople(responseData);
         
        } catch (err) {}
      }; 
      fetchPeople();
    
}, [sendRequest]);

  

const deletePerson= async (deletedId) => {
 
  try {
    setShow(false);
    await sendRequest(`http://192.168.2.6:5000/people/${deletedId}`, 'DELETE');
    props.onDelete(props.id);

  } catch (err) {}
  setPeople(people.filter((people) => people.id !== deletedId));
};


const isEmptySearch = () => {
  return search.id === '' && search.firstname === '' && search.lastname === '' && search.dateofbirth === '';
};
 
const clearSearch = () => {
  setSearch({
    id: '',
    firstname: '',
    lastname: '',
    dateofbirth: ''
  });
};

const searchPeople = async () => {
  if (isEmptySearch()) {
    refreshPage()
  } else {
    
    console.log(search)
    try {
      
      const responseData  = await sendRequest('http://192.168.2.6:5000/people/search', 'POST', JSON.stringify(search), {
        'Content-Type': 'application/json'
      });
        const resultCount = responseData.length;
        setPeople(responseData);
        if(responseMessage){
        setPersonMessage(`Search Succesfull!Found ${resultCount} results`)
        }

    } catch (err) {}
    
  }
  clearSearch()
};
  

    // // Μεθοδος για την ταξινόμηση αλφαβητικά
    const sortTable = () => {
      
      const sortedPeople = [...people];
  
      
      sortedPeople.sort((a, b) => a.lastname.localeCompare(b.lastname));
  
      
      setPeople(sortedPeople);
    };
  
    const sortAlphabetically = () => {
      const sortedPeople = [...people];
      sortedPeople.sort((a, b) => a.firstname.localeCompare(b.firstname));
      setPeople(sortedPeople);
    };
  
    const sortByNewestDate = () => {
      const sortedPeople = [...people];
      sortedPeople.sort((a, b) => new Date(b.dateofbirth) - new Date(a.dateofbirth));
      setPeople(sortedPeople);
    };
    
    const sortByOldestDate = () => {
      const sortedPeople = [...people];
      sortedPeople.sort((a, b) => new Date(a.dateofbirth) - new Date(b.dateofbirth));
      setPeople(sortedPeople);
    };
  
    const sortReverseByFirstname = () => {
      const sortedPeople = [...people];
      sortedPeople.sort((a, b) => b.firstname.localeCompare(a.firstname));
      setPeople(sortedPeople);
    };
    
    const sortReverseByLastname = () => {
      const sortedPeople = [...people];
      sortedPeople.sort((a, b) => b.lastname.localeCompare(a.lastname));
      setPeople(sortedPeople);
    };
  
 
   
  

               
    return (
      <React.Fragment>
     
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
        
      )}
       <div className="container pt-3">

       
       <form className="form-horizontal">
      <div className="form-group">
        
        <input
  type="text"
  value={search.id}
  placeholder='ID'

  onChange={e => setSearch({ ...search, id: e.target.value || "" })}
/>

<input
  type="text"
  value={search.firstname}
  placeholder='Firstname'

  onChange={e => setSearch({ ...search, firstname: e.target.value || "" })}
/>
 
 
<input
  type="text"
  value={search.lastname}
  placeholder='Lastname'
  onChange={e => setSearch({ ...search, lastname: e.target.value || "" })}
/>
      
<input
  type="date"
  value={search.dateofbirth}
  onChange={e => setSearch({ ...search, dateofbirth: e.target.value || "" })}
/>
</div>
<div className="form-group">

<button type="button" className="btn btn-info"  onClick={searchPeople}>
  <i className="fa fa-search"/> SEARCH
         </button>
  
      </div>   
</form>
        
       <div className="btn-group">
   
   <button className="btn btn-primary" onClick={sortAlphabetically}>Sort Alphabetically by First Name</button>
   <button className="btn btn-primary" onClick={sortReverseByFirstname}>Sort Reverse by Firstname</button>
   
   
   <button className="btn btn-primary" onClick={sortTable}>Sort Alphabetically Βy last Name</button>
   <button className="btn btn-primary" onClick={sortReverseByLastname}>Sort Reverse by Lastname</button>
   
   <button className="btn btn-primary" onClick={sortByNewestDate}>Sort by Newest Date</button>
   
   <button className="btn btn-primary" onClick={sortByOldestDate}>Sort by Oldest Date</button>
   
</div>   

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>DeleteConfirmation</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{`Are you sure you want to delete the person with id: ${deletedId}`}</div>
</Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={() => deletePerson(deletedId)}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



            {responseMessage &&  <Alert variant="success">{personMessage}</Alert>}
            
        
            <table className="table">
        <thead>
          <tr>
          <th className="th-sm">ID</th>
          <th className="th-sm">FIRSTNAME</th>
          <th className="th-sm">LASTNAME</th>
          <th className="th-sm">DATEOFBIRTH</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
 
    {people && people.map((person) => (
      <tr key={person.id} className="table-row">
        <td>{person.id}</td>
        <td>{person.firstname}</td>
        <td>{person.lastname}</td>
        <td>{moment(person.dateofbirth).format('DD-MM-YYYY')}</td>
        <td>
          <Link to={`/people/${person.id}`} className="btn btn-warning">
            <i className="fa fa-pencil" /> Edit
          </Link>
        </td>
        <td> 
          <button className="btn btn-danger" onClick={()=>handleClickDelete(person.id)}>
          <i className="fa fa-trash" />  Delete
          </button>
        </td>
      </tr>
    ))}
  
</tbody>
    </table>
    
     </div>

    
    
    </React.Fragment>
    )
};

export default ListPeople; 