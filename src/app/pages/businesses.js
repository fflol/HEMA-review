import PropTypes from "prop-types";
import Link from "next/link";

import * as apiUtils from "../firebase/firebaseApiUtils";

//
// component
const Businesses = ({ businesses }) => {
    return (
        <>
            <h1>Businesses listed:</h1>
            <ul>
                {businesses.map(business => (
                    <li key={business.id}>
                        <Link
                            href="/business/[id]"
                            as={`/business/${business.id}`}
                        >
                            <a>{business.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

//
Businesses.getInitialProps = async () => {
    return { businesses: await apiUtils.getBusinesses() };
};

Businesses.propTypes = {
    businesses: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string,
            email: PropTypes.string,
            email2: PropTypes.string,
            id: PropTypes.string,
            name: PropTypes.string,
            phone: PropTypes.string
        })
    ).isRequired
};

export default Businesses;
