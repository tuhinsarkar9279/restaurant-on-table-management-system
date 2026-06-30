// Categories.jsx
// NOTE:
// This component expects a JSON Server endpoint:
// http://localhost:3000/categories
//
// db.json should contain:
// "categories": []

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
} from "@coreui/react";

const API="http://localhost:3000/categories";

export default function Categories(){

 const [categories,setCategories]=useState([]);
 const [visible,setVisible]=useState(false);
 const [editId,setEditId]=useState(null);

 const [form,setForm]=useState({
   name:"",
   status:"Active"
 });

 const loadCategories=async()=>{
   try{
     const res=await axios.get(API);
     setCategories(res.data);
   }catch(err){
     console.error(err);
   }
 };

 useEffect(()=>{
   loadCategories();
 },[]);

 const resetForm=()=>{
   setForm({
     name:"",
     status:"Active"
   });
   setEditId(null);
 };

 const openAdd=()=>{
   resetForm();
   setVisible(true);
 };

 const openEdit=(item)=>{
   setEditId(item.id);
   setForm({
      name:item.name,
      status:item.status
   });
   setVisible(true);
 };

 const saveCategory=async()=>{

   if(form.name.trim()===""){
      alert("Category name required");
      return;
   }

   try{

      if(editId){

        await axios.put(`${API}/${editId}`,form);

      }else{

        await axios.post(API,form);

      }

      setVisible(false);
      resetForm();
      loadCategories();

   }catch(err){
      console.error(err);
      alert("Error saving category");
   }

 };

 const deleteCategory=async(id)=>{
   if(!window.confirm("Delete category?")) return;

   try{
      await axios.delete(`${API}/${id}`);
      loadCategories();
   }catch(err){
      console.error(err);
   }
 };

 return(

 <>
   <CCard>

      <CCardHeader className="d-flex justify-content-between align-items-center">

         <h4>Categories</h4>

         <CButton color="primary" onClick={openAdd}>
            Add Category
         </CButton>

      </CCardHeader>

      <CCardBody>

      <CTable hover striped responsive>

        <CTableHead>

            <CTableRow>
               <CTableHeaderCell>ID</CTableHeaderCell>
               <CTableHeaderCell>Name</CTableHeaderCell>
               <CTableHeaderCell>Status</CTableHeaderCell>
               <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>

        </CTableHead>

        <CTableBody>

        {
          categories.map(item=>(

             <CTableRow key={item.id}>

                <CTableDataCell>{item.id}</CTableDataCell>

                <CTableDataCell>{item.name}</CTableDataCell>

                <CTableDataCell>{item.status}</CTableDataCell>

                <CTableDataCell>

                    <CButton
                    color="warning"
                    size="sm"
                    className="me-2"
                    onClick={()=>openEdit(item)}
                    >
                    Edit
                    </CButton>

                    <CButton
                    color="danger"
                    size="sm"
                    onClick={()=>deleteCategory(item.id)}
                    >
                    Delete
                    </CButton>

                </CTableDataCell>

             </CTableRow>

          ))
        }

        </CTableBody>

      </CTable>

      </CCardBody>

   </CCard>

   <CModal visible={visible} onClose={()=>setVisible(false)}>

      <CModalHeader>

         <CModalTitle>
            {editId ? "Edit Category" : "Add Category"}
         </CModalTitle>

      </CModalHeader>

      <CModalBody>

         <CFormInput
            label="Category Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
         />

         <br/>

         <CFormSelect
            label="Status"
            value={form.status}
            onChange={(e)=>setForm({...form,status:e.target.value})}
         >
            <option>Active</option>
            <option>Inactive</option>
         </CFormSelect>

      </CModalBody>

      <CModalFooter>

         <CButton
         color="secondary"
         onClick={()=>setVisible(false)}
         >
         Cancel
         </CButton>

         <CButton
         color="success"
         onClick={saveCategory}
         >
         Save
         </CButton>

      </CModalFooter>

   </CModal>

 </>

 );

}
