
import axios from "axios";
import { useSearch } from "../../context/search";


export default function Search(){
    

    // hooks
    const [values, setValues] = useSearch();

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const {data} = await axios.get(`/products/search/${values?.keyword}`);
                setValues({ ...values, results: data});
            } catch (err) {
            console.log(err)
            }
        };


    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input type="search" 
            style={{ borderRadius: "0px"}} 
            className="form-control"
            placeholder="Search"
            onChange={(e) => setValues({...values, keyword: e.target.value})}
            value= {values.keyword}
            />
            <button className="btn btn-outline-primary" 
                type="submit"
                style={{ borderRadius: "0px"}}
                >Search {values.results.length}
            </button>
        </form>
    );


}

