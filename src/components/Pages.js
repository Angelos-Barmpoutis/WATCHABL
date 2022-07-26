import Page from './Page';

const Pages = ({state, setState, page, onePageBack, twoPagesBack, totalPages, onePageUp, twoPagesUp}) => { 
    return (
        <section className="pages wrapper">
            {page > 1 && <button type='button' aria-label='Previous page' className="pages__page" onClick={() => onePageBack(state, setState)}><i className="fa-solid fa-angle-left"></i></button>}
            {page >= 3 && <Page page = {page-2} onClick={() => twoPagesBack(setState)}/>}
            {page > 1 && <Page page = {page-1} onClick={() => onePageBack(state, setState)}/>}
            <Page
                page = {page}
                pageClass = 'active'
            />
            {page < totalPages && <Page page = {page+1} onClick={() => onePageUp(state, setState)}/>}
            {page <= (totalPages - 2) && <Page page = {page+2} onClick={() => twoPagesUp(setState)}/>}
            {page < totalPages && <button aria-label='Next page' type='button' className="pages__page" onClick={() => onePageUp(state, setState)}><i className="fa-solid fa-angle-right"></i></button>}
        </section>
    )
}

export default Pages