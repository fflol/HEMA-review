import { useState, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "firebase/auth";

import UserProfile from "../../components/userProfile/UserProfile";
import UserEmail from "../../components/userEmail/UserEmail";
import UserPassword from "../../components/userPassword/UserPassword";
import * as apiUtils from "../../firebase/firebaseApiUtils";
import { userContext } from "../../tools/reactContext";
import { FbTimestampToReadable } from "../../tools/timeFormat";

//
// component
const User = ({ user }) => {
    const [isEditingProfile, setIsEditingProfile] = useState(false); // condition 1
    const [isEditingEmail, setIsEditingEmail] = useState(false); // condition 2
    const [isEditingPassword, setIsEditingPassword] = useState(false); // condition 3
    const [nameInput, setNameInput] = useState(user.displayName || "");
    const [emailInput, setEmailInput] = useState(user.email);

    const userLogged = useContext(userContext);

    // vars
    const isOwnUser = user.email === userLogged.email; // condition 4
    const isProvidedByFirebase = user.provider === "password";
    const timeJoined = FbTimestampToReadable(user.timeRegistered.seconds);

    // handlers
    const handleEditProfile = () => setIsEditingProfile(!isEditingProfile);
    const handleEditEmail = () => setIsEditingEmail(!isEditingEmail);
    const handleEditPassword = () => setIsEditingPassword(!isEditingPassword);

    // JSX chunks
    const editProfileButton = (
        <button onClick={handleEditProfile}>
            {isEditingProfile ? "cancel editing" : "edit your profile"}
        </button>
    );

    const editEmailButton = (
        <button onClick={handleEditEmail}>
            {isEditingEmail ? "cancel editing" : "edit your email"}
        </button>
    );

    const editPasswordButton = (
        <button onClick={handleEditPassword}>
            {isEditingPassword ? "cancel editing" : "edit password"}
        </button>
    );

    return (
        <>
            {isEditingProfile ? (
                <UserProfile
                    nameInput={nameInput}
                    setNameInput={setNameInput}
                    user={user}
                    setIsEditingProfile={setIsEditingProfile}
                />
            ) : (
                <div>
                    <h1>
                        name: {user.displayName ? nameInput : "haven't setup"}
                    </h1>
                    <img src={user.photoURL} alt="user photo" />
                </div>
            )}
            {isOwnUser && editProfileButton}
            {isEditingEmail ? (
                <UserEmail
                    emailInput={emailInput}
                    setEmailInput={setEmailInput}
                    user={user}
                    setIsEditingEmail={setIsEditingEmail}
                />
            ) : (
                <p>email: {emailInput}</p>
            )}
            {isOwnUser && isProvidedByFirebase && editEmailButton}
            <br />
            {isOwnUser && isEditingPassword && (
                <UserPassword setIsEditingPassword={setIsEditingPassword} />
            )}
            {isOwnUser && isProvidedByFirebase && editPasswordButton}
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
