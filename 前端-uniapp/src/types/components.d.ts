// src/types/components.d.ts
import HuJiuswiper from '../components/HuJiuswiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    HuJiuswiper: typeof HuJiuswiper
  }
}