import React, { useState, useEffect } from "react";
import { Container, Grid, Image, Input, Search } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getProductsApi } from "../../../api/products";
import { size } from "lodash";

export default function TopBar() {
    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Grid.Column width={8} className="top-bar__left">
                        <Logo />
                    </Grid.Column>
                    <Grid.Column width={8} className="top-bar__right">
                        <Swearch />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}


function Logo (){
    return (
        <Link href="/" >
            <a>
                <Image src="/logo.png" alt="Gaming" />
            </a>
        </Link>
    );
}

function Swearch() {
    const [searchStr, setSearchStr] = useState("")
    const [load, setLoad] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(load) {
            router.push(`/search?query=${searchStr}`)
        }
        setLoad(true);
    }, [searchStr])

    return (
        <Input input="search" id="search-product" icon={{ name: "search"}} value={router.query.query} onChange={(_, data) => setSearchStr(data.value)} />
    )
}

function Search2() {
    const [products, setProducts] = useState(null)
    console.log(products);

    useEffect(() => {
        (async () => {
          const response = await getProductsApi();
          if (size(response) > 0) setProducts(response);
          else setProducts([]);
        })()
      }, [])

    const resRender = ({ title }) => (
        <span key="name">
          {title}
        </span>
      );

      return (
        <Search
          fluid
          icon="search"
          placeholder="Search..."
          results={(products && products.title)}
          resultRenderer={resRender}
        />
      );
}