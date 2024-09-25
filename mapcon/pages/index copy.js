import React from 'react';
import Image from 'next/image'
import { Card } from 'primereact/card';
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

          <div className='p-grid p-formgrid'>
            <div className="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
              <Card className={styles.quadro_noticia} title='Introdução e Objetivos' header={card_infantil_header} footer={card_infantil_footer}>
                <div className={styles.data_noticia}>Publicado em Dezembro 4, 2019 por administrador</div>
                    Ruas do Centro amanhecem pichadas em protesto. Moradores bloqueiam rodovia obrigando motoristas a ver precariedade em bairros de Colombo. Classe média de Curitiba faz da Praça Espanha seu lugar de protesto. Frequentadores de bar fazem manifestação a favor da Quadra...
                </Card>
            </div>
            <div className="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
              <Card className={styles.quadro_noticia} title='Programa de Pós-Graduação em Planejamento Urbano da UFPR lança novo site' header={card_fundamental_header} footer={card_fundamental_footer}>
              <div className={styles.data_noticia}>Publicado em Dezembro 4, 2019 por administrador</div>
              Já está no ar o novo endereço do sítio eletrônico do Programa de Pós-Graduação em Planejamento Urbano da Universidade Federal do Paraná (PPU-UFPR). No sítio eletrônico, o visitante pode obter informações sobre as disciplinas ofertadas, pesquisas em desenvolvimento, produção científica
                </Card>
            </div>
            <div className="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
              <Card className={styles.quadro_noticia} title='Título da Notícia' footer={card_fundamental_footer}>
              <div className={styles.data_noticia}>Publicado em Dezembro 4, 2019 por administrador</div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet felis eu arcu consequat pretium. Donec bibendum tincidunt dolor, non pulvinar ex sagittis a. Duis nec ornare est. Integer ac odio elit. Curabitur sagittis nisl sit amet mattis iaculis. Sed iaculis magna vel purus condimentum, vitae interdum velit fringilla. Phasellus nibh risus, placerat auctor ultricies id, lacinia sed dui. Morbi pretium massa sit amet arcu faucibus egestas. Nulla eros urna, consectetur non tempus ac, convallis eget lorem. Proin ultricies, lectus sit amet sollicitudin malesuada, lacus urna congue orci, eu luctus odio arcu eu neque. Donec libero ipsum, faucibus sed bibendum ac, maximus sit amet enim. Fusce tellus purus, lobortis at leo quis, euismod efficitur arcu. Donec quis rutrum est. Maecenas eleifend in neque fringilla maximus. Aenean a semper purus. Donec pellentesque fermentum quam, tempor dapibus neque lacinia in.
                </Card>
            </div>


            <div className="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0">
              <Card className={styles.quadro_noticia} title='Título da Outra Notícia' footer={card_fundamental_footer}>
              <div className={styles.data_noticia}>Publicado em Dezembro 4, 2019 por administrador</div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet felis eu arcu consequat pretium. Donec bibendum tincidunt dolor, non pulvinar ex sagittis a. Duis nec ornare est. Integer ac odio elit. Curabitur sagittis nisl sit amet mattis iaculis. Sed iaculis magna vel purus condimentum, vitae interdum velit fringilla. Phasellus nibh risus, placerat auctor ultricies id, lacinia sed dui. Morbi pretium massa sit amet arcu faucibus egestas. Nulla eros urna, consectetur non tempus ac, convallis eget lorem. Proin ultricies, lectus sit amet sollicitudin malesuada, lacus urna congue orci, eu luctus odio arcu eu neque. Donec libero ipsum, faucibus sed bibendum ac, maximus sit amet enim. Fusce tellus purus, lobortis at leo quis, euismod efficitur arcu. Donec quis rutrum est. Maecenas eleifend in neque fringilla maximus. Aenean a semper purus. Donec pellentesque fermentum quam, tempor dapibus neque lacinia in.
                </Card>
            </div>


          </div>

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


