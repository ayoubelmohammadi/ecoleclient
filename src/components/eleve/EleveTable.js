import React, {useEffect, useState} from "react"
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Slide} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {deleteEleves, fetchEleves} from "../../redux/actions/eleveActions";
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ROWS_PER_PAGE_OPTIONS = [10, 20, 100];

function createData(eleve) {
    console.log(eleve)
    return [
        eleve.id,
        eleve.lastName,
        eleve.firstName,
        eleve.gender ? "M." : "F.",
        new Intl.DateTimeFormat("fr-Fr").format(new Date(eleve.birthday))
    ]
}

export default function EleveTable() {
    const columns = [
        {
            name: "id",
            label: "ID"
        },
        {
            name: "lastName",
            label: "NOM"
        },
        {
            name: "firstName",
            label: "PRÉNOM"
        },
        {
            name: "gender",
            label: "SEXE"
        },
        {
            name: "birthday",
            label: "DATE DE NAISSANCE"
        }
    ];
    const {content, totalElements, pageNumber} = useSelector(state => state.eleves.page);
    const [data, setData] = useState([]);
    const [deleteI, setDeleteI] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        fields: "id",
        direction: "asc"
    });
    const dispatch = useDispatch();
    useEffect(() => {
        content && setData(content.map(o => createData(o)));
    }, [content]);
    useEffect(() => {
        dispatch(fetchEleves(pagination));
    }, [pagination]);
    const deleteHandle = (deleted) => {
        if (deleted) {
            dispatch(deleteEleves(pagination, {ids: deleteI.map(i => content[i].id)}));
            setDeleteI([]);
        } else {
            setDeleteI([]);
        }
    }
    const options = {
        filters: false,
        rowsPerPage: pagination.size,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
        serverSide: true,
        sortOrder: {
            name: pagination.fields,
            direction: pagination.direction
        },
        count: totalElements,
        page: pageNumber,
        onTableChange: (action, tableState) => {
            if (action === "sort")
                setPagination({
                    ...pagination,
                    direction: tableState.sortOrder.direction,
                    fields: tableState.sortOrder.name
                });
            if (action === "changePage") {
                setPagination({...pagination, page: tableState.page});
            }
        },
        onChangeRowsPerPage: rowsPerPage => {
            setPagination({...pagination, size: rowsPerPage});
        },
        onRowsDelete: (data) => {
            setDeleteI(data.data.map(o => o.dataIndex));
        }
    };
    return (
        <Paper>
            <EleveDelete handleDone={deleteHandle} indexList={deleteI} open={deleteI.length > 0}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"Employee List"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export function EleveDelete({indexList, open, handleDone}) {
    const {content} = useSelector(state => state.eleves.page);
    const [list, setList] = useState([]);
    useEffect(() => {
        setList(indexList.map(i => {
            const eleve = content[i];
            return eleve.id + " " + eleve.nom + " " + eleve.prenom
        }).join(", ") + ".");
    }, [indexList]);
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleDone(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Êtes-vous sûr de vouloir supprimer ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Êtes-vous sûr de supprimer ces enregistrements ?
                        En supprimant définitivement, vous ne pourrez pas les récupérer.<br/>
                        {list}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDone(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => handleDone(true)} color="primary">
                        Oui, supprimer!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}