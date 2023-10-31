import React from 'react'

const Pagination = ({ pageNo, perPage, pagination, totalPages, goPrev, goNext, onPageChange, options }) => {
    return (
        <div className={`paginationDiv ${options?.whiteBG ? "whiteBG" : ""}`}>
            <div className='paginationShown'>
                <span>Showing {(Number(perPage) * Number(pageNo - 1)) + 1} to {(Number(perPage) * Number(pageNo)) > totalPages ? totalPages : (Number(perPage) * Number(pageNo))} of {totalPages} entries</span>
            </div>
            <div className={`paginationNo`}>
                <p onClick={goPrev} className='showMobile'>Prev</p>
                {
                    pagination &&
                    pagination.length > 0 &&
                    pagination
                        .slice(pageNo - 3 <= 0 ? 0 : pageNo - 3, pageNo + 2 > pagination.length ? pagination.length : pageNo + 2)
                        .map((page, idx) => (
                            <p key={page} className={`${page === pageNo ? "active" : ""} ${idx + 1 === pageNo ? "showMobile" : ""}`} onClick={() => onPageChange(page)}>{page}</p>
                        ))
                }
                <p onClick={goNext} className='showMobile'> Next</p>
            </div>
        </div>
    )
}

export default Pagination