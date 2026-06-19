import Btn from './button'
import CIcon from '@coreui/icons-react';
import { cilCart } from '@coreui/icons';

function Navbar() {

    return (
        <>
        
            <div className="w-full bg-black px-5 py-4 flex justify-between items-center">
                <div className="logo text-white text-2xl font-bold">
                    🍽️ Tavola
                </div>
                
               <Btn icon={<CIcon icon={cilCart} />} name="Cart" />


                
            </div>
            

        </>
    )
}

export default Navbar