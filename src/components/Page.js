const Page = (props) => {
    return (
        <button aria-label={`Go to page ${props.page}`} type="button" className={`pages__page ${props.pageClass}`} onClick={props.onClick}>{props.page}</button>
    )
}

export default Page;