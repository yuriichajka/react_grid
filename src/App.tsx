import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { generateRows } from './demo-data/generator';



function App() {
    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
    ]);
    const [rows] = useState(generateRows({ length: 8 }));
    const [sorting, setSorting] = useState([{ columnName: 'car', direction: 'asc' }]);

    return (
      <div>
          <Paper>
              <Grid
                  rows={rows}
                  columns={columns}
              >
                  <SortingState
                      // @ts-ignore
                      sorting={sorting}
                      onSortingChange={setSorting}
                  />
                  <IntegratedSorting />
                  <Table />
                  <TableHeaderRow showSortingControls />
              </Grid>
          </Paper>
      </div>
  );
}

export default App;
