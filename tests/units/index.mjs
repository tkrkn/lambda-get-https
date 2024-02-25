import dotenv from 'dotenv';
import { handler } from "../../scripts/index.mjs";

dotenv.config({
    path: './tests/.env'
});

const event = {
    "key1": "value1",
    "key2": "value2",
    "key3": "value3"
};
console.debug("EVENT : " + typeof event, event);

try {
    const result = handler(event);

    result
        .then((value) => console.log(value))
        .catch((reason) => console.error(reason))
        ;
} catch (error) {
    console.error(error);
}