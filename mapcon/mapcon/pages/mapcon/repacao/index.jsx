import React, { useEffect,useRef, useState } from 'react';
import TableCrud from '../../../lib/front/cruddatatable/datatable';
import { Column } from 'primereact/column';
import { useRouter } from 'next/router'
import axios from 'axios';
import ToolbarMapCon from '../../../components/toolbar_mapcon';
import Loading from '../../../components/loading/loading';
import { getSession } from 'next-auth/client';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { useForm, Controller } from "react-hook-form";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';

export default function RepertorioAcaoPage(props) {

    const router = useRouter()

    const [showForm, setshowForm] = useState({ visible: false })
    const [loading, setloading] = useState(true)

    // Para conseguir atualizar datatable
    const childRef = useRef();

    useEffect(async () => {

        // Redireciona para login caso não esteja autenticado
        const session = await getSession()
        if (!session) {
            router.push('/login')
        } else {
            setloading(false)
        }

    }, [])


    async function addButtonClicked(e) {

        setshowForm({ visible: true })

    }

    async function editButtonClicked(row) {

        const r = await axios.get('/api/mapcon/repacao', { params: { id: row[0].num_seq_repertorio_acao } })
        
        setshowForm({
            visible: true,
            data: r.data,
        })

    }


    async function deleteButtonClicked(e, search) {

        confirmDialog({
        message: 'Tem certeza que deseja remover os dados selecionados?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => removeRows(e),
        acceptLabel: 'Sim',
        rejectLabel: 'Não'
        // reject: () => rejectFunc()
    });
        
    }

    async function removeRows(e){
        for (const item of e) {
            await axios.delete('/api/mapcon/repacao', { data: { num_seq_repertorio_acao: item.num_seq_repertorio_acao } })
        }

        childRef.current.updateDatatable()
    }

    // Essa function atualiza fecha o dialog e atualiza o datatable o form tiver atualizado
    function closeFormDialog(update) {

        setshowForm(false)
        if (update) {
            childRef.current.updateDatatable()
        }

    }

    // Filtros
    const filters = [
        { label: 'Descrição Repertório da Ação', value: 'desc_repertorio_acao', types: ['contain', 'equal'] },
    ];


    return (loading ? <Loading></Loading> :
        <div>
            <ToolbarMapCon></ToolbarMapCon>
            <div className="p-grid p-formgrid p-m-lg-3 p-m-2">
                <div className="p-col-12 p-mb-12 p-lg-12 p-mb-lg-0">

                    <TableCrud ref={childRef}
                        {...props}
                        title="Repertório da Ação"
                        filters={filters}
                        onAddButtonClicked={addButtonClicked}
                        onEditButtonClicked={editButtonClicked}
                        onDeleteButtonClicked={deleteButtonClicked}
                        url='/api/mapcon/repacao'>

                        <Column field="num_seq_repertorio_acao" header="Código" sortable={true} />
                        <Column field="desc_repertorio_acao" header="Descrição Repertório da Ação" sortable={true} />

                        {/* <Column header="Ações" body={actionBodyTemplate}></Column> */}
                    </TableCrud>

                </div>
            </div>
            {showForm.visible ? <CategoriaObjetoForm showForm={showForm} closeForm={(update) => closeFormDialog(update)}></CategoriaObjetoForm> : null}
        </div>

    );

}



/*
    Dialog para formulário de inclusão/edição do crud
*/
function CategoriaObjetoForm(props) {

    const { control, handleSubmit, errors } = useForm({ defaultValues: props.showForm.data });

    const onSubmit = async data => {

        if(props.showForm.data){ // Editar
            const r = await axios.put('/api/mapcon/repacao',{num_seq_repertorio_acao: props.showForm.data.num_seq_repertorio_acao,...data})
        }else{
            const r = await axios.post('/api/mapcon/repacao',data)
        }
        

        props.closeForm(true)

    }



    return (
        <Dialog header="Repertório da Ação" className="p-fluid" modal visible={props.showForm.visible} onHide={() => props.closeForm(false)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-fluid p-formgrid p-grid p-mt-lg-4 p-mt-4">
                    <div className="p-field p-col-12 p-md-12">
                        <label htmlFor="desc_repertorio_acao">Descrição do Repertório da Ação*</label>
                        <Controller name="desc_repertorio_acao" rules={{ required: true }} control={control} render={({ onChange, value }) =>
                            <InputText disabled={props.view} className={errors.repacao ? "p-invalid" : ""} value={value} onChange={onChange}></InputText>
                        } />
                    </div>
                    <div className="p-field p-col-12 p-md-12">
                        <Button label={props.showForm.data !== undefined ? "Atualizar" : "Adicionar"} icon="pi pi-check" />
                    </div>
                </div>
            </form>
        </Dialog>
    )
}
