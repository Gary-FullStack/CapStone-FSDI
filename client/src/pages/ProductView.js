import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaDollarSign,
  FaProjectDiagram,  
  FaCheck,
  FaTimes,  
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

export default function ProductView() {
  
  const [cart, setCart] = useCart();
  
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  // hooks
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(`/related-products/${productId}/${categoryId}`);
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-7">
          <div className="card mb-3">
            
                <img className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={{ height: "500px", width: "90%", objectFit: "cover" }}
                />
             

            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>
              <p className="card-text lead">{product?.description}</p>
            </div>

            <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
              <div>
                <p>
                  <FaDollarSign /> Price:{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>

                <p>
                  <FaProjectDiagram /> Category: {product?.category?.name}
                </p>

                <p>
                  {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                  {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <p>
                  <FaWarehouse /> Available {product?.quantity - product?.sold}
                </p>

                <p>
                  <FaRocket /> Sold {product.sold}
                </p>
              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{
                borderBottomRightRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="col-md-5">
          <h2>Related Products</h2>
          <hr />
          {related?.length < 1 && <p>Nothing found</p>}
          {related?.map((p) => (
            <ProductCard p={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
} 