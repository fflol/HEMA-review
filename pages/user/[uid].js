import { useState, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "firebase/auth";

import UserProfile from "../../components/userProfile/UserProfile";
import UserPassword from "../../components/userPassword/UserPassword";
import * as apiUtils from "../../firebase/firebaseApiUtils";
import { userContext } from "../../tools/reactContext";
import { FbTimestampToReadable } from "../../tools/timeFormat";

//
// component
const User = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false); // condition 1
    const [isEditingPassword, setIsEditingPassword] = useState(false); // condition 2
    const [nameInput, setNameInput] = useState(user.displayName || "");
    const [emailInput, setEmailInput] = useState(user.email);

    const userLogged = useContext(userContext);

    // vars
    const isOwnUser = user.email === userLogged.email; // condition 3
    const timeJoined = FbTimestampToReadable(user.timeRegistered.seconds);

    // handlers
    const handleEditStart = () => setIsEditing(!isEditing);
    const handleEditPassword = () => setIsEditingPassword(!isEditingPassword);

    // JSX chunks
    const editProfileButton = (
        <button onClick={handleEditStart}>
            {isEditing ? "cancel editing" : "edit your profile"}
        </button>
    );

    const editPasswordButton = (
        <button onClick={handleEditPassword}>
            {isEditingPassword ? "cancel editing" : "edit password"}
        </button>
    );

    return (
        <>
            {isEditing ? (
                <UserProfile
                    nameInput={nameInput}
                    setNameInput={setNameInput}
                    emailInput={emailInput}
                    setEmailInput={setEmailInput}
                    user={user}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <>
                    <h1>
                        name: {user.displayName ? nameInput : "haven't setup"}
                    </h1>
                    <p>photo:{user.photoURL}</p>
                    <p>email: {emailInput}</p>
                </>
            )}
            {isOwnUser && editProfileButton}
            {isOwnUser && isEditingPassword && <UserPassword />}
            {isOwnUser && editPasswordButton}
            <p>reviews: {user.reviews}</p>
            <p>joined since: {timeJoined}</p>
        </>
    );
};

//
User.getInitialProps = async ({ query }) => {
    return {
        user: { uid: query.uid, ...(await apiUtils.getUser(query.uid)) }
    };
};

User.propTypes = {};

export default User;
