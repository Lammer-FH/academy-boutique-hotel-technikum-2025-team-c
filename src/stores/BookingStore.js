import { defineStore } from "pinia";
import axios from "axios";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    currentBooking: null,
    bookings: [],
    loading: false,
    error: null,
    // Live customer details draft (from BookingForm)
    customerDraft: {
      firstname: "",
      lastname: "",
      email: "",
      birthdate: "",
    },
    // Booking flow step: 'form' | 'check' | 'confirmation'
    bookingStep: "form",
  }),

  actions: {
    async fetchBookings() {
      this.loading = true;
      this.error = null;
      try {
        const { data, status, statusText } = await axios.get(
          `https://boutique-hotel.helmuth-lammer.at/api/v1/bookings`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (status < 200 || status >= 300) {
          throw new Error(`Fetch bookings failed: ${statusText}`);
        }
        // Expecting data to be an array of bookings
        this.bookings = Array.isArray(data) ? data : [];
        return this.bookings;
      } catch (error) {
        this.error = error?.response?.data?.message || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async bookRoom(roomId, fromDate, toDate, formData) {
      this.loading = true;
      this.error = null;

      try {
        const { data, status, statusText } = await axios.post(
          `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${roomId}/from/${fromDate}/to/${toDate}`,
          {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            birthdate: formData.birthdate,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (status < 200 || status >= 300) {
          throw new Error(`Booking failed: ${statusText}`);
        }
        this.currentBooking = data;
        this.bookings.push(data);

        return data;
      } catch (error) {
        this.error = error?.response?.data?.message || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearCurrentBooking() {
      this.currentBooking = null;
      this.error = null;
    },

    // Update the customer details draft from the form
    setCustomerDraft(draft) {
      this.customerDraft = {
        firstname: draft?.firstname || "",
        lastname: draft?.lastname || "",
        email: draft?.email || "",
        birthdate: draft?.birthdate || "",
      };
    },

    // Control the booking flow step
    setBookingStep(step) {
      this.bookingStep = step;
    },

    // Reset the flow to the beginning
    resetBookingFlow() {
      this.bookingStep = "form";
      this.currentBooking = null;
      this.error = null;
      this.customerDraft = {
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
      };
    },
  },
});
