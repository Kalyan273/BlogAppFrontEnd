import Navigationbar from "./NavBar"
import Footer from "./Footer"



const Base = ( {children}) => {
    
    return (
        <div>
            <Navigationbar/>
            {children}
            <Footer/>
        </div>
    )
}

export default Base