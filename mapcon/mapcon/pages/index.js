import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import db from '../lib/back/db';
import SideMenu from '../components/mapcon/sidemenu';

function Index(props) {

  const MainMap = dynamic(() => import("../components/mapcon/main_map"), { ssr: false });

  return (
    <div>
      <SideMenu></SideMenu>
      <MainMap conflitos={props.conflitos}></MainMap>
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


