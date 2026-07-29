export interface RazorpayOrder {

    id: string;

    amount: number;

    currency: string;

}

export interface CreatePaymentResponse {

    success: boolean;

    payment: any;

    razorpayOrder: RazorpayOrder;

}