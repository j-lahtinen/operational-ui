import * as d3 from "d3-selection"
import "d3-transition"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import { withD3Element, onTransitionEnd } from "../../utils/d3_utils"
import * as styles from "./styles"
import Events from "../../utils/event_catalog"
import { every, invoke, map } from "lodash/fp"
import { exitGroups, filterByMatchers, sizeScale } from "./renderer_utils"
import {
  IConfig,
  IEvents,
  IFocus,
  IFocusElement,
  IObject,
  IState,
  TD3Selection,
  TNode,
  TNodeSelection,
  TScale,
  TSeriesEl
} from "../typings"

const nodeLabelOptions: IObject = {
  top: {
    dy: "0",
    textAnchor: "middle",
    x: 0,
    y: -1
  },
  bottom: {
    dy: "1em",
    textAnchor: "middle",
    x: 0,
    y: 1
  },
  middle: {
    dy: "0.35em",
    textAnchor: "middle",
    x: 0,
    y: 0
  },
  left: {
    dy: "0.35em",
    textAnchor: "end",
    x: -1,
    y: 0
  },
  right: {
    dy: "0.35em",
    textAnchor: "start",
    x: 1,
    y: 0
  }
}

const nodeShapeOptions: IObject = {
  squareDiamond: {
    symbol: symbolSquare,
    rotation: 45
  },
  square: {
    symbol: symbolSquare,
    rotation: 0
  },
  diamond: {
    symbol: symbolDiamond,
    rotation: 0
  },
  circle: {
    symbol: symbolCircle,
    rotation: 0
  }
}

class Nodes {
  config: IConfig
  data: TNode[]
  el: TSeriesEl
  events: IEvents
  state: IState

  constructor(state: IState, events: IEvents, el: TSeriesEl) {
    this.state = state
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.removeHighlights.bind(this))
  }

  onMouseOver(d: TNode, element: HTMLElement): void {
    this.mouseOver(d3.select(element), d)
  }

  mouseOver(element: TNodeSelection, d: TNode, hideLabel: boolean = false): void {
    this.highlight(element, d)
    const focusPoint: IFocus = this.focusPoint(element, d)
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOVER, { focusPoint, d, hideLabel })
    element.on("mouseleave", this.onMouseOut.bind(this))
  }

  focusElement(focusElement: IFocusElement): void {
    this.el
      .selectAll(`path.node.${styles.border}`)
      .filter(filterByMatchers(focusElement.matchers))
      .each(
        withD3Element((d: TNode, el: HTMLElement): void => {
          this.mouseOver(d3.select(el), d, focusElement.hideLabel)
        })
      )
  }

  highlight(element: TNodeSelection, d: TNode, keepCurrent: boolean = false): void {
    if (!keepCurrent) {
      this.removeHighlights()
    }
    element.attr("stroke", this.config.highlightColor)
  }

  // Remove any old highlights (needed if an element has been manually focussed)
  removeHighlights(): void {
    this.el.selectAll(`path.node.${styles.border}`).attr("stroke", this.config.borderColor)
  }

  focusPoint(element: TNodeSelection, d: TNode): IFocus {
    if (d == null) return
    const offset: number = this.getNodeBoundingRect(element.node()).width / 2
    return {
      offset,
      type: "node",
      x: d.x,
      y: d.y,
      id: d.id()
    }
  }

  onMouseOut(): void {
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
  }

  draw(data: TNode[]): void {
    this.data = data
    this.config = this.state.current.get("config")
    const groups: TNodeSelection = this.el
      .select("g.nodes-group")
      .selectAll("g.node-group")
      .data(this.data, (node: TNode): string => node.id())

    exitGroups(groups)
    this.enterAndUpdate(groups)
  }

  borderScale(scale: TScale): TScale {
    return (size: number): number => {
      return Math.pow(Math.sqrt(scale(size)) + this.config.nodeBorderWidth, 2)
    }
  }

  translate(d: TNode): string {
    return `translate(${d.x},${d.y})`
  }

  rotate(d: TNode): string {
    return `rotate(${nodeShapeOptions[d.shape()].rotation})`
  }

  enterAndUpdate(groups: TNodeSelection): void {
    const scale: TScale = sizeScale([this.config.minNodeSize, this.config.maxNodeSize], this.data),
      borderScale: TScale = this.borderScale(scale)

    const enteringGroups: TD3Selection = groups
      .enter()
      .append("g")
      .attr("class", "node-group")
      .attr("transform", this.translate)

    enteringGroups
      .append("path")
      .attr("class", `node ${styles.border}`)
      .attr("d", (d: TNode): string =>
        d3Symbol()
          .type(nodeShapeOptions[d.shape()].symbol)
          .size(borderScale(d.size()))()
      )
      .attr("transform", this.rotate)
      .attr("fill", this.config.borderColor)
      // @TODO delegate to a single event listener at the SVG root and locate the node in question by an attribute.
      // Single event handlers should be attached to a non-svg node.
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))

    enteringGroups
      .append("path")
      .attr("class", `node ${styles.element}`)
      .attr("d", (d: TNode): string =>
        d3Symbol()
          .type(nodeShapeOptions[d.shape()].symbol)
          .size(scale(d.size()))()
      )
      .attr("transform", this.rotate)
      .attr("fill", (d: TNode): string => d.color())
      .attr("stroke", (d: TNode): string => d.stroke())
      .attr("opacity", 0)

    enteringGroups.append("text").attr("class", styles.label)

    groups
      .merge(enteringGroups)
      .transition()
      .duration(this.config.duration)
      .attr("transform", this.translate)

    groups
      .merge(enteringGroups)
      .selectAll(`path.node.${styles.border}`)
      .transition()
      .duration(this.config.duration)
      // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
      // but doesn't break the viz.
      .attr("d", (d: TNode): string =>
        d3Symbol()
          .type(nodeShapeOptions[d.shape()].symbol)
          .size(borderScale(d.size()))()
      )
      .attr("transform", this.rotate)

    groups
      .merge(enteringGroups)
      .selectAll(`path.node.${styles.element}`)
      .transition()
      .duration(this.config.duration)
      // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
      // but doesn't break the viz.
      .attr("d", (d: TNode): string =>
        d3Symbol()
          .type(nodeShapeOptions[d.shape()].symbol)
          .size(scale(d.size()))()
      )
      .attr("transform", this.rotate)
      .attr("fill", (d: TNode): string => d.color())
      .attr("stroke", (d: TNode): string => d.stroke())
      .attr("opacity", 1)
      .call(onTransitionEnd, this.updateNodeLabels.bind(this))
  }

  getNodeBoundingRect(el: HTMLElement): SVGRect {
    const node: any = d3
      .select(el.parentNode as any)
      .select(`path.node.${styles.element}`)
      .node()
    return node.getBoundingClientRect()
  }

  getLabelPosition(d: TNode): string {
    return d.labelPosition() === "auto" ? this.getAutomaticLabelPosition(d) : d.labelPosition()
  }

  getAutomaticLabelPosition(d: TNode): string {
    const columnSpacing: number = this.state.current.get("computed").series.horizontalNodeSpacing
    return (d.x / columnSpacing) % 2 === 1 ? "top" : "bottom"
  }

  getNodeLabelX(d: TNode, el: HTMLElement): number {
    const offset: number =
      this.getNodeBoundingRect(el).width / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[this.getLabelPosition(d)].x * offset
  }

  getNodeLabelY(d: TNode, el: HTMLElement): number {
    const offset: number =
      this.getNodeBoundingRect(el).height / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[this.getLabelPosition(d)].y * offset
  }

  getLabelText(d: TNode): string {
    // Pixel width of character approx 1/2 of font-size - allow 7px per character
    const desiredPixelWidth: number = this.state.current.get("computed").series.horizontalNodeSpacing,
      numberOfCharacters: number = desiredPixelWidth / 7
    return d.label().substring(0, numberOfCharacters) + (d.label().length > numberOfCharacters ? "..." : "")
  }

  updateNodeLabels(): void {
    const labels: TNodeSelection = this.el
      .select("g.nodes-group")
      .selectAll(`text.${styles.label}`)
      .data(this.data, (node: TNode): string => node.id())

    labels
      .enter()
      .merge(labels)
      .text(d => this.getLabelText(d))
      .attr("x", withD3Element(this.getNodeLabelX.bind(this)))
      .attr("y", withD3Element(this.getNodeLabelY.bind(this)))
      .attr("dy", (d: TNode): number => nodeLabelOptions[this.getLabelPosition(d)].dy)
      .attr("text-anchor", (d: TNode): string => nodeLabelOptions[this.getLabelPosition(d)].textAnchor)
  }
}

export default Nodes
