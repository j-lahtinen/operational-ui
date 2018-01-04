import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { extend, map, max, min } from "lodash/fp"
import { interpolateObject } from "d3-interpolate"
import { scaleSqrt as d3ScaleSqrt } from "d3-scale"
import { IObject } from "../typings"

function radiusValue(d: any): number {
  return d.data ? d.data.value : d.value
}

class Polar extends AbstractRenderer {
  // updateDraw(): void {
  //   super.updateDraw()
  //   // // need to ensure all transitions have finished.
  //   // this.el.transition()
  //   //   .duration(this.state.current.get("config").duration)
  //   //   .each("end", this.fitToCanvas.bind(this))
  // }

  onTransitionEnd(): void {
    this.fitToCanvas()
  }

  fitToCanvas(): void {
    // Reset current translation
    this.currentTranslation = [0, 0]
    this.el.attr("transform", this.translateString(this.currentTranslation))

    let current: any = (this.el.node() as any).getBoundingClientRect()
    let drawing: any = this.state.current.get("computed").canvas.drawingContainerDims
    if (current.width === 0 && current.height === 0) {
      return
    }
    let margin: number = this.state.current.get("config").outerBorderMargin

    let scale: number = Math.min(
      (drawing.width - 2 * margin) / current.width,
      (drawing.height - 2 * margin) / current.height
    )

    this.computeArcs(scale)
    this.el.selectAll("path").attr("d", this.computed.arc)

    current = (this.el.node() as any).getBoundingClientRect()

    const topOffset: number = this.state.current.get("computed").canvas.legends.top.left.node().offsetHeight
    this.currentTranslation = [
      (drawing.width - current.width) / 2 - current.left,
      (drawing.height - current.height) / 2 + topOffset - current.top
    ]

    this.el.attr("transform", this.translateString(this.currentTranslation))
  }

  computeOuter(width: number, height: number, scaleFactor: number): any {
    scaleFactor = scaleFactor ? scaleFactor : 1
    let domainMax: number = max(map((datum: IObject): number => this.value(datum))(this.data))
    let scale: any = d3ScaleSqrt()
      .range([
        this.state.current.get("config").minInnerRadius,
        Math.min(width, height) / 2 - this.state.current.get("config").outerBorderMargin
      ])
      .domain([0, domainMax])
    return (d: any): number => scale(radiusValue(d)) * scaleFactor
  }

  computeInner(outerRadius: (d: any) => number): any {
    let options: any = this.state.current.get("config")
    let minWidth: number = options.minPolarSegmentWidth
    let maxWidth: number = options.maxDonutWidth
    let minOuterRadius: number = min(map(outerRadius)(this.computed.data))
    // Space is not enough, don't render
    let width: number = minOuterRadius - options.minInnerRadius
    return width < minWidth ? 0 : minOuterRadius - Math.min(width, maxWidth)
  }

  hoverOuter(radius: any): any {
    return (d: any): number => radius(d) + 1
  }

  angleValue(d: any): number {
    return 1
  }

  // Establish coordinate system with 0,0 being the center of the width, height rectangle
  computeTranslate(): [number, number] {
    const drawingDims: IObject = this.state.current.get("computed").canvas.drawingContainerDims
    this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2]
    return this.currentTranslation
  }

  // Helpers
  totalForPercentages(): number {
    this.computeTotal()
    return this.total
  }

  centerDisplayString(): any[] {
    return this.computed.inner > 0 ? [this.computed.total] : []
  }

  minWidth(): number {
    return this.state.current.get("config").minDonutWidth
  }

  maxWidth(): number {
    return this.state.current.get("config").maxDonutWidth
  }

  totalYOffset(): string {
    return "0.35em"
  }

  // Interpolate the arcs in data space.
  arcTween(d: any, i: number): (t: number) => string {
    let old: any = this.previous.data || []
    let s0: number
    let e0: number
    if (old[i]) {
      s0 = old[i].startAngle
      e0 = old[i].endAngle
    } else if (!old[i] && old[i - 1]) {
      s0 = old[i - 1].endAngle
      e0 = old[i - 1].endAngle
    } else if (!old[i - 1] && old.length > 0) {
      s0 = old[old.length - 1].endAngle
      e0 = old[old.length - 1].endAngle
    } else {
      s0 = 0
      e0 = 0
    }

    let f: any = interpolateObject({ endAngle: e0, startAngle: s0 }, { endAngle: d.endAngle, startAngle: d.startAngle })
    return (t: number): string => this.computed.arc(extend(f(t))(d))
  }

  removeArcTween(d: any, i: number): (t: number) => string {
    let s0: number
    let e0: number
    s0 = e0 = this.angleRange()[1]
    // Value is needed to interpolate the radius as well as the angles.
    let f: any = interpolateObject(
      { endAngle: d.endAngle, startAngle: d.startAngle, value: d.value },
      { endAngle: e0, startAngle: s0, value: d.value }
    )
    return (t: number): string => this.computed.arc(f(t))
  }

  angleRange(): [number, number] {
    return [0, 2 * Math.PI]
  }
}

export default Polar
