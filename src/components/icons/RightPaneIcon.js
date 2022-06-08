import SVG from "./SVG";
const colour = "#000";
function RightPaneIcon(props) {
  return (
    <SVG
      {...props}
      viewBox="0 0 144 98"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      xmlnsSerif="http://www.serif.com/"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
    >
      <g transform="matrix(1.13533,0,0,1.16156,-10.1998,-29.4537)">
        <rect
          x="10.405"
          y="26.86"
          width="123.937"
          height="80.647"
          style={{ fill: "none", stroke: colour, strokeWidth: 3.05 }}
        />
      </g>
      <g transform="matrix(1.13533,0,0,1.16156,56.2468,-24.8951)">
        <rect x="13.875" y="26.744" width="58.125" height="72.997" />
      </g>
    </SVG>
  );
}

export default RightPaneIcon;
