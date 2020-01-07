// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.updateLastReview = functions.firestore
    .document("/products/{prodID}/reviews/{review}") // watching on all reviews under prod
    .onWrite((change, context) => {
        let newTimeStamp = 0;
        if (change.after.exists)
            //if not delete, then get the timestamp
            newTimeStamp = change.after.data().timeReviewed;
        else {
            // if delete, get last review's timestamp from db
            db.doc(`/products/${context.params.prodID}`)
                .collection("reviews")
                .orderBy("timeReviewed", "desc")
                .limit(1)
                .get()
                .then(snapshot =>
                    snapshot.forEach(
                        doc => (newTimeStamp = doc.data().timeReviewed)
                    )
                );
        }

        return db.doc(`/products/${context.params.prodID}`).update({
            lastReview: newTimeStamp
        }); //set up new timestamp in the prod doc
    });
