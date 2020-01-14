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
    // db: PropTypes.object.isRequired
};

export default Businesses;
