import * as fb from "firebase/app";
import { firebase } from "./firebaseConfig"; // initialized instance
import "firebase/firestore";
import "firebase/auth";
// import * as storageApis from "./firebaseStorageApis";

const db = firebase.firestore();

//
//   ---------- firestore ----------
//review CRUD -- C UD
export const addReview = async (productID, newReview) =>
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .add(newReview) // generates new id
        .then(res => res.id)
        .catch(err => console.log(err));

export const deleteReview = async (productID, reviewID) =>
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .doc(reviewID)
        .delete()
        .catch(err => console.log(err));

export const setReview = async (productID, reviewID, updatedReview) =>
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .doc(reviewID) //need this id to update
        .set(updatedReview, { merge: true }) // merge instead of overwrite the whole doc
        .catch(err => console.log(err));

//
// review CRUD -- Read
export const getReviews = async productID => {
    let reviews = [];
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .orderBy("timeReviewed", "desc")
        .get()
        .then(Snapshot => {
            Snapshot.forEach(doc => {
                const objWithID = { id: doc.id, ...doc.data() };
                const { userRef, ...rest } = objWithID;
                reviews.push(rest);
            });
        })
        .catch(error => {
            console.log("Error getting reviews: ", error);
        });

    return reviews;
};

//
//products CRUD -- C UD -- admin only

export const setProd = async (productID, updatedProd) =>
    await db
        .collection("products")
        .doc(productID) //need this id to update
        .set(updatedProd, { merge: true }) // merge instead of overwrite the whole doc
        .catch(err => console.log(err));

//
//products CRUD -- read
export const getProducts = async () => {
    let products = [];
    await db
        .collection("products")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // const imgUrls = storageApis.getStorageUrlsForProducts(doc.id);
                const prod = { id: doc.id, ...doc.data() };
                const { businessRef, ...rest } = prod;
                products.push(rest);
            });
        })
        .catch(error => {
            console.log("Error getting products:", error);
        });

    return products;
};

export const getProd = async productID => {
    const prod = await db
        .collection("products")
        .doc(productID)
        .get()
        .then(doc => {
            if (doc.exists) {
                const objWithID = { id: productID, ...doc.data() };
                const { businessRef, ...rest } = objWithID;
                return rest;
            } else {
                console.log("No such document!");
                return null;
            }
        })
        .catch(error => {
            console.log("Error getting prod:", error);
        });

    return prod;
};

//
// businesses CRUD -- read
export const getBusinesses = async () => {
    const businesses = [];
    await db
        .collection("businesses")
        .get()
        .then(Snapshot => {
            Snapshot.forEach(doc => {
                businesses.push({ id: doc.id, ...doc.data() });
            });
        })
        .catch(error => {
            console.log("Error getting businesses:", error);
        });

    return businesses;
};

export const getBusiness = async businessID => {
    const business = await db
        .collection("businesses")
        .doc(businessID)
        .get()
        .then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document!");
                return null;
            }
        })
        .catch(error => {
            console.log("Error getting business:", error);
        });

    return business;
};

// user CRUD --C U
export const setUser = async (uid, newUser) =>
    await db
        .collection("users")
        .doc(uid) // use existing id
        .set(newUser)
        .then(res => res)
        .catch(err => console.log(err));

export const updateDBUserNameAndPhoto = async (uid, displayName, photoURL) => {
    await db
        .collection("users")
        .doc(uid)
        .update({
            ...(displayName && { displayName }),
            ...(photoURL && { photoURL })
        })
        // .then(res => res)
        .catch(err => console.log(err));
};

export const updateDBUserEmail = async (uid, email) => {
    await db
        .collection("users")
        .doc(uid)
        .update({ email })
        .then(res => res)
        .catch(err => console.log(err));
};

// user CRUD --read
export const getUsers = async () => {
    const users = [];
    await db
        .collection("users")
        .get()
        .then(Snapshot => {
            Snapshot.forEach(doc => {
                users.push({ uid: doc.id, ...doc.data() });
            });
        })
        .catch(error => {
            console.log("Error getting users:", error);
        });

    return users;
};

export const getUser = async uid => {
    const user = await db
        .collection("users")
        .doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document!");
                return null;
            }
        })
        .catch(error => {
            console.log("Error getting user:", error);
        });

    return user;
};

//
//  ---------- firebase auth ----------
// CRUD

const auth = firebase.auth();

export const getCredential = password => {
    return fb.auth.EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    );
};

export const reAuthenticate = async credential => {
    await auth.currentUser.reauthenticateWithCredential(credential);
};

export const updateAuthUserNameAndPhoto = async (displayName, photoURL) =>
    await auth.currentUser
        .updateProfile({
            ...(displayName && { displayName }),
            ...(photoURL && { photoURL })
        })
        // .then(res => res)
        .catch(err => console.log("update auth user profile error: ", err));

export const updateAuthUserEmail = async email =>
    await auth.currentUser
        .updateEmail(email)
        // .then(res => res)
        .catch(err => console.log("update auth user email error: ", err));

export const updateAuthUserPassword = async password => {
    await auth.currentUser
        .updatePassword(password)
        // .then(res => res)
        .catch(err => console.log("update auth user email error: ", err));
};

export const signOut = async () => await auth.signOut();
