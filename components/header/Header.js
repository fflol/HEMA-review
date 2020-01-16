import React, { useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { userContext } from "../../tools/reactContext";
import * as apiUtiles from "../../firebase/firebaseApiUtils";

const Header = () => {
    const userLogged = useContext(userContext);
    const handleSignOut = () =>
        apiUtiles
            .signOut()
            .then(() => {
                toast.success("you are logged out");
            })
            .catch(err => console.log(err));
    return (
        <header>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>
                {" | "}
                <Link href="/businesses">
                    <a>Businesses</a>
                </Link>
                {" | "}
                <Link href="/users">
                    <a>Users</a>
                </Link>
                {" | "}
                {userLogged.email ? (
                    <>
                        <Link href="/user/[uid]" as={`/user/${userLogged.uid}`}>
                            <a>{userLogged.email}</a>
                        </Link>
                        <button onClick={handleSignOut}>log out</button>
                    </>
                ) : (
                    <button>log in</button>
                )}
            </nav>
        </header>
    );
};

Header.propTypes = {};

export default Header;
