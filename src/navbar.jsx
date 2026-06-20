import Btn from './button'
import CIcon from '@coreui/icons-react';
import { cilCart } from '@coreui/icons';
import logo from './assets/logo.png';

function Navbar() {

    return (
        <>
        
            <div className="w-full bg-black px-5 navv py-4 flex justify-between items-center">
                <div className="logo text-white text-2xl font-bold">
                    <img src={logo} className="w-[50px]" alt="logo" />
                </div>
                
               <Btn icon={<CIcon icon={cilCart} />} name="Cart" />


                
            </div>
            

        </>
    )
}

export default Navbar