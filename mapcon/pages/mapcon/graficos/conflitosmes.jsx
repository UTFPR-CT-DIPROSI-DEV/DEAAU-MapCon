import db from '../../../lib/back/db'
import React from 'react'
import { Chart } from 'primereact/chart';
import moment from 'moment';
import ToolbarMapCon from '../../../components/toolbar_mapcon';

export default function ConflitosMes(props) {
    const chartData = {
        labels: props.conflitosmes.map(r => r.to_char),
        datasets: [
            {
                data: props.conflitosmes.map(r => r.count),
                label: 'Total',
                backgroundColor: 'red'
                // backgroundColor: props.totaissit.map(r => getColor(r.situacao))
            }]
    }

    const options = {
        title: {
            display: true,
            text: 'Protestos por mês',
            fontSize: 16
        }
    };

    return (
        <div>
            <ToolbarMapCon></ToolbarMapCon>
            <div className="p-grid p-formgrid p-m-lg-3 p-m-2">
                <div className=" p-col-12 p-md-12 p-mb-lg-0">
                    {/* <div className='title-form'>Situação dos Cadastros</div> */}
                    <Chart type="bar" options={options} data={chartData} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const anoatual = moment().format('YYYY')

    let conflitosmes = await db.raw("SELECT to_char(data_protesto, 'YYYY-MM'),COUNT(num_seq_protesto) FROM protesto GROUP BY 1 ORDER BY 1;")
    conflitosmes = conflitosmes.rows
    // console.log(conflitosmes)

    return {
        props: {
            conflitosmes
        },
    }



}
