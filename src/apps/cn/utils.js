
import { ref } from 'vue';

export function useReloadData() {
    const reloadVideosKey = ref(new Date().getSeconds());
    return {
      reloadVideosKey,
    };
  }

export function useReloadMethods(reloadVideosKey) {
  const reloadVideos = () => {
    reloadVideosKey.value =
      new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
  };
  
  return {
    reloadVideos,
  };
}