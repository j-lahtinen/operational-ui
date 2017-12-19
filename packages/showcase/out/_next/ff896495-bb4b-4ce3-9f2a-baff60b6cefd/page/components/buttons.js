
          window.__NEXT_REGISTER_PAGE('/components/buttons', function() {
            var comp = module.exports=webpackJsonp([42],{1555:function(e,t,n){e.exports=n(1556)},1556:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u),r=n(9),l=n(28),i=o(l),s=n(13),d=o(s),p=n(29),c=o(p),m=[{name:"color",description:"What color of button would you like? It can be a hex value or a named theme color.",defaultValue:"white",type:"string",optional:!0},{name:"onClick",description:"What happens when the button is clicked?",defaultValue:"",type:"func",optional:!0},{name:"active",description:"Active state.",defaultValue:"",type:"boolean",optional:!0},{name:"condensed",description:"Condensed option",defaultValue:"",type:"boolean",optional:!0},{name:"disabled",description:"Disabled option",defaultValue:"",type:"boolean",optional:!1}];t.default=function(e){return a.createElement(d.default,{pathname:e.url.pathname},a.createElement(r.Card,null,a.createElement("p",null,"Buttons are used heavily throughout an operational interface, and they often require a fair amount of customization. They exist independently or in groups, and can shrink to a condensed mode if space is short. These buttons can also take on any number of colors required."),a.createElement(r.Heading2Type,null,"Simple usage"),a.createElement("p",null,"Using buttons is as simple as including the component with a text node as a child. Colors may be specified as hex strings, or as a pre-defined color key from the theme."),a.createElement(c.default,{snippet:String('\n<div>\n  <Button color="info">Button One</Button>\n  <Button color="#393939">Button Two</Button>\n  <Button disabled>Button Three</Button>\n</div>\n'),components:{Button:r.Button,ButtonGroup:r.ButtonGroup}}),a.createElement(r.Heading2Type,null,"Button groups"),a.createElement("p",null,"If used within the button group component, the library takes care to remove intermediate spacings, border radii and makes sure borders don't double up."),a.createElement(c.default,{snippet:String("\n<ButtonGroup>\n  <Button>Group 1</Button>\n  <Button active>Group 2</Button>\n  <Button>Group 3</Button>\n</ButtonGroup>\n"),components:{Button:r.Button,ButtonGroup:r.ButtonGroup}}),a.createElement(r.Heading2Type,null,"Condensed mode"),a.createElement("p",null,"Buttons can be condensed, and further grouped to achieve, among other things, this paginator-style look:"),a.createElement(c.default,{snippet:String('\n<ButtonGroup>\n  <Button condensed>1</Button>\n  <Button condensed color="success">2</Button>\n  <Button condensed>3</Button>\n</ButtonGroup>\n'),components:{Button:r.Button,ButtonGroup:r.ButtonGroup}}),a.createElement(r.Heading2Type,null,"Props"),a.createElement(i.default,{props:m})))}}},[1555]);
            return { page: comp.default }
          })
        