import React, {useState} from 'react'
// import { ProSidebar, SidebarHeader, Menu, MenuItem } from 'react-pro-sidebar';
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';

import Link from "next/link";
// import dynamic from 'next/dynamic';
// import 'react-pro-sidebar/dist/css/styles.css';

export default function SideMenu() {
    // const [menuCollapsed, setmenuCollapsed] = useState(true)

    // return (
    //     <ProSidebar onMouseEnter={() => setmenuCollapsed(false)} onMouseLeave={() => setmenuCollapsed(true)} collapsed={menuCollapsed} style={{ height: '100vh', position: 'absolute' }}>
    //         <SidebarHeader>
    //         <Link href="/"><img alt="logo" src="/images/logo.png" height="30" style={{margin: '10px'}}></img></Link>
    //         </SidebarHeader>
    //         <Menu iconShape="round">
    //             <MenuItem icon={<i className="pi pi-home"></i>}>Página Principal</MenuItem>
    //             <MenuItem icon={<i className="pi pi-users"></i>}>Quem Somos</MenuItem>
    //             <MenuItem icon={<i className="pi pi-inbox"></i>}>Contato</MenuItem>
    //         </Menu>
    //     </ProSidebar>
    // )

    
    const [collapsed, setCollapsed] = useState(true);

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header" onClick={toggleMenu}>
            <h3>{collapsed ? 'Menu' : 'My App'}</h3>
        </div>
        <Menu iconShape="square">
            <MenuItem icon={<i className="pi pi-home" />} href='.'>Home</MenuItem>
            <MenuItem icon={<i className="pi pi-users" />} href='./quemsomos'>About</MenuItem>
            <MenuItem icon={<i className="pi pi-inbox" />}>Contact</MenuItem>
        </Menu>
        </div>
    );
}