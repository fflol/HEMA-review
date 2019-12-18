// find featured products from db product
export const findFeatured = products =>
    products.sort((a, b) => a.starsAverage < b.starsAverage).slice(0, 4);

export const findRecentReviewed = (products, reviews) =>
    reviews
        .sort((a, b) => a.timeReviewed > b.timeReviewed)
        .slice(0, 4)
        .map(review =>
            products.find(product => product.id === review.productID)
        );

export const search = (products, input) => {
    return products.filter(product =>
        product.name.toLowerCase().includes(input.toLowerCase())
    );
};
