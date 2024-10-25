

import React, { useState } from 'react'
import Navbar from './Navbar';



function NavClient() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    
  

  // Toggle navbar visibility
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };
 

  return (
    <div>
        

    </div>
  )
}

export default NavClient