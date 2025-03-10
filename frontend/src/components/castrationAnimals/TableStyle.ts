import { TableStyles } from "react-data-table-component";

export  const customTableStyle: TableStyles =
    {
        rows: {
            style: {
                backgroundColor: '#f3f4f6',
            },
            highlightOnHoverStyle: {
                backgroundColor: '#e1e1e1',
                color: '#000',
                border: 'none'
            }
        },

        cells: {
            style: {
                padding: '0.5rem',
            }
        },

        headCells: {
            style: {
                padding: '0.5rem',
            }
        },
        pagination: {
            style: {
                backgroundColor: '#f3f4f6',
                borderBottom: '1px solid #d2d6dc',

            }
        },
        headRow: {
            style: {
                backgroundColor: '#f3f4f6',

            }
        },
        head: {
            style: {
                backgroundColor: '#f3f4f6',
            }
        },
        header: {
            style: {
                backgroundColor: '#f3f4f6',
                padding: '0.5rem',
            }
        }

    }