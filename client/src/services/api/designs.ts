import axios from "axios";
import type { ChatMessage, CustomDesignRecord, SubmittedDesign } from "../../types";
import { CUSTOM_DESIGN_API_BASE } from "../../config";

const API_URL = CUSTOM_DESIGN_API_BASE;

export async function submitDesign(design: SubmittedDesign) {
  try {
    console.log("📤 Sending Design:", design);

    const response = await axios.post(API_URL, design, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("❌ API Error:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    throw error;
  }
}

export async function getStoredDesigns() {
  try {
    const response = await axios.get(API_URL);
    return response.data.data.designs;
  } catch (error: any) {
    console.error(error);
    return [];
  }
}

// Looks up a customer's own past custom-design requests by the email they
// used when submitting — powers the "My Custom Orders" page.
export async function getDesignsByEmail(email: string): Promise<CustomDesignRecord[]> {
  try {
    const response = await axios.get(API_URL, { params: { email, limit: 50 } });
    return response.data?.data?.designs ?? [];
  } catch (error: any) {
    console.error("❌ Failed to fetch designs by email:", error);
    throw error;
  }
}

export async function getDesignById(id: string): Promise<CustomDesignRecord> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data?.data;
}

export async function getMessages(id: string): Promise<ChatMessage[]> {
  const response = await axios.get(`${API_URL}/${id}/messages`);
  return response.data?.data ?? [];
}

export async function sendCustomerMessage(id: string, text: string): Promise<ChatMessage[]> {
  const response = await axios.post(`${API_URL}/${id}/messages`, { text });
  return response.data?.data ?? [];
}
