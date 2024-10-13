import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import './dashboard.css'
import { FaLongArrowAltLeft } from "react-icons/fa";
import Table from 'react-bootstrap/Table';

const Dashboard = ({Data}) => {
    const {jobsite} = useParams();
  //Function to find the tasks corrensponding to the jobsite name
  const foundJobsite = Data.find(element => element.jobsite === jobsite);
  const [sth, setSth]=useState([])

    //The functions for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //useState for updating data in the modal
      const [id, setId]=useState('')
      const [item, setItem]=useState('')
      const [quantity, setQuantity]=useState('')
      const [pershkrim, setPershkrim]=useState('')
      const [shenime, setShenime]=useState('')

           //Function for editing values
           const handleEdit = (id)=>{
            handleShow()

            const editedValues = sth.find(ele=> ele.id === id);

            setId(editedValues.id);
            setItem(editedValues.item);
            setQuantity(editedValues.qty);
            setPershkrim(editedValues.desc)
            setShenime(editedValues.notes)
          }



    //function to update changes into the table
    const handleUpdate = (e) => {
      e.preventDefault();
      const newChange = sth.map((ele) => {
      if (ele.id === id) {
        return(
          ele.item = item,
          ele.qty = quantity,
          ele.desc = pershkrim,
          ele.notes = shenime
        )}
        return ele;
      })

      setSth(newChange);
      handleClose()
  };

      //useState for selecting category in the input
      const [selectedValue, setSelectedValue]=useState("")
      
      //Function for picking which category
      const handleSubmit = (e)=>{
        e.preventDefault()
        const cat = foundJobsite.tasks.filter(element=>
          element.cat === selectedValue)
          setSth(cat);
        }

     



  return (
    <div id='Dashboard'>
        <div className="dashForm">
            <span className='dashName'><p>{jobsite}</p></span>
            <form  onSubmit={handleSubmit}>
              <label htmlFor="cat">Category Included</label>
        <select name="cat" id="cat" value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
            <option value="" disabled >Pick Category</option>
            <option value="Sidewalk Shed" >Sidewalk Shed</option>
            <option value="Scaffold" >Scaffold</option>
            <option value="Shoring">Shoring</option>
        </select>
            <button className='button'>Filter</button>
            </form>
            <Link className='gobackLink' to={"/"}><button className='button goBack'>Go back <FaLongArrowAltLeft /></button></Link>
        </div>
        <div className='dashTable'>
            <Table striped bordered hover>
            <thead>
                <tr >
                  <th>ID</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Notes</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                    {sth.map((task, index)=>{
                        return (
                        <tr key={index} onDoubleClick={()=>handleEdit(task.id)}>
                          <td>{task.id}</td>
                            <td>{task.item}</td>
                            <td>{task.qty}</td>
                            <td>{task.desc}</td>
                            <td>{task.notes}</td>
                            <td>{task.cat}</td>
                        </tr>
                    )
                    })}
            </tbody>
            </Table>

        </div>


      <Modal className='modalContent' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='dashModal' >
                        <div className='dashGroupModal'>
                            <label>Item Name</label>
                            <input type="text" placeholder='Item Name'
                                value={item} onChange={(e)=>setItem(e.target.value)}
                            />
                        </div>
                        <div className='dashGroupModal'>
                            <label>Quantity</label>
                            <input type="number" min={1} placeholder='ex: 3'
                                value={quantity} onChange={(e)=>setQuantity(e.target.value)}
                            />
                        </div>
                        <div className='dashGroupModal dashDesc'>
                            <label>Description</label>
                            <textarea type="text" placeholder='Description' rows={3}
                                value={pershkrim} onChange={(e)=>setPershkrim(e.target.value)}
                            />
                        </div >
                        <div className='dashGroupModal dashNotes'>
                            <label>Notes</label>
                            <textarea type="text" placeholder='Notes' rows={3}
                                value={shenime} onChange={(e)=>setShenime(e.target.value)}
                            />
                        </div>

                        <div className='dashModalButtons'>
                        <button type='submit' className='button saveChanges' onClick={handleUpdate}>Save Changes</button>
                        <button onClick={handleClose} className='button cancelChanges' type='button'>Cancel Changes</button>
                        </div>
                    </form>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Dashboard