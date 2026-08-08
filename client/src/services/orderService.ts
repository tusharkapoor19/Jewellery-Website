import axios from "axios";

const API = `${process.env.REACT_APP_ORDER_SERVICE_URL}/orders`;

console.log("==================================");
console.log("ORDER SERVICE INITIALIZED");
console.log("ORDER API URL:", API);
console.log("==================================");

if (!process.env.REACT_APP_ORDER_SERVICE_URL) {
    throw new Error(
        "REACT_APP_ORDER_SERVICE_URL is missing. Check your frontend .env and restart npm start."
    );
}

const getHeaders = () => {

    const token = localStorage.getItem("token");

    return {

        Authorization: `Bearer ${token}`

    };

};

const orderService = {

    createOrder: async (data: any) => {

        try {

            console.log("==================================");
            console.log("CREATE ORDER CALLED");
            console.log("URL:", `${API}/create`);
            console.log("Headers:", getHeaders());
            console.log("Payload:", data);
            console.log("==================================");

            const response = await axios.post(

                `${API}/create`,

                data,

                {

                    headers: getHeaders()

                }

            );

            console.log("ORDER RESPONSE SUCCESS");
            console.log(response.data);

            return response.data;

        }

        catch (error: any) {

            console.error("==================================");
            console.error("CREATE ORDER FAILED");
            console.error(error);

            if (error.response) {

                console.error("Status:", error.response.status);
                console.error("Response:", error.response.data);

            }

            if (error.request) {

                console.error("Request:", error.request);

            }

            console.error("Message:", error.message);
            console.error("==================================");

            throw error;

        }

    },

    getOrder: async (orderID: string) => {

        try {

            console.log("GET ORDER:", orderID);

            const response = await axios.get(

                `${API}/${orderID}`,

                {

                    headers: getHeaders()

                }

            );

            console.log("GET ORDER RESPONSE");
            console.log(response.data);

            return response.data;

        }

        catch (error: any) {

            console.error("GET ORDER FAILED");
            console.error(error);

            throw error;

        }

    },

    getMyOrders: async () => {

        try {

            const response = await axios.get(

                `${API}/myorders`,

                {

                    headers: getHeaders()

                }

            );

            console.log("MY ORDERS RESPONSE");
            console.log(response.data);

            return response.data;

        }

        catch (error: any) {

            console.error("GET MY ORDERS FAILED");
            console.error(error);

            throw error;

        }

    }

};

export default orderService;