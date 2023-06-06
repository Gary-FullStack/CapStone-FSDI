
import { useCart } from "../../context/cart";


export default function SmallProdCard({ p, remove = true }) {
  // context
  const [cart, setCart] = useCart();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <div
      className="card mb-3"
      // style={{ maxWidth: 540 }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{
              height: "200px",
              
              objectFit: "cover",
              marginLeft: "-12px",
              borderTopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {p.name}{" "}
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h5>
            <p className="card-text">{`${p?.description?.substring(
              0,
              50
            )}..`}</p>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          
          {remove && (
            <button className="btn btn-md btn-outline-warning mb-2" 
            onClick={() => removeFromCart(p._id)}
            >Remove</button>
          )}
        </div>
      </div>
    </div>
  );
}