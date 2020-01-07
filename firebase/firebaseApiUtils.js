import { firebase } from "./firebaseConfig";

const db = firebase.firestore();

//
//CRUD -- C UD
export const addReview = async (productID, newReview) =>
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .add(newReview)
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
        .doc(reviewID)
        .set(updatedReview)
        .catch(err => console.log(err));

//
// CRUD -- Read

export const getProducts = async () => {
    let products = [];

    // get products
    await db
        .collection("products")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                products.push({ id: doc.id, ...doc.data() });
            });
        })
        .catch(error => {
            console.log("Error getting products:", error);
        });

    // simplify business reference from products
    const simplifiedProducts = await Promise.all(
        products.map(async prod => {
            const business = await prod.business
                .get()
                .then(snapshot => snapshot.data())
                .catch(error => {
                    console.log("Error getting products:", error);
                });
            return { ...prod, business };
        })
    );
    return simplifiedProducts;
};

export const getProd = async id => {
    const prod = await db
        .collection("products")
        .doc(id)
        .get()
        .then(doc => {
            if (doc.exists) return doc.data();
            else {
                console.log("No such document!");
                return null;
            }
        })
        .catch(error => {
            console.log("Error getting document:", error);
        });

    const simplifiedProd = await prod.business.get().then(snapshot => {
        return { ...prod, business: snapshot.data(), id };
    });

    return simplifiedProd;
};

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
                reviews.push({ id: doc.id, ...doc.data() });
            });
        })
        .catch(error => {
            console.log("Error getting documents: ", error);
        });

    const simplifiedReviews = await Promise.all(
        reviews.map(async review => {
            const user = await review.user
                .get()
                .then(snapshot => snapshot.data());
            return { ...review, user };
        })
    );

    return simplifiedReviews;
};
