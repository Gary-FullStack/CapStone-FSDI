import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";


const { Option } = Select;




export default function AdminProduct() {

        // context
    const [auth, setAuth] = useAuth ();

    // state
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState ("");
    const [name, setName] = useState ("");
    const [description, setDescription] = useState ("");
    const [price, setPrice] = useState ("");
    const [category, setCategory] = useState ("");
    const [shipping, setShipping] = useState ("");
    const [quantity, setQuantity] = useState ("");

    useEffect(() => {
        loadCategories();


    }, []);

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


    return (
        <>
            <Jumbotron title={`Welcome ${auth?.user?.name}`}
            subTitle="Admin Control Panel" />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-3">  
                        <AdminMenu />
                    </div>


                    {/* create a new product  */}
                    <div className="col-md-9">
                        <div className="p-3 mt-2 bg-light">Create new Inventory</div>

                        {photo && (
                            <div className="text-center">
                                <img 
                                src={URL.createObjectURL(photo)} 
                                alt="product" 
                                className="img img-responsive"
                                height="200px" />
                            </div>
                        )}

                        <div className="pt-2" >
                            <label className="btn btn-outline-secondary p-2 col-12 mb-3 " >
                                {photo? photo.name : "upload a photo"}
                                <input 
                                type="file" 
                                name="photo" 
                                accept="image/*" 
                                onChange={(e) => setPhoto(e.target.files[0])}
                                hidden />
                            </label>
                        </div>


                       <Select 
                            showSearch
                            bordered={false} 
                            size="large" 
                            className="form-select mb-3"
                            placeholder="Select a category"
                            onChange={(value) => setCategory(value)}
                            >                       
                            {categories?.map((c) => 
                            <Option key={c._id} value={c.name}>{c.name}</Option> )}
                       </Select>

                        
                        
                    </div>

                </div>

            </div>
            
           
        </>

        
    );

}