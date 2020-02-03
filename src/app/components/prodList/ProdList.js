import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

import { useStyles } from "./styles";

//
// component
const ProdList = ({ products }) => {
    const classes = useStyles();
    return (
        <>
            <List>
                {products.map(prod => (
                    <div key={prod.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <></>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <>
                                        <Link
                                            href="/prod/[id]"
                                            as={`/prod/${prod.id}`}
                                        >
                                            <a>{prod.name}</a>
                                        </Link>
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            <Rating
                                                name="average-rating"
                                                precision={0.5}
                                                value={prod.ratingAverage}
                                                size="small"
                                                readOnly
                                            />
                                            <Typography
                                                variant="subtitle1"
                                                display="inline"
                                                color="textSecondary"
                                                className={classes.RatingText}
                                            >
                                                {prod.reviewsTotal} reviews
                                            </Typography>
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </>
    );
};

ProdList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            business: PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            }).isRequired,
            lastReview: PropTypes.shape({}).isRequired,
            name: PropTypes.string.isRequired,
            ratingAverage: PropTypes.number.isRequired,
            reviewsTotal: PropTypes.number.isRequired
        })
    ).isRequired
};

export default ProdList;
