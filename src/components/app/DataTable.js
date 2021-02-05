import {DataGrid} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import DeleteDialog from "./DeleteDialog";
import {useState} from "react";
import {useDispatch} from "react-redux";

export default function DataTable({title, columns, rows, toolbar, deleteAction}) {
    const [del, setDel] = useState(null);
    const deleteDia = (id) => {
        const list = rows.filter(o => o.id === id);
        setDel({list: list})
    }
    const dispatch = useDispatch();
    const handleDelete = (confirm) => {
        if (confirm) {
            dispatch(deleteAction(del.list.map(o => o.id)));
        }
        setDel(null)
    }
    return (<div style={{height: 520, width: '100%'}}>
        <DeleteDialog title={title}
                      open={del}
                      handleDelete={handleDelete}
                      items={del ? del.list : []}
        />

        <DataGrid
            columns={[...columns, {
                field: 'id',
                headerName: 'Actions',
                renderCell: (params) => (
                    <strong>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => deleteDia(params.value)}
                        >
                            Delete
                        </Button>
                    </strong>)
            }]}
            rows={rows}
            pageSize={10}
            checkboxSelection
            showToolbar={toolbar}
            disableSelectionOnClick={true}
        />
    </div>);
}