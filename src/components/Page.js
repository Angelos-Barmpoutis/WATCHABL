const Page = (props) => {
    return (
        <a href="#" className={`page ${props.pageClass}`} onClick={props.onClick}>{props.page}</a>
    )
}

export default Page;