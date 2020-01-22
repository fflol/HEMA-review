import { useState } from "react";
import PropTypes from "prop-types";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";

import ProdList from "../components/prodList/ProdList";
import * as helpers from "../tools/helpers";
import * as apiUtils from "../firebase/firebaseApiUtils";

//
// component
const Index = ({ products }) => {
    const [tabValue, setTabValue] = useState(0);

    // vars
    const highestRatedProd = helpers.findHighRated(products);

    // handlers
    const handleTabChange = (event, newValue) => setTabValue(newValue);

    return (
        <Container maxWidth="sm">
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="product view tab"
            >
                <Tab label="highest rate" {...helpers.a11yProps(0)} />
                <Tab label="recent reviewed" {...helpers.a11yProps(1)} />
            </Tabs>
            <ProdList products={highestRatedProd} />
        </Container>
    );
};

//
Index.getInitialProps = async () => {
    return { products: await apiUtils.getProducts() };
};

Index.propTypes = {
    products: PropTypes.array.isRequired
};

export default Index;
