import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { generateRows, defaultNestedColumnValues } from './demo-data/generator';

// @ts-ignore
const getRowId = row => row.id;

function App() {
    const [columns] = useState([
        {
            name: 'firstName',
            title: 'First Name',
            // @ts-ignore
            getCellValue: row => (row.user ? row.user.firstName : undefined),
        },
        {
            name: 'lastName',
            title: 'Last Name',
            // @ts-ignore
            getCellValue: row => (row.user ? row.user.lastName : undefined),
        },
        {
            name: 'car',
            title: 'Car',
            // @ts-ignore
            getCellValue: row => (row.car ? row.car.model : undefined),
        },
        { name: 'position', title: 'Position' },
        { name: 'city', title: 'City' },
    ]);
    const [rows, setRows] = useState(generateRows({
        // @ts-ignore
        columnValues: { id: ({ index }) => index, ...defaultNestedColumnValues },
        length: 8,
    }));
    const [editingColumnExtensions] = useState([
        {
            columnName: 'firstName',
            // @ts-ignore
            createRowChange: (row, value) => ({ user: { ...row.user, firstName: value } }),
        },
        {
            columnName: 'lastName',
            // @ts-ignore
            createRowChange: (row, value) => ({ user: { ...row.user, lastName: value } }),
        },
        {
            columnName: 'car',
            // @ts-ignore
            createRowChange: (row, value) => ({ car: { model: value } }),
        },
    ]);

    // @ts-ignore
    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            // @ts-ignore
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                // @ts-ignore
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            // @ts-ignore
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            // @ts-ignore
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        // @ts-ignore
        setRows(changedRows);
    };


    return (
      <div>
          <Paper>
              <Grid
                  rows={rows}
                  columns={columns}
              >
                  <EditingState
                      columnExtensions={editingColumnExtensions}
                      // @ts-ignore
                      onCommitChanges={commitChanges}
                  />
                  <Table />
                  <TableHeaderRow />
                  <TableEditRow />
                  <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
              </Grid>
          </Paper>
      </div>
  );
}

export default App;
