import React, { useEffect,useRef, useState } from 'react';
import TableCrud from '../../../lib/front/cruddatatable/datatable';
import { Column } from 'primereact/column';
import { useRouter } from 'next/router'
import axios from 'axios';
import ToolbarMapCon from '../../../components/toolbar_mapcon';
import Loading from '../../../components/loading/loading';
import { getSession } from 'next-auth/client';
import { Tag } from 'primereact/tag';
import { confirmDialog } from 'primereact/confirmdialog';
import moment from 'moment';

// TODO: Adicionar uma coluna com label colorido para identificar cadastros concluídos e não concluídos
export default function ProtestoPage(props) {

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

    async function viewButtonClicked(e) {


        router.push({
            pathname: '/mapcon/protesto/view',
            query: { id: e[0].num_seq_protesto },
        })


    }

    async function addButtonClicked(e) {

        router.push('/mapcon/protesto/add')

    }

    async function editButtonClicked(row) {

        router.push({
            pathname: '/mapcon/protesto/edit',
            query: { id: row[0].num_seq_protesto },
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
            await axios.delete('/api/mapcon/protesto', { data: { num_seq_protesto: item.num_seq_protesto } })
        }

        childRef.current.updateDatatable()
    }


    // Filtros
    const filters = [
        { label: 'Tema', value: 'tema_protesto', types: ['contain', 'equal'] },
    ];


    const dataBodyTemplate = (rowData) => {

        return (
            <div>
                <span className="p-column-title">Data Cadastro</span>
                {rowData.data_protesto ?moment(rowData.data_protesto).format('DD/MM/YYYY') : ''}
            </div>
        );
    }

    const statusTemplate = (rowData) => {

        return (
            <div>
                <span className="p-column-title">Status</span>
                {rowData.status == 0 ? <Tag className="p-mr-2" severity="warning" value="Em Preenchimento"></Tag> : <Tag className="p-mr-2" value="Finalizado"></Tag>}
            </div>
        );
    }


    return (loading ? <Loading></Loading> :
        <div>
            <ToolbarMapCon></ToolbarMapCon>
            <div className="p-grid p-formgrid p-m-lg-3 p-m-2">
                <div className="p-col-12 p-mb-12 p-lg-12 p-mb-lg-0">

                    <TableCrud ref={childRef}
                        {...props}
                        title="Protestos"
                        filters={filters}
                        onViewButtonClicked={viewButtonClicked}
                        onAddButtonClicked={addButtonClicked}
                        onEditButtonClicked={editButtonClicked}
                        onDeleteButtonClicked={deleteButtonClicked}
                        url='/api/mapcon/protesto'>

                        <Column field="num_seq_protesto" header="Código" sortable={true} />
                        <Column field="tema_protesto" header="Tema" sortable={true} />
                        <Column field="data_protesto" body={dataBodyTemplate} header="Data"  sortable={true}/>
                        <Column field="status" body={statusTemplate} header="Status"  sortable={true}/>

                        {/* <Column header="Ações" body={actionBodyTemplate}></Column> */}
                    </TableCrud>

                </div>
            </div>
        </div>

    );

}


