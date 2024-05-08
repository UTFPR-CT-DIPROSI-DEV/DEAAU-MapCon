import React from 'react';
import { useRouter } from 'next/router'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react'

export default function ToolbarSite() {

  const router = useRouter()

  let items = [
    {
      label: 'Início',
      command:()=>{router.push("/")}
    },
    {
      label: 'Quem Somos?',
      command:()=>{router.push("/quemsomos")}
    },
    {
      label: 'Equipe',
      command:()=>{router.push("/equipe")}
    },
    // {
    //   label: 'Outras Publicações',
    //   command:()=>{router.push("/outraspublicacoes")}
    // },
    // {
    //   label: 'Publicação Científica',
    //   command:()=>{router.push("/publicacaocientifica")}
    // },
    {
      label: 'MapCon',
      command:()=>{router.push("/mapcon")}
    },
    // {
    //   label: 'MapCon',
    //   items: [
    //     {
    //       label: 'Dashboard',
    //     },
    //     {
    //       label: 'Escolas e Vagas',
    //       //command:()=>{history.push("/escolasevagas");}
    //     },
    //     {
    //       label: 'Cadastros',
    //       //command:()=>{history.push("/reqvagaescola");}
    //     },
    //     {
    //       label: 'Histórico de Cadastros',
    //     },
    //     {
    //       label: 'Definir Período de Cadastro',
    //     }
    //   ]
    // },
    
  ];

  const start = <Link href="/"><img alt="logo" src="/images/logo.png" height="40" className="p-mr-2"></img></Link>;
  // const start = <Link href="/">MapCon</Link>;

  const right_toolbar = (
    <div>
      {/* {!session ?
        <Button label='Login' onClick={() => signIn()} className="p-button-danger" style={{ marginRight: '.25em' }} icon="pi pi-user" /> :
        <Button label='Logout' onClick={() => signOut()} className="p-button-warning" style={{ marginRight: '.25em' }} icon="pi pi-user" />
      } */}
    </div>
  )


  return (
    <div>
      <div>
        {/* se eu quiser pegar os dados da autenticação... {session && session.user.name} */}
        <Menubar start={start} model={items} end={right_toolbar} />
      </div>
    </div>
  );

}







