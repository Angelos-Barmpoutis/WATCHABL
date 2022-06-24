import Page from './Page';

const Pages = (props) => { 
    return (
        <section className="pages wrapper">
            {props.page > 1 && <button type='button' className="pages__page" onClick={props.onePageBack}><i className="fa-solid fa-angle-left"></i></button>}
            {props.page >= 3 && <Page page = {props.page-2} onClick={props.twoPagesBack}/>}
            {props.page > 1 && <Page page = {props.page-1} onClick={props.onePageBack}/>}
            <Page
                page = {props.page}
                pageClass = 'active'
            />
            {props.page < props.totalPages && <Page page = {props.page+1} onClick={props.onePageUp}/>}
            {props.page <= (props.totalPages - 2) && <Page page = {props.page+2} onClick={props.twoPagesUp}/>}
            {props.page < props.totalPages && <button type='button' className="pages__page" onClick={props.onePageUp}><i className="fa-solid fa-angle-right"></i></button>}
        </section>
    )
}

export default Pages