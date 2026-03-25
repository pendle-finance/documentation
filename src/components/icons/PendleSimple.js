import React from 'react';

export default function PendleSimple() {
  return (
    <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes psMoveEllipse {
          0%   { transform: translate(0, 0); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          25%  { transform: translate(22px, 24.5px); }
          75%  { transform: translate(22px, 24.5px); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          100% { transform: translate(0, 0); }
        }
        @keyframes psMoveCircle {
          0%   { transform: translate(0, 0); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          25%  { transform: translate(-22px, -24.5px); }
          75%  { transform: translate(-22px, -24.5px); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          100% { transform: translate(0, 0); }
        }
        @keyframes psMoveTriangle {
          0%   { transform: translate(0, 0); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          25%  { transform: translate(-22px, 21.7px); }
          75%  { transform: translate(-22px, 21.7px); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          100% { transform: translate(0, 0); }
        }
        @keyframes psMoveRect {
          0%   { transform: translate(0, 0); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          25%  { transform: translate(22px, -21.7px); }
          75%  { transform: translate(22px, -21.7px); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          100% { transform: translate(0, 0); }
        }
        @keyframes psSpinShape {
          0%   { transform: rotate(0deg); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          25%  { transform: rotate(180deg); }
          75%  { transform: rotate(180deg); animation-timing-function: cubic-bezier(0.4,0,0.2,1); }
          100% { transform: rotate(0deg); }
        }
        .ps-e { animation: psMoveEllipse  5s linear infinite; }
        .ps-c { animation: psMoveCircle   5s linear infinite; }
        .ps-t { animation: psMoveTriangle 5s linear infinite; }
        .ps-r { animation: psMoveRect     5s linear infinite; }
        .ps-spin {
          transform-box: fill-box;
          transform-origin: center;
          animation: psSpinShape 5s linear infinite;
        }
      `}</style>
      <g className="ps-c">
        <circle cx="53.8621" cy="49.2406" r="11.3691" stroke="#7AB7FF" strokeWidth="1.2"/>
      </g>
      <g className="ps-e">
        <ellipse cx="31.6781" cy="24.7465" rx="12.5258" ry="12.5258" fill="#1BE3C2"/>
      </g>
      <g className="ps-r">
        <g className="ps-spin">
          <rect x="16.0735" y="42.917" width="22.8464" height="22.8464" transform="rotate(-30 16.0735 42.917)" fill="#7AB7FF" fillOpacity="0.1" stroke="#EBEFF5" strokeWidth="0.4"/>
        </g>
      </g>
      <g className="ps-t">
        <g className="ps-spin">
          <path d="M57.3888 17.9326L62.6716 32.7723L52.1134 27.7043L52.1118 27.7028L42.5492 23.2154L57.3888 17.9326Z" fill="#7AB7FF" fillOpacity="0.1" stroke="#EBEFF5" strokeWidth="0.5"/>
        </g>
      </g>
    </svg>
  );
}
