import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import Link from 'next/link'
import styles from '../../styles/index.module.css'
import ToolbarSite from '../../components/toolbar_site';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import Loading from '../../components/loading/loading';


function Index(props) {
  // const router = useRouter();
  
  return (
    <div>
      <ToolbarSite/>
      <div className="p-grid p-formgrid p-m-lg-6 p-m-2">
        <div className="p-col-12 p-mb-2 p-lg-12 p-mb-lg-0">
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context){
  const session = await getSession({req: context.req})
  console.debug('Session on MAPCON/INDEX.JS : ', session);
  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return{
    props: {
      session
    }
  }

}


export default Index


