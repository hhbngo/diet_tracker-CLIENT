import React, {useState, useEffect} from 'react';
import classes from './index.module.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Pagination from '../../components/Pagination/Pagination';
import { createEntrie, getEntries } from '../../functions/userHome';

export default function UserHome({history}) {
    const [ loading, setLoading ] = useState(false);
    const [ entries, setEntries ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        setLoading(true);
        refresh(page);
    }, [page]);

    const refresh = (page) => {
        getEntries(page)
        .then(res => {
            setLoading(false);
            const {pageEntries, totalEntries} = res.data;
            const total = Math.max(1, Math.ceil(totalEntries / 4)); 
            setTotalPages(total);
            setEntries(pageEntries.reverse());
        })
        .catch(err => {
            setLoading(false);
        })
    }

    const handleAddEntry = () => {
        setLoading(true);
        createEntrie()
        .then(res => {
            refresh(page);
        })
        .catch(err => {
            setLoading(false);
        })
    };

    const handlePageChange = newPage => {
        if (newPage > totalPages || newPage < 1 || newPage === page) return;
        setPage(newPage);
    };

    const handleEntryClick = id => history.push('/entry/'+id);

    return <main>
        <Header/>
        <Main 
            loading={loading}
            entries={entries}
            handleAddEntry={handleAddEntry}
            handleEntryClick={handleEntryClick}
        />
        <div className={classes.wrapper}>
            <div className={classes.pagination}>
                <Pagination
                    loading={loading}
                    currentPage={page} 
                    totalPages={totalPages} 
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    </main>
};

// front: change pagination +
// back: optimize 4 entry page search +
// front: list container justify center add margin to entry-boxes (20px) +
// front: show pagination buttons while loading +
