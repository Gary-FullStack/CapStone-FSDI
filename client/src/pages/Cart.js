import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId)
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem('cart', JSON.stringify(myCart));
  };

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
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={cart?.length ? `You have ${cart.length} items in your cart.
         ${auth?.token ? "" : "Please login to checkout"}`: "Your cart is empty"} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">

            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">

              {cart?.length? ("My Cart") : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}>
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

                  {/* number of items in cart */}
      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">                  
                {cart?.map((p, name) => 
                  <div key={name} className="card mb-3" 
                  // style={{maxWidth: 400}}
                  >

                    <div className="row g-0">                        
                      <div className="col-md-4">
                        <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name} 
                        style={{height: "200px", objectFit: "cover", marginLeft: "-12px"}}
                        />
                      </div>
                      
                      <div className="col-md-8">                         
                        <div className="card-body">
                          <h5 className="card-title">{p.name} {p?.price.toLocaleString
                ("en-us", {style: "currency", currency: "USD"})}</h5>
                          <p className="card-text">{`${p?.description?.substring(0, 50)}...`}</p>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-outline-warning mb-2" 
                        onClick={() => removeFromCart(p._id)}
                        >Remove</button>
                      </div>
                    </div>                 
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
                <h4>Your cart Summary</h4>
              total, address, payments
              <hr />
              <h6>Total: {cartTotal()}</h6>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <hr />
                    <h4>Address:</h4>
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

          </div>
        </div>
      )}     
    </>
  );
}