// mixins
const postsNum = 6;

// find the highest rated from db product
export const findHighRated = products =>
    products
        .sort((a, b) => {
            if (a.ratingAverage < b.ratingAverage) return 1;
            if (a.ratingAverage > b.ratingAverage) return -1;
            if (a.ratingAverage === b.ratingAverage) {
                if (a.lastReview.seconds < b.lastReview.seconds) return 1;
                if (a.lastReview.seconds > b.lastReview.seconds) return -1;
            }
            return 0;
        })
        .slice(0, postsNum);

// find recent reviewed products
export const findRecentReviewed = products =>
    products
        // sort the products by lastReview descending (timestamp)
        .sort((a, b) => {
            if (a.lastReview.seconds < b.lastReview.seconds) return 1;
            if (a.lastReview.seconds > b.lastReview.seconds) return -1;
            return 0;
        })
        .slice(0, postsNum);

// find reviews for a particular product
export const findReviewsForThisProd = (reviewsTotal, productID) =>
    reviewsTotal
        .filter(review => review.productID === productID)
        .sort((a, b) => {
            if (a.timeReviewed < b.timeReviewed) return 1;
            if (a.timeReviewed > b.timeReviewed) return -1;
            return 0;
        });

// search func
export const search = (products, input) => {
    return products.filter(product =>
        product.name.toLowerCase().includes(input.toLowerCase())
    );
};

// ally props for Material UI tab component
export const a11yProps = index => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
});
