import React, { useState, useEffect } from 'react';
import client from '@/client';
import Table from '@/components/Table/Index';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await client.api.get('/items/perusahaan_bei', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    },
                    params: filter
                });
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [filter]);

    const columns = [
        { field: 'nama', label: 'Nama' },
        { field: 'kode_saham', label: 'Kode Saham' },
        { field: 'sektor_id', label: 'Sektor ID' },
        { field: 'tanggal_listing', label: 'Tanggal Listing' }
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const filters = [
        { name: 'Nama', field: 'nama', type: 'text' },
        { name: 'Kode Saham', field: 'kode_saham', type: 'text' },
        { name: 'Sektor ID', field: 'sektor_id', type: 'text' },
        { name: 'Tanggal Listing', field: 'tanggal_listing', type: 'date' }
    ];

    const dataFetchService = () => ({
        data: { data: data },
        isLoading: loading,
        error: error,
        isSuccess: !loading && !error
    });

    return (
        <Table
            dataFetchService={dataFetchService}
            columns={columns}
            limit={10}
            filters={filters}
            title="Data Perusahaan BEI"
            onFilterChange={setFilter}
        />
    );
};

export default Home;