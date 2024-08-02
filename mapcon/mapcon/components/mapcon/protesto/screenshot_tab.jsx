import { Column } from "primereact/column";
import { Button } from "primereact/button"
import { DataTable } from "primereact/datatable";
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from "primereact/dropdown";
import React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

export function ScreenshotTab({ screenshots }) {
    function acoesTemplate(rowData) {
        const img_link = `/images/news/${rowData.id}.jpeg`
        return <a target="blank" href={img_link}><img src={img_link} alt={img_link} style={{ width: '100px', height: '200px' }}/></a>;
    }

    return (
        <React.Fragment>
            {/* <Dropdown value={selectedValue} panelStyle={{ width: '100%' }} style={{ marginBottom: '10px' }} options={comboOptions} onChange={onValueSelected} optionLabel="name" filter filterBy="name" placeholder="Selecione um valor" /> */}
            <DataTable  value={screenshots}>
                <Column fheader="Ação" body={acoesTemplate}></Column>
            </DataTable>
        </React.Fragment>
    )

}