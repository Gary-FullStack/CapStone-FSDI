import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox } from "antd";


export default function Shop() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState ([]);

    useEffect(() => {
        loadProducts(); 
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
        }catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        loadCategories(); 
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        }catch (err) {
            console.log(err);
        }
    };

    // this is teh click (check box) handler for categories
    const handleCheck = (value, id) => {
        let all = [...checked];
        if(value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };


    return (
        <>

            <Jumbotron title="Browse our collection of books" className="fw-bold"
            subTitle="Welcome, Find your Adventure below!"/>

            < div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                    <h2 className="p-4 mt-3 mb-3 h4 bg-light text-center"> 
                    Filter by Category</h2>
                    <div className="row p-4">
                            {categories?.map((c) => (
                                <Checkbox key={c._id} 
                                onChange={(e) => handleCheck(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-9">
                        <h2 className="p-4 mt-3 mb-3 h4 bg-light text-center">
                        There are {products?.length} Products in the store!</h2>
                        <div className="row">
                            {products?.map((p) => (
                                <div className="col-md-4" key={p._id}>
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );







}