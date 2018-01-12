
          window.__NEXT_REGISTER_PAGE('/components/breakdowns', function() {
            var comp = module.exports=webpackJsonp([40],{1608:function(e,n,t){e.exports=t(1609)},1609:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var o=t(1),l=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(o),r=t(5),i=t(9),u=a(i),s=t(16),d=a(s),p=t(17),c=a(p),f=[{name:"number",description:"A number by which the breakdown is represented.",defaultValue:"-",type:"number",optional:!1},{name:"label",description:"A statistic number label within the bar of the breakdown",defaultValue:"-",type:"string",optional:!1},{name:"fill",description:"The percentage to fill the bar. This is typically passed in from a container component that calculates percentages at large.",defaultValue:"-",type:"number",optional:!1},{name:"color",description:"A theme palette color name, or a hex code that the bar will be colored with.",defaultValue:"*info*",type:"string",optional:!0},{name:"icon",description:"An icon that is displayed on the breakdown",defaultValue:"-",type:"string",optional:!0},{name:"onMouseEnter/onMouseLeave",description:"Functions that are invoked when the mouse enters and/or leaves the breakdown. Useful for tooltips/infowindows",defaultValue:"-",type:"func",optional:!0}];n.default=function(e){return l.createElement(u.default,{pathname:e.url.pathname},l.createElement(r.Card,null,l.createElement("p",null,"Breakdowns are a means of representing aggregated data in a way that should be relatively easy to reason about. The breakdown component itself belongs within the context of a larger container component that calculates numbers and supplies them to said component."),l.createElement(r.Heading2Type,null,"Usage"),l.createElement(c.default,{snippet:'\n<div>\n  <Breakdown number={1} label="50 (20%)" fill={0.2}>\n    Stat 1\n  </Breakdown>\n  <Breakdown number={2} label="20 (40%)" fill={0.4}>\n    Stat 2\n  </Breakdown>\n  <Breakdown number={3} label="40 (80%)" fill={0.8}>\n    Stat 3\n  </Breakdown>\n</div>\n',components:{Breakdown:r.Breakdown}}),l.createElement(r.Heading2Type,null,"Props"),l.createElement(d.default,{props:f})))}}},[1608]);
            return { page: comp.default }
          })
        