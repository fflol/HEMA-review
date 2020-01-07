// mixins
const postsNum = 4;

// find featured products from db product
export const findFeatured = products =>
    products
        .sort((a, b) => a.ratingAverage < b.ratingAverage)
        .slice(0, postsNum);

// find recent reviewed products based on review.timeReviewed
export const findRecentReviewed = (products, reviews) => {
    if (products.length < 1) return;
    return (
        reviews
            // sort the reviews by time reviwed descending (timestamp)
            .sort((a, b) => {
                if (a.timeReviewed < b.timeReviewed) return 1;
                if (a.timeReviewed > b.timeReviewed) return -1;
                return 0;
            })
            // remove duplicates
            .filter(
                (review, index, self) =>
                    index ===
                    self.findIndex(
                        review2 => review.productID === review2.productID
                    )
            )
            .slice(0, products.length < postsNum ? products.length : postsNum)
            .map(review =>
                products.find(product => product.id === review.productID)
            )
    );
    // .filter(el => el);
};

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
