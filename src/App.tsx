import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
    DataTypeProvider,
    EditingState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

import {
    generateRows,
    globalSalesValues,
} from './demo-data/generator';

// @ts-ignore
const getRowId = row => row.id;

// @ts-ignore
const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;
// @ts-ignore
const BooleanEditor = ({ value, onValueChange }) => (
    <Select
        input={<Input />}
        value={value ? 'Yes' : 'No'}
        onChange={event => onValueChange(event.target.value === 'Yes')}
        style={{ width: '100%' }}
    >
        <MenuItem value="Yes">
            Yes
        </MenuItem>
        <MenuItem value="No">
            No
        </MenuItem>
    </Select>
);
// @ts-ignore
const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
);

function App() {
    const [columns] = useState([
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'units', title: 'Units' },
        { name: 'shipped', title: 'Shipped' },
    ]);
    const [rows, setRows] = useState(generateRows({
        // @ts-ignore
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 8,
    }));
    const [booleanColumns] = useState(['shipped']);
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
            // @ts-ignore
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
                  getRowId={getRowId}
              >
                  <BooleanTypeProvider
                      for={booleanColumns}
                  />
                  <EditingState
                      // @ts-ignore
                      onCommitChanges={commitChanges}
                      defaultEditingRowIds={[0]}
                  />
                  <Table />
                  <TableHeaderRow />
                  <TableEditRow />
                  <TableEditColumn
                      showAddCommand
                      showEditCommand
                      showDeleteCommand
                  />
              </Grid>
          </Paper>
      </div>
  );
}

export default App;
