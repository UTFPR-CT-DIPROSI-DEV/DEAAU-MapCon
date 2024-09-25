import 'primeflex/primeflex.css';
import React, { useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import ToolbarSite from '../components/toolbar_site';
import styles from '../styles/index.module.css'
import db from '../lib/back/db.js';
import 'primeicons/primeicons.css';

function Index(props) {
  const numView = 3;

  const userTemplate = (user) => {
    return (
      <div className="user-card border border-round p-m-2 p-py-6 p-px-3" style={{ backgroundImage: `url(${user.perfil})`}}>
        {user.perfil != null && user.perfil != '' ? 
          <i className="nullicon pi pi-user p-mb-5" style={{ fontSize: '4rem', visibility: 'hidden' }}/>
        :
          <i className="pi pi-user p-mb-5" style={{ fontSize: '4rem' }}/>
        }
        <div className="user-card-info">
          <div className="user-nome">{user.nome}</div>
          <div className="user-funcao">{user.funcao}</div>
        </div>
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
        <div className="p-col-12 p-mb-2 p-lg-8 p-mb-lg-0">
          <div className={styles.titulo}>A Equipe</div>
        </div>
      </div>
      {CarouselEl()}
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