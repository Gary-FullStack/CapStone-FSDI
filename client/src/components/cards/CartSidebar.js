import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";



export default function CartSidebar() {


  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();


  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    
  };


  return (
    <div className="col-md-4">
      <h4>Your cart Summary</h4>
      total, address, payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <h4>Delivery Address:</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button className="btn btn-outline-warning" 
          onClick={() => navigate("/dashboard/user/profile")}
            >Update Address
          </button>
        </>
      ):(
        <div className="mb-3">
          {auth?.token ? (
            <button className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}>
            Add a delivery Address
            </button>
          ) : (
            <button className="btn btn-outline-danger"
            onClick={() => navigate("/login", {
              state: "/cart", 
            })} 
            >Log in to check-out
            </button>
          )}
        </div>
      )}
    </div>




  );


}