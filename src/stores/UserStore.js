import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore("user", {
	state: () => ({
		loading: false,
		error: null,
		registeredUser: null,
		token: localStorage.getItem("authToken") || null,
		user: null,
	}),

	actions: {
		async fetchCurrentUser() {
			if (!this.token) {
				this.user = null;
				return null;
			}

			this.loading = true;
			this.error = null;
			try {
				const { data, status, statusText } = await axios.get(
					`${apiUrl}/user/`,
					{
						headers: {
							Authorization: `Bearer ${this.token}`,
							Accept: "application/json",
						},
					}
				);

				if (status < 200 || status >= 300) {
					throw new Error(`Fetch user failed: ${statusText}`);
				}

				this.user = data;
				return data;
			} catch (error) {
				this.error = error?.response?.data?.message || error?.message;
				// token may be invalid/expired; keep token but clear user
				this.user = null;
				throw error;
			} finally {
				this.loading = false;
			}
		},

		async login(payload) {
			this.loading = true;
			this.error = null;
			try {
				const { data, status, statusText } = await axios.post(
					`${apiUrl}/login`,
					{
						clientId: payload?.clientId,
						secret: payload?.secret,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				);

				if (status < 200 || status >= 300) {
					throw new Error(`Login failed: ${statusText}`);
				}

				const token = typeof data === "string" ? data : data?.token;
				this.token = token || null;
				if (this.token) localStorage.setItem("authToken", this.token);
				if (this.token) {
					try {
						await this.fetchCurrentUser();
					} catch {
						// ignore; error already stored
					}
				}
				return this.token;
			} catch (error) {
				this.error = error?.response?.data?.message || error?.message;
				throw error;
			} finally {
				this.loading = false;
			}
		},

		async register(payload) {
			this.loading = true;
			this.error = null;
			this.registeredUser = null;

			try {
				const { data, status, statusText } = await axios.post(
					`${apiUrl}/register`,
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

		logout() {
			this.token = null;
			this.user = null;
			localStorage.removeItem("authToken");
		},
	},
});