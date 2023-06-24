


export default function Jumbotron({title, subTitle}) {

    return ( 
        <div className="container-fluid">           
        
            <div className="row">
                <div className="bgpic">                
                    <h1 style={{color: "black", fontWeight: "bolder"}} >{title}</h1>
                    <h3 style={{color:"black", fontWeight: "bold"}} >{subTitle}</h3>
                </div>
            </div>
        </div>
    );
}