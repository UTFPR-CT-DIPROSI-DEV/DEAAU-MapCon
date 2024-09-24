import 'primeflex/primeflex.css';
import React, { useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import ToolbarSite from '../components/toolbar_site';
import styles from '../styles/index.module.css'
import db from '../lib/back/db.js';
import 'primeicons/primeicons.css';

function Index(props) {
  const numView = 3;

  const userTemplate = (user) => {
    return (
      <div className="border border-round p-m-2 p-py-5 p-px-3">
        <i className="pi pi-user p-mb-3" style={{ fontSize: '2.5rem' }}/>
        <div className="user-template-nome">{user.nome}</div>
        <div className="user-template-funcao">{user.funcao}</div>
      </div>
    );
  };

  const CarouselEl = () => {
    if (!props.equipe)
      return <div className='p-carousel'>Carregando...</div>
    else if (props.equipe.length === 0)
      return <div className='p-carousel'>Nenhum usuário cadastrado</div>
    else {
      return (
        <Carousel value={props.equipe}
                  numVisible={numView} numScroll={1} 
                  itemTemplate={userTemplate} showNavigators={props.equipe.length <= numView ? false : true}/>
      );
    }
  }

  return (
    <div>
      <ToolbarSite></ToolbarSite>
      <div className="p-grid p-formgrid p-m-lg-6 p-m-2">
        <div className={styles.titulo}>A Equipe</div>
        {CarouselEl()}
        </div>
    </div>

  );

}

export async function getServerSideProps(context) {
  let equipe = [];
  try {
    equipe = await db('equipe').select('*');
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      equipe: equipe
    }
  }

}

export default Index