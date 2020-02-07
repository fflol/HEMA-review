import React from "react";
import Link from "next/link";
// import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

import { RatingAndReviews } from "../../components/utilComponents";
import * as propTypeFormat from "../../tools/formats/propTypeFormat";
import { useStyles } from "./styles";
import ImgLoading from "../imgLoading/ImgLoading";
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
                                <ImgLoading
                                    src={prod.photoUrl && prod.photoUrl[0]}
                                    alt={`${prod.name} photo`}
                                    className={classes.img}
                                    component="img"
                                />
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
                                        <RatingAndReviews
                                            ratingValue={prod.ratingAverage}
                                            reviewsValue={prod.reviewsTotal}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            color="textSecondary"
                                            className={classes.price}
                                        >
                                            $
                                            {` ${prod.price &&
                                                prod.price.usDollar}`}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        className={classes.description}
                                    >
                                        {prod.description}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </div>
                ))}
            </List>
        </>
    );
};

ProdList.propTypes = {
    products: propTypeFormat.productsWithPhotoType
};

export default ProdList;
