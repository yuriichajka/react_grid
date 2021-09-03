import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
} from '@devexpress/dx-react-grid'
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

import { generateRows } from "./demo-data/generator";


function App() {
    const [columns] = useState([
        { name: 'name', title: 'Name'},
        { name: 'gender', title: 'Gender'},
        { name: 'city', title: 'City'},
        { name: 'car', title: 'Car'},
    ]);
    const [rows] = useState(generateRows({ length: 20}));
    const [selection, setSelection] = useState([])

    return (
      <div>
          <span>
              Total rows selected:
              {' '}
              {selection.length}
          </span>
          <Paper elevation={14}>
              <Grid
                  rows={rows}
                  columns={columns}
              >
                  <PagingState
                      defaultCurrentPage={0}
                      pageSize={5}
                  />
                  <SelectionState
                      selection={selection}
                      // @ts-ignore
                      onSelectionChange={setSelection}
                  />
                  <IntegratedPaging />
                  <IntegratedSelection />
                  <Table />
                  <TableHeaderRow />
                  <TableSelection showSelectAll />
                  <PagingPanel />
              </Grid>
          </Paper>
      </div>
  );
}

export default App;
