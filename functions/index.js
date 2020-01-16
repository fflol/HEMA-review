// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

//
// ----func----
exports.updateLastReview = functions.firestore
    .document("/products/{prodID}/reviews/{review}") // watching on all reviews under prod
    .onWrite(async (change, context) => {
        let newTimeStamp = 0;
        if (change.after.exists) {
            //if not delete, then get the timestamp
            newTimeStamp = change.after.data().timeReviewed;
            return db.doc(`/products/${context.params.prodID}`).update({
                lastReview: newTimeStamp
            }); //set up new timestamp in the prod doc
        } else {
            // if delete, get last review's timestamp from db
            await db
                .doc(`/products/${context.params.prodID}`)
                .collection("reviews")
                .orderBy("timeReviewed", "desc")
                .limit(1)
                .get()
                .then(snapshot => {
                    snapshot.forEach(
                        doc => (newTimeStamp = doc.data().timeReviewed)
                    );
                    return db.doc(`/products/${context.params.prodID}`).update({
                        lastReview: newTimeStamp
                    }); //set up new timestamp in the prod doc
                })
                .catch(err => console.log(err));
        }
    });

//
// ----func----
exports.calculateRatingAverage = functions.firestore
    .document("/products/{prodID}/reviews/{review}")
    .onWrite(async (change, context) => {
        const dataBefore = change.before.data(); // to avoid undefined crush
        const dataAfter = change.after.data();
        if (
            // if reviews are created, deleted or rating is changed
            !dataBefore ||
            !dataAfter ||
            dataBefore.rating !== dataAfter.rating
        ) {
            // round num up function
            const roundNumUp = (num, increment) =>
                Math.ceil(num / increment) * increment;

            let ratingCollection = [];
            await db
                .doc(`/products/${context.params.prodID}`)
                .collection("reviews")
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        ratingCollection.push(doc.data().rating);
                    });
                    const ratingAverage = roundNumUp(
                        ratingCollection.reduce((a, b) => a + b) /
                            ratingCollection.length,
                        0.5
                    ); // get average value, then round up to 0.5
                    return db.doc(`/products/${context.params.prodID}`).update({
                        ratingAverage
                    });
                })
                .catch(err => console.log(err));
        }
    });

//
// ----func----
exports.calculateTotalReviews = functions.firestore
    .document("/products/{prodID}/reviews/{review}")
    .onWrite(async (change, context) => {
        const dataBefore = change.before.data(); // to avoid undefined crush
        const dataAfter = change.after.data();
        if (!dataBefore || !dataAfter) {
            // if reviews are created or deleted
            let reviews = [];
            await db
                .doc(`/products/${context.params.prodID}`)
                .collection("reviews")
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => reviews.push(doc.id));
                    return db.doc(`/products/${context.params.prodID}`).update({
                        reviewsTotal: reviews.length
                    });
                });
        }
    });

//
// ----func----
exports.calculateUserReviews = functions.firestore
    .document("/products/{prodID}/reviews/{review}")
    .onWrite(async (change, context) => {
        const dataBefore = change.before.data(); // to avoid undefined crush
        const dataAfter = change.after.data();
        if (!dataBefore || !dataAfter) {
            // if reviews are created or deleted
            const uid =
                (dataBefore && dataBefore.user.uid) || dataAfter.user.uid;
            const reviewsTotal = [];
            await db
                .collectionGroup("reviews")
                .where("user.uid", "==", `${uid}`)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => reviewsTotal.push(doc.data()));
                    return db.doc(`/users/${uid}`).update({
                        reviews: reviewsTotal.length
                    });
                });
        }
    });
