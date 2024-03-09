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

export default function CatAgentePage(props) {

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

        const r = await axios.get('/api/mapcon/catagente', { params: { id: row[0].num_seq_categoria_agente } })
        
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
            await axios.delete('/api/mapcon/catagente', { data: { num_seq_categoria_agente: item.num_seq_categoria_agente } })
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
        { label: 'Categoria do Agente', value: 'desc_categoria_agente', types: ['contain', 'equal'] },
    ];


    return (loading ? <Loading></Loading> :
        <div>
            <ToolbarMapCon></ToolbarMapCon>
            <div className="p-grid p-formgrid p-m-lg-3 p-m-2">
                <div className="p-col-12 p-mb-12 p-lg-12 p-mb-lg-0">

                    <TableCrud ref={childRef}
                        {...props}
                        title="Categorias do Agente"
                        filters={filters}
                        onAddButtonClicked={addButtonClicked}
                        onEditButtonClicked={editButtonClicked}
                        onDeleteButtonClicked={deleteButtonClicked}
                        url='/api/mapcon/catagente'>

                        <Column field="num_seq_categoria_agente" header="Código" sortable={true} />
                        <Column field="desc_categoria_agente" header="Categoria do Agente" sortable={true} />

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
            const r = await axios.put('/api/mapcon/catagente',{num_seq_categoria_agente: props.showForm.data.num_seq_categoria_agente,...data})
        }else{
            const r = await axios.post('/api/mapcon/catagente',data)
        }
        

        props.closeForm(true)

    }



    return (
        <Dialog header="Categoria do Agente" className="p-fluid" modal visible={props.showForm.visible} onHide={() => props.closeForm(false)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-fluid p-formgrid p-grid p-mt-lg-4 p-mt-4">
                    <div className="p-field p-col-12 p-md-12">
                        <label htmlFor="desc_categoria_agente">Categoria do Agente</label>
                        <Controller name="desc_categoria_agente" rules={{ required: true }} control={control} render={({ onChange, value }) =>
                            <InputText disabled={props.view} className={errors.catagente ? "p-invalid" : ""} value={value} onChange={onChange}></InputText>
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
