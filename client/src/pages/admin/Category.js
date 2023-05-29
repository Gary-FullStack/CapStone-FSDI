import { useState, useEffect  } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';
import AdminMenu from "../../components/nav/AdminMenu"
import axios from "axios";
import toast from 'react-hot-toast';
import CategoryForm from "../../components/forms/CategoryForm";
import {Modal} from "antd";


export default function AdminCategory() {
    const [auth, setAuth] = useAuth();

    // state
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    // modal state
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState("");


    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try{
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post('/category', { name });
            if(data?.error) {
                toast.error(data.error);
            }else {
                loadCategories();
                setName("");
                toast.success(`${data.name} has been created.`);
            }
            
        } catch (err) {
            console.log(err);
            toast.error("Submit failed, try again.");

        }
    };

    // update the category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`/category/${selected._id}`, {
                name: updatingName, 
            });
            if(data?.error) {
                toast.error(data.error);
            }else {
                toast.success(`${data.name} has been updated`);
                setSelected(null);
                setUpdatingName("");
                loadCategories();
                setOpen(false);
            }
        }catch (err) {
            console.log(err);
            toast.error("check your input and try again");
        }
    };

    // delete the category 

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.delete(`/category/${selected._id}`);
            if(data?.error) {
                toast.error(data.error);
            }else {
                toast.success(`${data.name} has been deleted`);
                setSelected(null);
                loadCategories();
                setOpen(false);
            }
        }catch (err) {
            console.log(err);
            toast.error("check your input and try again");
        }
    };

    return (
        <>
            <Jumbotron title={`Welcome ${auth?.user?.name}`}
            subTitle="Admin Control Panel" />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-3">  
                        <AdminMenu />
                    </div>

                    <div className="col-md-9">
                        <div className="p-3 mt-2 bg-light">Manage Inventory</div>

                            <CategoryForm value={name} 
                            setValue={setName}
                            handleSubmit={handleSubmit}/>

                            <hr />
                           
                           {/* category map */}
                            <div className="col">
                                {categories?.map((c) => (
                                <button key={c._id} 
                                    className="btn btn-outline-primary m-3" 
                                    onClick={() => {
                                        setOpen(true);
                                        setSelected(c);
                                        setUpdatingName(c.name); 
                                        }}>
                                    {c.name}
                                </button>                                    
                                ))}
                            </div>

                           <Modal open={open} 
                                onOk={() => setOpen(false)} 
                                onCancel={() => setOpen(false)}
                                footer={null}>

                                <CategoryForm value={updatingName}
                                 setValue={setUpdatingName}
                                 handleSubmit={handleUpdate}
                                 buttonText="Update"
                                 handleDelete={handleDelete}
                                 />
                           </Modal>                    
                    </div>
                </div>
            </div>           
        </>        
    );
}