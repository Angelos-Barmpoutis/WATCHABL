const Page = (props) => {
    return (
        <button type="button" className={`pages__page ${props.pageClass}`} onClick={props.onClick}>{props.page}</button>
    )
}

export default Page;