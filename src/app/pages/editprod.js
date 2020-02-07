import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { userContext } from "../tools/reactContext";
import * as apiUtils from "../firebase/firebaseApiUtils";
import * as dbFormat from "../tools/formats/dbFormat";
import * as dbOptions from "../tools/formats/dbformatOptions";

//
// component
const EditProd = () => {
    const [name, setName] = useState("");
    const [business, setBusiness] = useState("");
    const [currency, setCurrency] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [productID, setProductID] = useState("");

    const userLogged = useContext(userContext);
    const router = useRouter();

    useEffect(() => {
        if (userLogged.email && userLogged.email !== "kaylee1000@gmail.com") {
            console.log("u r not me :)");
            router.push("/");
        }
    }, [userLogged]);

    // CRUD
    const update = async e => {
        e.preventDefault();
        const updatedProd = dbFormat.updateProd(description);
        await apiUtils
            .setProd(productID, updatedProd)
            .then(() => console.log("succeed"))
            .catch(err => console.log(err));
    };

    // handlers
    const handleNameChange = e => setName(e.target.value);
    const handleBusinessChange = e => setBusiness(e.target.value);
    const handleCurrencyChange = e => setCurrency(e.target.value);
    const handlePriceChange = e => setPrice(e.target.value);
    const handleDescriptionChange = e => setDescription(e.target.value);
    const handleProdIDChange = e => setProductID(e.target.value);

    return (
        <>
            <form>
                <h1>new</h1>
                <div>
                    <label htmlFor="name">name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="business">pick a business</label>
                    <select
                        name="business"
                        id="business"
                        value={business}
                        onChange={handleBusinessChange}
                    >
                        {dbOptions.businessesOptions.map(business => (
                            <option value={business.id} key={business.id}>
                                {business.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="currency">pick a currency</label>
                    <select
                        name="currency"
                        id="currency"
                        value={currency}
                        onChange={handleCurrencyChange}
                    >
                        {dbOptions.currencies.map(currency => (
                            <option value={currency} key={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <textarea
                    rows="10"
                    cols="80"
                    value={description}
                    onChange={handleDescriptionChange}
                ></textarea>
                <button type="submit">submit create</button>
            </form>
            <form onSubmit={update}>
                <h1>existing</h1>
                <label htmlFor="prodID">enter prod id</label>
                <input
                    type="text"
                    id="prodID"
                    value={productID}
                    onChange={handleProdIDChange}
                />
                <div>
                    <label htmlFor="business">pick a business</label>
                    <select
                        name="business"
                        id="business"
                        value={business}
                        onChange={handleBusinessChange}
                    >
                        {dbOptions.businessesOptions.map(business => (
                            <option value={business.id} key={business.id}>
                                {business.name}
                            </option>
                        ))}
                    </select>
                    <textarea
                        rows="10"
                        cols="80"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <button type="submit">submit edit</button>
            </form>
        </>
    );
};

export default EditProd;
