// AppHeader.jsx
// Complete AppHeader with notification badge.

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CHeader, CHeaderNav, CHeaderToggler, CNavLink, CNavItem, useColorModes } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilContrast, cilMenu, cilMoon, cilSun } from "@coreui/icons";
import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";

const AppHeader=()=>{
const headerRef=useRef();
const [notificationCount,setNotificationCount]=useState(0);
const {colorMode,setColorMode}=useColorModes("coreui-free-react-admin-template-theme");
const dispatch=useDispatch();
const sidebarShow=useSelector(state=>state.sidebarShow);

const fetchNotifications=async()=>{
 try{
  const res=await axios.get("http://localhost:3000/orders");
  setNotificationCount(res.data.filter(o=>o.status==="Pending").length);
 }catch(e){console.log(e);}
};

useEffect(()=>{
 fetchNotifications();
 const i=setInterval(fetchNotifications,5000);
 return ()=>clearInterval(i);
},[]);

useEffect(()=>{
 const h=()=>headerRef.current&&headerRef.current.classList.toggle("shadow-sm",document.documentElement.scrollTop>0);
 document.addEventListener("scroll",h);
 return ()=>document.removeEventListener("scroll",h);
},[]);

return(
<CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
<CContainer fluid className="border-bottom px-4">
<CHeaderToggler onClick={()=>dispatch({type:"set",sidebarShow:!sidebarShow})}><CIcon icon={cilMenu}/></CHeaderToggler>
<CHeaderNav className="d-none d-md-flex"><CNavItem><CNavLink to="/dashboard" as={NavLink}>Dashboard</CNavLink></CNavItem></CHeaderNav>
<CHeaderNav className="ms-auto">
<CNavItem>
<CNavLink to="/theme/typography" as={NavLink} className="position-relative">
<CIcon icon={cilBell} size="lg"/>
{notificationCount>0&&<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{notificationCount}</span>}
</CNavLink>
</CNavItem>
</CHeaderNav>
<CHeaderNav>
<CDropdown variant="nav-item"><CDropdownToggle caret={false}>{colorMode==="dark"?<CIcon icon={cilMoon}/>:colorMode==="auto"?<CIcon icon={cilContrast}/>:<CIcon icon={cilSun}/>}</CDropdownToggle>
<CDropdownMenu>
<CDropdownItem onClick={()=>setColorMode("light")}>Light</CDropdownItem>
<CDropdownItem onClick={()=>setColorMode("dark")}>Dark</CDropdownItem>
<CDropdownItem onClick={()=>setColorMode("auto")}>Auto</CDropdownItem>
</CDropdownMenu>
</CDropdown>
<AppHeaderDropdown/>
</CHeaderNav>
</CContainer>
<CContainer fluid className="px-4"><AppBreadcrumb/></CContainer>
</CHeader>
);
};
export default AppHeader;
