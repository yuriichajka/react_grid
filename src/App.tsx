import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {
    generateRows,
    employeeTaskValues,
} from './demo-data/generator';

function App() {
    const [columns] = useState([
        { name: 'subject', title: 'Subject (with enabled word wrap)' },
        { name: 'startDate', title: 'Start Date' },
        { name: 'dueDate', title: 'Due Date' },
        { name: 'priority', title: 'Priority' },
        { name: 'status', title: 'Status' },
    ]);
    // @ts-ignore
    const [rows] = useState(generateRows({ columnValues: employeeTaskValues, length: 8 }));
    const [tableColumnExtensions] = useState([
        { columnName: 'subject', wordWrapEnabled: true },
    ]);

    return (
      <div>
          <Paper>
              <Grid
                  rows={rows}
                  columns={columns}
              >
                  <Table
                      // @ts-ignore
                      columnExtensions={tableColumnExtensions}
                  />
                  <TableHeaderRow />
              </Grid>
          </Paper>
      </div>
  );
}

export default App;
