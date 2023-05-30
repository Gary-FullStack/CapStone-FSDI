import { useEffect, useState } from 'react';
import Jumbotron from "../components/cards/Jumbotron";
import axios  from 'axios';
import moment from 'moment';




export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const {data} = await axios.get("/products");
      setProducts(data);

    }catch (err) {
      console.log(err);
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a,b) => (a.sold < b.sold ? 1 : -1))

  

    return (
  
      <div> 
        <Jumbotron title="Adventurer's Opus" subTitle="Welcome player, Your Adventure awaits inside!"/>

        <div className="row">
        
          <div className='col-md-6'>
            <h2 className='p-3 mt-2 mb-2 h4 bg-light text-center'> New Arrivals</h2>
            {products?.map((p) => (
              <div key={p._id}>
                <p>{p.name}</p>
                <p>{moment(p.createdAt).fromNow()}</p>
                <p>{p.sold} sold</p>
              </div>
            ))} 
          </div>

          <div className='col-md-6'>
            <h2 className='p-3 mt-2 mb-2 h4 bg-light text-center'> Most Popular</h2>
            {sortedBySold?.map((p) => (
              <div key={p._id}>
                <p>{p.name}</p>
                <p>{moment(p.createdAt).fromNow()}</p>
                <p>{p.sold} sold</p>
              </div>
            ))}  
          </div>
        </div>  

      </div>
    );
}
  
  