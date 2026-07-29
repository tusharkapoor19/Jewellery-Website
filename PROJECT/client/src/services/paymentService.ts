import axios from "axios";

const API =
    process.env.REACT_APP_PAYMENT_SERVICE_URL;

const getAuthHeaders = () => {

    const token =
        localStorage.getItem("token");

    return {

        Authorization: `Bearer ${token}`

    };

};

const paymentService = {

    createPayment: async (

        orderID: string

    ) => {

        const response =
            await axios.post(

                `${API}/create`,

                {

                    orderID

                },

                {

                    headers:

                        getAuthHeaders()

                }

            );

        return response.data;

    },

    verifyPayment: async (

        paymentData: {

            razorpay_order_id: string;

            razorpay_payment_id: string;

            razorpay_signature: string;

        }

    ) => {

        const response =
            await axios.post(

                `${API}/verify`,

                paymentData,

                {

                    headers:

                        getAuthHeaders()

                }

            );

        return response.data;

    },

    getPaymentByOrder: async (

        orderID: string

    ) => {

        const response =
            await axios.get(

                `${API}/order/${orderID}`,

                {

                    headers:

                        getAuthHeaders()

                }

            );

        return response.data;

    },

    getMyPayments: async () => {

        const response =
            await axios.get(

                `${API}/my/payments`,

                {

                    headers:

                        getAuthHeaders()

                }

            );

        return response.data;

    }

};

export default paymentService;