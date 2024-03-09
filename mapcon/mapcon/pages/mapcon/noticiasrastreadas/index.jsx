import React, { useEffect, useRef, useState } from "react";
import TableCrud from "../../../lib/front/cruddatatable/datatable";
import { Column } from "primereact/column";
import { useRouter } from "next/router";
import axios from "axios";
import ToolbarMapCon from "../../../components/toolbar_mapcon";
import Loading from "../../../components/loading/loading";
import { getSession } from "next-auth/client";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";
import { InputSwitch } from "primereact/inputswitch";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import moment from "moment";

export default function NoticiasRastreadasPage(props) {
  const router = useRouter();

  const [showForm, setshowForm] = useState({ visible: false });
  const [loading, setloading] = useState(true);

  // Para conseguir atualizar datatable
  const childRef = useRef();

  useEffect(async () => {
    const session = await getSession();
    if (!session) {
      router.push("/login");
    } else {
      setloading(false);
    }
  }, []);

  async function deleteButtonClicked(e, search) {
    confirmDialog({
      message: "Tem certeza que deseja remover os dados selecionados?",
      header: "Confirmação",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeRows(e),
      acceptLabel: "Sim",
      rejectLabel: "Não",
      // reject: () => rejectFunc()
    });
  }

  async function removeRows(e) {
    for (const item of e) {
      await axios.delete("/api/mapcon/crawling_news", {
        data: { url: item.url },
      });
    }

    childRef.current.updateDatatable();
  }

  function closeFormDialog(update) {
    setshowForm(false);
    if (update) {
      childRef.current.updateDatatable();
    }
  }

  async function processNews(data) {
    const formated_date = moment(data.data).format("YYYY-MM-DD");

    const close_protests = await (
      await axios.get(
        `/api/mapcon/get_protestos_proximos?data=${formated_date}`
      )
    ).data;

    setshowForm({
      information: data,
      close_protests,
      visible: true,
    });
  }

  // Filtros
  const filters = [
    { label: "Título", value: "titulo", types: ["contain", "equal"] },
    { label: "URL", value: "url", types: ["contain", "equal"] },
  ];

  const dataBodyTemplate = (rowData) => {
    return (
      <div>
        <span className="p-column-title">Data</span>
        {rowData.data ? moment(rowData.data).format("DD/MM/YYYY") : ""}
      </div>
    );
  };

  const predictedTemplate = (rowData) => {
    return (
      <div>
        <span className="p-column-title">Tipo (Predição)</span>
        {rowData.tipo_predicted ? (
          rowData.tipo_predicted == 0 ? (
            <Tag className="p-mr-2" severity="success" value="Outra"></Tag>
          ) : (
            <Tag className="p-mr-2" severity="danger" value="Protesto"></Tag>
          )
        ) : (
          <Tag className="p-mr-2" value="Não processada"></Tag>
        )}
      </div>
    );
  };

  function actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span className="p-column-title">Ações</span>
        <Button
          icon="pi pi-external-link"
          className="p-button-primary p-mr-2"
          onClick={() => processNews(rowData)}
        />
      </React.Fragment>
    );
  }

  return loading ? (
    <Loading></Loading>
  ) : (
    <div>
      <ToolbarMapCon></ToolbarMapCon>
      <div className="p-grid p-formgrid p-m-lg-3 p-m-2">
        <div className="p-col-12 p-mb-12 p-lg-12 p-mb-lg-0">
          <TableCrud
            ref={childRef}
            {...props}
            title="Notícias Rastreadas"
            filters={filters}
            // onAddButtonClicked={addButtonClicked}
            // onEditButtonClicked={editButtonClicked}
            // onDeleteButtonClicked={deleteButtonClicked}
            url="/api/mapcon/crawling_news"
          >
            <Column
              field="data"
              body={dataBodyTemplate}
              header="Data"
              sortable={true}
            />
            <Column field="titulo" header="Título" sortable={true} />
            <Column
              field="tipo_predicted"
              body={predictedTemplate}
              header="Tipo (Predição)"
              sortable={true}
            />
            <Column header="Ações" body={actionBodyTemplate}></Column>
          </TableCrud>
        </div>
      </div>
      {showForm.visible ? (
        <MigraNoticiaForm
          showForm={showForm}
          closeForm={(update) => closeFormDialog(update)}
        ></MigraNoticiaForm>
      ) : null}
    </div>
  );
}

/*
    Dialog para formulário de inclusão/edição do crud
*/
function MigraNoticiaForm({ showForm, closeForm }) {
  const { visible, information, close_protests } = showForm;

  const { url, cidades, content, data, termos, tipo, tipo_predicted, titulo } =
    information;

  const [sending, setSending] = useState(false);

  const { control, watch, handleSubmit, errors } = useForm({
    defaultValues: {
      is_protesto: false,
      existente: null,
      // data: moment(data).format('dd/mm/yyyy'),
      titulo: titulo,
    },
  });

  const onSubmit = async (data) => {
    setSending(true);
    data.url = url;

    data.data = moment(data.data).format("yyyy-MM-DD");

    const ret = await axios
      .post(`/api/mapcon/migra`, data)
      .then(() => setSending(false))
      .catch(() => setSending(false));
    closeForm(true);
  };

  useEffect(() => {
    console.log(close_protests);
  }, []);

  const isProtesto = watch("is_protesto");
  const isExistenteSet = watch("existente");

  return (
    <Dialog
      header="Avaliar Notícia Rastreada"
      className="p-fluid"
      modal
      visible={showForm.visible}
      onHide={() => closeForm(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-fluid p-formgrid p-grid p-mt-lg-4 p-mt-4">
          <div className="p-field p-col-12 p-md-2">
            <label>Data</label>
            <br />
            {moment(data).format("DD/MM/YYYY")}
          </div>
          <div className="p-field p-col-12 p-md-8">
            <label>Título</label>
            <br />
            <a href={url} target="blank">
              {titulo}
            </a>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="is_protesto">É um protesto?*</label>
            <br />
            <Controller
              name="is_protesto"
              control={control}
              render={({ onChange, value }) => (
                <InputSwitch
                  checked={value}
                  onChange={(e) => onChange(e.value)}
                />
              )}
            />
          </div>
          {isProtesto ? (
            <div className="p-field p-col-12 p-md-12">
              <label htmlFor="data">
                Vincular a um protesto já cadastrado*
              </label>
              <br />

              <Controller
                name="existente"
                rules={{ required: true }}
                control={control}
                render={({ onChange, value }) => (
                  <>
                    {close_protests?.map((protest) => (
                      <div className="p-field-radiobutton">
                        <RadioButton
                          inputId="existente"
                          name="existente"
                          value={protest.num_seq_protesto}
                          onChange={(e) => onChange(e.value)}
                          checked={value === protest.num_seq_protesto}
                        />
                        <label htmlFor="existente">
                          {protest.data_protesto} - {protest.tema_protesto}
                        </label>
                      </div>
                    ))}

                    <div className="p-field-radiobutton">
                      <RadioButton
                        inputId="existente"
                        name="existente"
                        value="novo"
                        onChange={(e) => onChange(e.value)}
                        checked={value === "novo"}
                      />
                      <label htmlFor="existente">Novo Protesto</label>
                    </div>
                  </>
                )}
              />
            </div>
          ) : null}
          {isProtesto && isExistenteSet === "novo" ? (
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="data">Data*</label>
              <Controller
                name="data"
                rules={{ required: true }}
                control={control}
                render={({ onChange, value }) => (
                  <Calendar
                    value={data}
                    onChange={(e) => onChange(e.value)}
                    dateFormat="dd/mm/yy"
                    mask="99/99/9999"
                    showIcon
                  />
                )}
              />
            </div>
          ) : null}
          {isProtesto && isExistenteSet === "novo" ? (
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="titulo">Tema*</label>
              <Controller
                name="titulo"
                rules={{ required: true }}
                control={control}
                render={({ onChange, value }) => (
                  <InputText
                    disabled={!isProtesto}
                    className={errors.titulo ? "p-invalid" : ""}
                    value={value}
                    onChange={onChange}
                  ></InputText>
                )}
              />
            </div>
          ) : null}
          <div className="p-field p-col-12 p-md-offset-6 p-md-6">
            <Button
              disabled={sending}
              label={sending ? "Atualizando..." : "Atualizar"}
              icon="pi pi-check"
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
}
