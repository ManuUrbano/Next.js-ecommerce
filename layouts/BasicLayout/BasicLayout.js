import { Container } from "semantic-ui-react";
import classNames from "classnames";
import Header from "../../components/Header";


export default function BasicLayout(props) {
    const { children, className, categories, subCategories } = props;
    /* className="basic-layout" */
    return (
        <Container fluid className={classNames("basic-layout", {
            [className]: className,
        })}>
            <Header categories={categories} subCategories={subCategories} />
            <Container className="content">{ children }</Container>
        </Container>
    )
}
