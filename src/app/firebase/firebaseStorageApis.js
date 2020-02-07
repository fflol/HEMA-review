import { firebase } from "./firebaseConfig";
import "firebase/storage";

const storage = firebase.storage();

export const getSingleUrl = async () => {
    console.log(storage);
    return await storage
        .ref("products/2Ryiso3MhJt3fVSKyUFn/img1.jpg")
        .getDownloadURL()
        .then(url => console.log(url));
};

// get img urls for a single prod
const getStorageUrlsForProd = async prodID => {
    let refs = [];
    let urls = [];
    await storage
        .ref(`products/${prodID}`)
        .listAll()
        .then(res => {
            res.items.forEach(itemRef => refs.push(itemRef));
        })
        .catch(err => console.log(err));

    await Promise.all(
        refs.map(async ref => {
            await ref.getDownloadURL().then(url => urls.push(url));
        })
    );

    return urls;
};

//
// receive fetched products, if server-side do nothing,
// if client - side, traverse through them, add photo urls to them
export const addPhotoUrlToProd = async prod => {
    if (typeof window !== "undefined") {
        return {
            ...prod,
            photoUrl: await getStorageUrlsForProd(prod.id)
        };
    }
    return prod;
};

//
// receive fetched products, if server-side do nothing,
// if client - side, traverse through them, add photo urls to them
export const addPhotoUrlToProducts = async products => {
    if (typeof window !== "undefined") {
        return await Promise.all(
            products.map(async prod => ({
                ...prod,
                photoUrl: await getStorageUrlsForProd(prod.id)
            }))
        );
    }
    return products;
};
