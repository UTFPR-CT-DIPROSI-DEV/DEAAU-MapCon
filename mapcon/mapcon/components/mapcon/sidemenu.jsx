import React, { useState } from 'react'
import { ProSidebar, SidebarHeader, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from "next/link";
// import 'react-pro-sidebar/dist/css/styles.css';

export default function SideMenu() {

    const [menuCollapsed, setmenuCollapsed] = useState(true)

    return (
        <ProSidebar onMouseEnter={() => setmenuCollapsed(false)} onMouseLeave={() => setmenuCollapsed(true)} collapsed={menuCollapsed} style={{ height: '100vh', position: 'absolute' }}>
            <SidebarHeader>
            <Link href="/"><img alt="logo" src="/images/logo.png" height="30" style={{margin: '10px'}}></img></Link>
            </SidebarHeader>
            <Menu iconShape="round">
                <MenuItem icon={<i className="pi pi-home"></i>}>Página Principal</MenuItem>
                <MenuItem icon={<i className="pi pi-users"></i>}>Quem Somos</MenuItem>
                <MenuItem icon={<i className="pi pi-inbox"></i>}>Contato</MenuItem>
            </Menu>
        </ProSidebar>
    )
}
