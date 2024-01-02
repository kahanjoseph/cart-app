import Pagination from 'react-bootstrap/Pagination';



const Paginate = ({totalCount, pageSize, siblingCount = 1, currentPage = 1, clicked}) => {

    //Show sibling count # of pages before and after current page
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const pages = [currentPage];
    for(let i = currentPage-1; i>0 && i>currentPage-siblingCount-1;i--){
        pages.unshift(i);
    }
    for(let i = currentPage+1; i<currentPage+siblingCount+1&& i<totalPageCount;i++){
        pages.push(i);
    }

    return (
        <Pagination>
            {/*<Pagination.First />*/}
            {/*<Pagination.Prev />*/}
            {pages.map((it, index) => (
                <Pagination.Item active={it === currentPage} onClick={() => clicked(it)}>{it}</Pagination.Item>
            ))}

            {/*<Pagination.Next />*/}
            {/*<Pagination.Last />*/}
        </Pagination>
    )
}

export default Paginate;
