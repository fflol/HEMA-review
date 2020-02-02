import PropTypes from "prop-types";

import * as apiUtils from "../../firebase/firebaseApiUtils";

//
// component
const Prod = ({ business }) => {
    return (
        <>
            <h1>{business.name}</h1>
            <p>phone: {business.phone}</p>
            <p>email: {business.email}</p>
            <p>address: {business.address}</p>
        </>
    );
};

//
Prod.getInitialProps = async ({ query }) => {
    return {
        business: await apiUtils.getBusiness(query.id)
    };
};

Prod.propTypes = {
    business: PropTypes.shape({
        address: PropTypes.string,
        email: PropTypes.string.isRequired,
        email2: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string
    }).isRequired
};

export default Prod;
