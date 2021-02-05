import React from "react";
import DataTable from "../../app/DataTable";
import {useSelector} from "react-redux";
import {Paper} from "@material-ui/core";
import {deleteYears} from "../../../redux/actions/schoolActions";


export default function YearTable() {
    const years = useSelector(state => state.school.years.list.map(o => {
        return {...o, showLabel: o.schoolYear}
    }));
    const columns = [
        {
            field: "schoolYear",
            headerName: "Année scolaire",
            width: 200
        }, {
            field: "startDate",
            headerName: "Date Dubée",
            width: 200,
            type: "date"
        }, {
            field: "endDate",
            headerName: "Date Fin",
            width: 200,
            type: "date"
        }
    ]
    return (
        <Paper>
            <DataTable
                title={"Supprimer Année scolaire"}

                rows={years}
                columns={columns}
                toolbar={true}
                deleteAction={deleteYears}
            />
        </Paper>
    )
}