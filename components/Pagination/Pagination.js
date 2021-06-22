import React from 'react'
import { Pagination as PaginationSU } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import QueryString from 'query-string';

export default function Pagination(props) {
    const { totalProducts, page, limirPerPage } = props;
    const totalPages = Math.ceil(totalProducts / limirPerPage)
    const router = useRouter();
    const urlParse = QueryString.parseUrl(router.asPath);

    const goToPage= (newPage) => {
        urlParse.query.page = newPage;
        const url = QueryString.stringifyUrl(urlParse);
        router.push(url)
    }

    return (
        <div className="pagination">
            <PaginationSU defaultActivePage={page} totalPages={totalPages}  firstItem={null} lastItem={null} onPageChange={(_, data) => goToPage(data.activePage) } 
            boundaryRange={0} siblingRange={1} ellipsisItem={null} />
        </div>
    )
}
