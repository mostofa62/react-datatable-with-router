import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from "react";
const axios = require('axios').default;
const columns = [
	{
		name: 'First Name',
		selector: row => row.first_name,
		sortable: true,
	},
	{
		name: 'Last Name',
		selector: row => row.last_name,
		sortable: true,
	},
	{
		name: 'Email',
		selector: row => row.email,
		sortable: true,
	},
];

export const Remote = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

	const fetchUsers = async page => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
		
	}, []);

	return (
		<DataTable
			title="Items"
			columns={columns}
			data={data}
			progressPending={loading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
		/>
	);
}

export default Remote;