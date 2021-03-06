import PropTypes from "prop-types";
import Link from "next/link";

import * as apiUtils from "../firebase/firebaseApiUtils";

//
// component
const Users = ({ users }) => {
    return (
        <>
            <h1>users listed:</h1>
            <ul>
                {users.map(user => (
                    <li key={user.uid}>
                        <Link href="/user/[uid]" as={`/user/${user.uid}`}>
                            <a>
                                {user.displayName
                                    ? user.displayName
                                    : user.email}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

//
Users.getInitialProps = async () => {
    return { users: await apiUtils.getUsers() };
};

Users.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            displayName: PropTypes.string,
            email: PropTypes.string.isRequired,
            emailVerified: PropTypes.bool.isRequired,
            photoURL: PropTypes.string,
            provider: PropTypes.string.isRequired,
            reviews: PropTypes.number.isRequired
        })
    ).isRequired
};

export default Users;
