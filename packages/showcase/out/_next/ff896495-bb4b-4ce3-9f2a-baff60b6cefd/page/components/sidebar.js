
          window.__NEXT_REGISTER_PAGE('/components/sidebar', function() {
            var comp = module.exports=webpackJsonp([29],{1585:function(e,t,n){e.exports=n(1586)},1586:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetch=void 0;var i=n(110),r=a(i),o=n(1),l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(o),s=n(9),d=n(29),c=a(d),u=n(13),m=a(u),p=n(28),f=a(p),b=t.fetch=function(e){return new r.default(function(t){return setTimeout(function(){return t(e)},2e3)})},h={sidebarItem:[{name:"label",description:"The label of the SidebarItem.",defaultValue:"",type:"string",optional:!1},{name:"open",description:"Is the item open or closed by default?",defaultValue:"false",type:"boolean",optional:!1},{name:"onClick",description:"A function to pass to the item that executes before the item expands. If a function returning a Promise is passed in, the item only expands after the Promise resolves.",defaultValue:l.createElement("pre",null,"() => this.open = !this.open"),type:"func",optional:!0}],sidebarLink:[{name:"to",description:"Created to work with react-router, this wraps the children in a <Link> to your route.",defaultValue:"",type:"string",optional:!0},{name:"onClick",description:"A function called on click of this component, to be used instead of the `to` prop to do more than just navigate.",defaultValue:"",type:"func",optional:!0},{name:"symbol",description:"A symbol to display at the right-hand side of the link, such as a `%` sign to suggest a unit of measure.",defaultValue:"",type:"string",optional:!0},{name:"color",description:"Different links can have different colors to communicate different use-cases or purposes. This can be a hex value, or a named color in your theme.",defaultValue:"The primary color of your theme.",type:"string",optional:!0}]};t.default=function(e){return l.createElement(m.default,{pathname:e.url.pathname},l.createElement(s.Card,null,l.createElement("p",null,"The sidebar is a dynamic list-style navigational element to be used in cases with a large number of list-style actionable items. This component involves composition of two constituent elements. Namely,"),l.createElement("ul",null,l.createElement("li",null,l.createElement("a",{href:"#sidebar-item"},"SidebarItem")),l.createElement("li",null,l.createElement("a",{href:"#sidebar-link"},"SidebarLink"))),l.createElement("div",{style:{marginBottom:32}}),l.createElement(s.Heading2Type,null,"Usage"),l.createElement(c.default,{snippet:String('\n<Sidebar>\n  <SidebarItem label="Links">\n    <SidebarLink onClick={() => window.open("https://www.contiamo.com")} symbol="&rarr;">\n      Link 1\n    </SidebarLink>\n    <SidebarLink>Link 2</SidebarLink>\n  </SidebarItem>\n  <SidebarItem label="Fetch data first" tooltip="Click for async fun!" onClick={() => fetch("SOME URL")}>\n    <SidebarLink color="#eee">This could have been</SidebarLink>\n    <SidebarLink color="#777" tooltip="Notice how the text is always readable. 😉">\n      fetched from an\n    </SidebarLink>\n    <SidebarLink>external resource.</SidebarLink>\n  </SidebarItem>\n</Sidebar>\n'),components:{Sidebar:s.Sidebar,SidebarItem:s.SidebarItem,SidebarLink:s.SidebarLink},scope:{fetch:b}}),l.createElement("div",{style:{marginBottom:32}}),l.createElement(s.CardHeader,{id:"sidebar-item"},"SidebarItem"),l.createElement(s.Heading2Type,null,"An expandable group of SidebarLinks, with added asynchronous functionality."),l.createElement(f.default,{props:h.sidebarItem}),l.createElement(s.CardHeader,{id:"sidebar-link"},"SidebarLink"),l.createElement("p",null,"A link, but with onClick instead of href."),l.createElement(f.default,{props:h.sidebarLink})))}}},[1585]);
            return { page: comp.default }
          })
        