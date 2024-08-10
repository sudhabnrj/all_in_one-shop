// src/utils/orderColumns.js

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const getOrderColumns = (handleViewClick) => [
    {
        name: 'Order Id',
        selector: row => row.orderid,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row?.orderDate,
        sortable: true,
    },
    {
        name: 'User Id',
        selector: row => row.userid,
        sortable: true,
    },
    {
        name: 'Full Name',
        selector: row => row?.firstName ? row?.firstName + ' ' + row?.lastName : ``,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Total',
        selector: row => row.totalAmount.toFixed(2),
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => row?.city + ", " + row?.country + ", " + row.appt + ", " + row.address,
        sortable: true,
    },
    {
        name: 'Phone',
        selector: row => row?.phone,
        sortable: true,
    },
    {
        name: 'Payment Method',
        selector: row => row.paymentMethod,
        sortable: true,
    },
    {
        name: 'Action',
        cell: row => (
            <div className="flex justify-center">
                <button onClick={() => handleViewClick(row.orderid)}>
                    <VisibilityOutlinedIcon />
                </button>
            </div>
        )
    }
];

export default getOrderColumns;
