import PropTypes from "prop-types";

import Search from "../components/search/Search";
import Featured from "../components/feature/Featured";
import Recent from "../components/recent/Recent";

import * as helpers from "../tools/helpers";
import * as apiUtils from "../firebase/firebaseApiUtils";

//
// component
const Index = ({ products }) => {
    const featured = helpers.findFeatured(products);

    return (
        <>
            <h1>HEMA Gear Reviews</h1>
            <Search products={products} />
            <Featured featured={featured} />
            {/* <Recent recentReviewed={recentReviewed} /> */}
        </>
    );
};

//
Index.getInitialProps = async () => {
    return { products: await apiUtils.getProducts() };
};

Index.propTypes = {
    // db: PropTypes.object.isRequired
};

export default Index;
