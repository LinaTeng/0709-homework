import { ref } from "vue";
import axios from "axios";

export function Youbike() {
  const stations = ref([]);

  async function getStations() {
    const res = await axios.get(
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
    );
    console.log("STATION", res.data);
    stations.value = res.data;
  }

  return { 
    stations, 
    getStations 
  };
}
