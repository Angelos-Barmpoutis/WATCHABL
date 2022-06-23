import Page from './Page';

const Pages = (props) => { 
    return (
        <section className="pages wrapper">
            <a href="#" className="page" onClick={props.onePageBack}><i className="fa-solid fa-angle-left"></i></a>
            {props.page >= 3 && <Page page = {props.page-2} onClick={props.twoPagesBack}/>}
            {props.page >= 2 && <Page page = {props.page-1} onClick={props.onePageBack}/>}
            <Page
                page = {props.page}
                pageClass = 'active'
            />
            {props.page <= (props.totalPages - 1) && <Page page = {props.page+1} onClick={props.onePageUp}/>}
            {props.page <= (props.totalPages - 2) && <Page page = {props.page+2} onClick={props.twoPagesUp}/>}
            <a href="#" className="page" onClick={props.onePageUp}><i className="fa-solid fa-angle-right"></i></a>
        </section>
    )
}

export default Pages