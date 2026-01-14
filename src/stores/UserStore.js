import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
	state: () => ({
		loading: false,
		error: null,
		registeredUser: null,
	}),

	actions: {
		async register(payload) {
			this.loading = true;
			this.error = null;
			this.registeredUser = null;

			try {
				const { data, status, statusText } = await axios.post(
					"https://boutique-hotel.helmuth-lammer.at/api/v1/register",
					{
						firstname: payload?.firstname,
						lastname: payload?.lastname,
						email: payload?.email,
						username: payload?.username,
						password: payload?.password,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				);

				if (status < 200 || status >= 300) {
					throw new Error(`Register failed: ${statusText}`);
				}

				this.registeredUser = data;
				return data;
			} catch (error) {
				this.error = error?.response?.data?.message || error?.message;
				throw error;
			} finally {
				this.loading = false;
			}
		},

		reset() {
			this.loading = false;
			this.error = null;
			this.registeredUser = null;
		},
	},
});