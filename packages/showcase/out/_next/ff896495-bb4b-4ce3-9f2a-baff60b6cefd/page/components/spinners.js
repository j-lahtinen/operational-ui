
          window.__NEXT_REGISTER_PAGE('/components/spinners', function() {
            var comp = module.exports=webpackJsonp([28],{1587:function(e,n,t){e.exports=t(1588)},1588:function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var s=t(1),a=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(s),i=t(9),l=t(13),o=r(l),u=t(28),p=r(u),c=t(29),d=r(c),m=[{name:"color",description:"Spinner of the color, as a hex value or a color palette code.",defaultValue:"info",type:"string",optional:!0},{name:"size",description:"Spinner size, either as a number (pixels), or a different unit as string.",defaultValue:"40",type:"number | string",optional:!0},{name:"spinDuration",description:"You can override the amount of time it takes for the spinner to take a full turn. While this is generally discouraged among spinners of the same size, small tweaks are sometimes aesthetically justified.",defaultValue:"2",type:"number",optional:!0}];n.default=function(e){return a.createElement(o.default,{pathname:e.url.pathname},a.createElement(i.Card,null,a.createElement("p",null,"Spinners are small siblings to the `Progress` component, used in places where progress comps would be either too large or when they're more aesthetically desirable."),a.createElement(i.Heading2Type,null,"Usage"),a.createElement(d.default,{snippet:String('\n(() => {\n  const styles = {\n    display: "inline-block",\n    margin: 20\n  }\n\n  return (\n    <div>\n      <Spinner css={styles} size={20} />\n      <Spinner css={styles} color="#FF0021" spinDuration={4} />\n      <Spinner css={styles} color="success" size={40} />\n    </div>\n  )\n})()\n'),components:{Spinner:i.Spinner}}),a.createElement(i.Heading2Type,null,"Props"),a.createElement(p.default,{props:m})))}}},[1587]);
            return { page: comp.default }
          })
        