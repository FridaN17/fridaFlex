import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Data from './Data';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import './list.css'
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
const List = () => {
    const [data, setData]=useState(Data)
    //function to count all the statuses of the jobsite
        const countCompleted = (data) => {
            return data.filter(item => item.status === "Completed").length;
        };
        const countOnhold = (data) => {
            return data.filter(item => item.status === "OnHold").length;
        };
        const countProgress = (data) => {
            return data.filter(item => item.status === "InProgress").length;
        };
        const completedCount = countCompleted(data);
        const onholdCount = countOnhold(data);
        const progressCount = countProgress(data);

        //Use state for the modal, imported from bootstrap.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        //CODE for creating a new jobsite
    const[xhobsite, setXhobsite]=useState('');
    const[statusi, setStatusi]=useState('');
    const[categori, setCategori]=useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        const newObj = {
            jobsite : xhobsite,
            status : statusi,
            category : categori,
        }
        setXhobsite('');
        setCategori('');
        setStatusi('');

        setData([...data, newObj])
        setShow(false)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const filteredData = data.filter(item =>
        item.jobsite.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

  return (
    <div id='List'>
        <div className='listHeader'>
            <div className='header three'><h1>{progressCount} In Progress</h1></div>
            <div className='header two'><h1>{completedCount} Completed</h1></div>
            <div className='header one'><h1>{onholdCount} On Hold</h1></div>
        </div>
        <div className='listFilters'>
        <input type="text" 
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        placeholder='Search Jobsite Name' />
        <button className='button createButton' onClick={handleShow}>
        Create <FaPlus />
      </button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Jobsite</th>
                    <th>Status</th>
                    {/* <th>Category</th> */}
                </tr>
            </thead>
            <tbody>
                {filteredData.map((list, index)=>{
                    return (
                         <tr  key={index}>
                    <td><Link to={`/dashboard/${list.jobsite}`}>{list.jobsite}</Link></td>
                    <td><button className={`label label-${list.status}`}>{list.status}</button></td>
                    {/* <td>{list.category}</td> */}

                </tr>)
                }
                )}

            </tbody>
        </Table>


      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new Jobsite</Modal.Title>
        </Modal.Header>
        <Modal.Body className='listModal'>
        <form className='listForm' onSubmit={handleSubmit}>
                        <div className='listInput inputJob'>
                            <label>Jobsite</label>
                            <input type="text" placeholder='jobsite' required
                                value={xhobsite} onChange={(e)=>setXhobsite(e.target.value)}
                            />
                        </div>
                        <div className='listInput inputCat'>
                        <label >Category</label>
                            <select name="category" id="category" required value={categori} onChange={(e)=>{setCategori(e.target.value)}}>
                                <option value="" disabled >Category</option>
                                <option value="Sidewalk Shed" >Sidewalk Shed</option>
                                <option value="Scaffold" >Scaffold</option>
                                <option value="Shoring">Shoring</option>
                            </select>
                        </div>
                        <div className='listInput inputStatus'>
                            <label >Status</label>
                            <select name="status" id="status"  required value={statusi} onChange={(e)=>{setStatusi(e.target.value)}}>
                                <option value="" disabled>Status</option>
                                <option value="Completed" color={"green"} >Completed</option>
                                <option value="OnHold" >On Hold</option>
                                <option value="InProgress">In Progress</option>
                            </select>
                        </div>
                        <div className='inputButtons'>
                        <button onClick={handleClose} className='button cancelChanges' type='button'>Cancel Changes <MdClose size={20} /></button>
                        <button type='submit' className='button saveChanges'>Save Changes <FaCheck /></button>
                        </div>
                    </form>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default List