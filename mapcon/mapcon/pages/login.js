import { csrfToken } from 'next-auth/react'
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from  '../styles/login.module.css'
export default function SignIn({ csrfToken }) {

  const [value2, setValue2] = useState('')

  return (

    <div className={styles.login}>
      <form method='post' action='/api/auth/callback/credentials'>
        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

        <div className="p-grid p-formgrid p-align-center vertical-container p-fluid p-mx-auto" style={{minHeight:'100vh'}}>

          <div className="p-md-offset-4 p-md-4 p-sm-offset-3 p-sm-6 p-col-12">
            
            {/* Form Login */}
          
            <div className={styles.login_title} >Autenticação no Sistema</div>
              {/* Barra de passos / Steps */}

              <div className="p-mb-2 p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText className="p-inputtext-lg" name="username" placeholder="Usuário" />
              </div>

              <div className="p-mb-2 p-mt-2 p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-key"></i>
                </span>
                <InputText className="p-inputtext-lg p-d-block" name="password" type="password" placeholder="Senha" />
              </div>

              <Button label="Autenticar" />

          </div>
        </div>

      </form>
    </div>








  )
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}