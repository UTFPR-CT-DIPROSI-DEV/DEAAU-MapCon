import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';

/*
    Componente simples que apresenta uma mensagem de carregamento na tela
    deve ser habilitado durante uma requisição POST, por exemplo.
    Evitar utilizar esse componente em formulários dentro de modais
*/

export default function LoadingModal({visible}){
    return(<Dialog closable={false} visible={visible}>
    <p style={{marginBottom: '10px'}}>Carregando...Por favor, aguarde.</p>
    <ProgressBar mode="indeterminate" />
</Dialog>)
}