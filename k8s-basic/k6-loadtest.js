// =====================================================================
// Workflow Description
// http.get() → ส่ง HTTP GET Request ไปยัง Web Server
// sleep(1) → หน่วง 1 วินาที ก่อนเริ่มรอบถัดไป
// stages → กำหนดจำนวน Virtual Users (VUs) ในแต่ละช่วงของการทดสอบ
// 10s : 0 → 200 VUs
// 60s : 200 → 400 VUs
// 30s : 400 → 200 VUs
// 10s : 200 → 0 VUs
// =====================================================================

import http from 'k6/http'
import { sleep } from 'k6'

// Test configuration
export let options = {
  stages: [
    // Ramp up from 0 → 200 Virtual Users (VUs) in 10 seconds
    { duration: '10s', target: 200 },

    // Continue increasing from 200 → 400 VUs over 60 seconds
    { duration: '60s', target: 400 },

    // Ramp down from 400 → 200 VUs over 30 seconds
    { duration: '30s', target: 200 },

    // Gradually stop all users (200 → 0) in 10 seconds
    { duration: '10s', target: 0 },
  ],
}

// This function is executed repeatedly by every Virtual User (VU)
export default function () {
  // Send an HTTP GET request to the target application
  http.get('http://localhost:39183/')

  // Wait 1 second before sending the next request
  // This simulates real user behavior and prevents continuous requests
  sleep(1)
}