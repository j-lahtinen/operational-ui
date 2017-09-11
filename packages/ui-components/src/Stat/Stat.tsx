import * as React from "react"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type Props = {
  className?: string
  label?: string
  children: React.ReactNode
  theme?: Theme
  color?: string
}

const Stat: React.SFC<Props> = ({ className, label, children }: Props) =>
    <div className={`${className} Stat`}>
      <small className="Stat__label">
        {label}
      </small>
      <span className="Stat__value">
        {children}
      </span>
    </div>,
  style: {} = ({ theme, color }: Props) => {
    const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"

    return {
      backgroundColor,
      display: "flex",
      flexDirection: "column",
      width: "fit-content",
      padding: theme.spacing >= 0 ? theme.spacing && theme.spacing / 2 : 8,
      color: readableTextColor(backgroundColor)(["black", "white"]),

      "&.Stat + .Stat": {
        borderLeft: "1px solid",
        borderLeftColor: darken(backgroundColor)(10),
      },

      "& .Stat__label": {
        marginBottom: 3,
        fontSize: ".8rem",
        fontWeight: 600,
        color: readableTextColor(backgroundColor)([
          theme.greys ? theme.greys["60"] : "#eee",
          theme.greys ? theme.greys["10"] : "#aaa",
        ]),
      },
    }
  }

export default glamorous(Stat)(style)
export { Stat }
