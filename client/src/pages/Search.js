import { useSearch } from "../context/search"
import ProductCard from './../components/cards/ProductCard';
import Jumbotron from './../components/cards/Jumbotron';



export default function Search() {

    const [values, setValues] = useSearch();

    return (
        <> 
        
        
            <Jumbotron title="Your search results" 
            subTitle={values?.results?.length < 1 ? 
            "No items found by that name" : `We found ${values?.results?.length} items`}/>

            <div className="container mt-3">

                <div className="row">
                    {values?.results?.map(p => (
                        <div key={p._id} className="col-md-4">
                            <ProductCard p={p} />
                        </div>
                    ))}

                </div>

            </div>

        </>
    );
}