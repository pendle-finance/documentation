import React from 'react';

export default function BorosAdvance() {
  return (
    <svg width="90" height="75" viewBox="0 0 90 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes baStarBreathe {
          0%, 100% { transform: scale(1);   }
          30%      { transform: scale(1.2); }
          70%      { transform: scale(0.7); }
        }
        @keyframes baSpinCW  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes baSpinCCW { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        .ba-star        { transform-origin: 44.687px 37.5px; animation: baStarBreathe 5s ease-in-out infinite; }
        .ba-ellipse-cw  { transform-origin: 44.687px 37.5px; animation: baSpinCW      5s linear infinite; }
        .ba-ellipse-ccw { transform-origin: 44.687px 37.5px; animation: baSpinCCW     5s linear infinite; }
        .ba-ring-outer  { transform-origin: 44.687px 37.5px; animation: baSpinCCW     8s linear infinite; }
        .ba-ring-mid    { transform-origin: 44.687px 37.5px; animation: baSpinCW      6s linear infinite; }
        .ba-ring-inner  { transform-origin: 44.687px 37.5px; animation: baSpinCCW     4s linear infinite; }
      `}</style>
      <g className="ba-ellipse-cw">
        <path d="M64.9746 17.2098C65.9126 18.1478 66.3055 19.595 66.1547 21.4697C66.0041 23.3429 65.3124 25.6033 64.1342 28.1071C61.7786 33.1127 57.5037 39.0341 51.8634 44.6744C46.2232 50.3146 40.3023 54.5889 35.2968 56.9445C32.7931 58.1228 30.5325 58.8143 28.6594 58.965C26.7847 59.1158 25.3368 58.7236 24.3988 57.7856C23.4608 56.8475 23.0686 55.3997 23.2194 53.525C23.3701 51.6518 24.0616 49.3913 25.2399 46.8876C27.5954 41.8821 31.8698 35.9612 37.51 30.321C43.1503 24.6806 49.0717 20.4058 54.0773 18.0502C56.5811 16.8719 58.8415 16.1803 60.7147 16.0297C62.5894 15.8789 64.0365 16.2718 64.9746 17.2098Z" stroke="#6079FF" strokeWidth="0.56"/>
      </g>
      <g className="ba-ellipse-ccw">
        <path d="M64.9748 57.7861C64.0367 58.7241 62.5895 59.117 60.7149 58.9662C58.8417 58.8156 56.5813 58.124 54.0774 56.9457C49.0719 54.5901 43.1505 50.3153 37.5102 44.6749C31.87 39.0347 27.5956 33.1138 25.2401 28.1083C24.0618 25.6046 23.3703 23.3441 23.2196 21.4709C23.0688 19.5962 23.461 18.1484 24.399 17.2103C25.337 16.2723 26.7849 15.8801 28.6596 16.0309C30.5327 16.1816 32.7932 16.8731 35.297 18.0514C40.3025 20.407 46.2234 24.6813 51.8636 30.3215C57.5039 35.9618 61.7788 41.8832 64.1344 46.8888C65.3126 49.3926 66.0042 51.653 66.1549 53.5262C66.3056 55.4009 65.9128 56.8481 64.9748 57.7861Z" stroke="#6079FF" strokeWidth="0.56"/>
      </g>
      <g className="ba-ring-outer">
        <circle cx="44.687" cy="37.4994" r="31.3184" stroke="#6079FF" strokeWidth="0.56" strokeDasharray="1.6 1.6"/>
      </g>
      <g className="ba-ring-mid">
        <circle opacity="0.55" cx="44.6868" cy="37.388" r="23.9829" stroke="#6079FF" strokeWidth="0.4" strokeDasharray="1.6 0.8"/>
      </g>
      <g className="ba-ring-inner">
        <circle opacity="0.55" cx="44.6859" cy="37.3896" r="20.1349" stroke="#6079FF" strokeWidth="0.4" strokeDasharray="1.6 0.8"/>
      </g>
      <g className="ba-star">
        <path d="M64.1017 17.9723L51.4528 31.3395C48.242 34.7327 48.242 40.0432 51.4528 43.4364L64.1017 56.8036L50.7344 44.1547C47.3413 40.9439 42.0307 40.9439 38.6376 44.1547L25.2704 56.8036L37.9193 43.4364C41.13 40.0432 41.13 34.7326 37.9193 31.3395L25.2704 17.9723L38.6376 30.6212C42.0307 33.832 47.3413 33.8319 50.7345 30.6212L64.1017 17.9723Z" fill="#A2B1FF"/>
      </g>
    </svg>
  );
}
