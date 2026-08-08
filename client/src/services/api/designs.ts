import axios from "axios";
import type { SubmittedDesign } from "../../types";

const API_URL = "http://localhost:5006/custom-design-save";

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