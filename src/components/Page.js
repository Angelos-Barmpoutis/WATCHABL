const Page = ({page, pageClass, onClick}) => {
    return (
        <button aria-label={`Go to page ${page}`} type="button" className={`pages__page ${pageClass}`} onClick={onClick}>{page}</button>
    )
}

export default Page;