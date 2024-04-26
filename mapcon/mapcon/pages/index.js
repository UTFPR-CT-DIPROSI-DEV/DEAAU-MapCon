import React from 'react';
import dynamic, { noSSR } from 'next/dynamic'
import db from '../lib/back/db.js';
// import SideMenu from '../components/mapcon/sidemenu.jsx';
import ToolbarSite from '../components/toolbar_site';


function Index(props) {
  const MainMap = dynamic(() => import("../components/mapcon/main_map"), { ssr: false });
  return (
    <div>
      {/* <SideMenu></SideMenu> */}
      <ToolbarSite /> 
      <MainMap conflitos={props.conflitos}/>
    </div>
  );
  
}

export async function getServerSideProps(context) {
  const conflitos = await db.raw(`SELECT num_seq_protesto, tema_protesto, to_char(data_protesto,'DD/MM/YYYY') as data,latitude,longitude FROM protesto p INNER JOIN geolocalizacao g ON p.num_seq_protesto = g.protesto_num_seq_protesto WHERE status = 1;`);
  return {
    props: {
      conflitos: conflitos.rows
    }
  }

}

export default Index