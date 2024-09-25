import React, { useEffect } from 'react';
import Image from 'next/image'
// import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import Link from 'next/link'
import ToolbarSite from '../components/toolbar_site';
import styles from '../styles/index.module.css'


function Index() {
  const card_infantil_header = (
    <Image layout={'responsive'} height={200} width={400} alt="Card" src='/images/imagem1.jpeg' />
  );

  const card_infantil_footer = (
    <span>
      <Link href={"/educacao/infantil"} passHref><a><Button label="Continuar a Ler" className="p-button-danger" /></a></Link>
    </span>
  )


  const card_fundamental_header = (

    <Image layout={'responsive'} height={200} width={400} alt="Card" src='/images/imagem2.jpeg' />
  )

  const card_fundamental_footer = (
    <span>
      <Link href="/educacao/fundamental" passHref><a><Button label="Continuar a Ler" className="p-button-danger" /></a></Link>
    </span>
  )


  return (
    <div>
      <ToolbarSite></ToolbarSite>
      <div className="p-grid p-formgrid p-m-lg-6 p-m-2">

        <div className="p-col-12 p-mb-2 p-lg-8 p-mb-lg-0">
        <div className={styles.titulo}>Quem Somos</div>
          
        </div>

        <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
          <div className={styles.titulo}>Busca</div>

          <div className={styles.busca+" p-inputgroup"}>

            <InputText placeholder="Pesquisar ..." />
            <Button icon="pi pi-search" className="p-button-danger" />
          </div>

          <div className={styles.titulo}>Últimas Postagens</div>

        <div className={styles.titulo_noticia}>Título da primeira noticia</div>
        <div className={styles.titulo_noticia}>Título da segunda noticia</div>
        <div className={styles.titulo_noticia}>Título da terceira noticia</div>
        <div className={styles.titulo_noticia}>Título da quarta noticia, com tamanho maior e quebrando a linha</div>
        </div>
      </div>
    </div>

  );

}


export default Index


