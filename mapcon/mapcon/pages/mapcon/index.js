import React from 'react';
import ToolbarMapCon from '../../components/toolbar_mapcon';
import { getSession } from 'next-auth/react';


function Index(props) {
  return (
    <div>
      <ToolbarMapCon/>
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
  // if(!session){
  if(0){
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


