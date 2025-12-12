import axios from "axios";
import { defineStore } from "pinia";

const apiUrl = import.meta.env.VITE_API_URL;

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: [],
    availableRooms: [],
    isLoadingAvailability: false,
    selectedRoom: null,
    selectedFromDate: null,
    selectedToDate: null,
  }),
  actions: {
    fetchRooms() {
      axios
        .get(`${apiUrl}/rooms`)
        .then((response) => {
          this.rooms = response.data;
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });
    },
    async fetchAvailableRooms(from, to) {
      this.isLoadingAvailability = true;

      try {
        const availabilityPromises = this.rooms.map(async (room) => {
          const response = await axios.get(
            `${apiUrl}/room/${room.id}/from/${from}/to/${to}`
          );
          return {
            roomId: room.id,
            available: response.data.available,
          };
        });

        const results = await Promise.all(availabilityPromises);

        const availableRoomIds = results
          .filter((result) => result.available === true)
          .map((result) => result.roomId);

        this.availableRooms = this.rooms.filter((room) =>
          availableRoomIds.includes(room.id)
        );
      } catch (error) {
        console.error("Error fetching available rooms:", error);
        this.availableRooms = [];
      } finally {
        this.isLoadingAvailability = false;
      }
    },
    setSelectedRoom(room) {
      this.selectedRoom = room;
    },
    setSelectedDates(from, to) {
      this.selectedFromDate = from;
      this.selectedToDate = to;
    },
  },
});
