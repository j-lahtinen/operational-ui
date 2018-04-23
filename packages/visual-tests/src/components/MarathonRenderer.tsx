import * as React from "react"
import glamorous, { Div, withTheme } from "glamorous"

import { Icon } from "@operational/components"
import { Theme, operational } from "@operational/theme"

const Container = glamorous.ul({
  padding: 0
})

const Content = glamorous.div(
  {
    padding: 20
  },
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.colors.background,
    borderRadius: 4
  })
)

const Item = glamorous.li({
  listStyle: "none",
  margin: 0,
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
    marginTop: 2,
    marginBottom: 2
  }
})

const Title = glamorous.p(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.heading1,
  display: "inline-block",
  "& :first-child": {
    position: "relative",
    top: -2,
    marginRight: 6
  },
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle"
  }
}))

const FailureMessage = glamorous.p(({ theme }: { theme: Theme }): any => ({
  color: theme.colors.error,
  display: "inline-block",
  marginLeft: 8,
  "&::before": {
    content: " → "
  }
}))

export interface Props {
  tests: { description: string; errors: string[] }[]
  completed: number
  ref: any
}

const MarathonRenderer: React.SFC<Props> = ({ tests, completed, ref }: Props) => (
  <Div>
    <Container>
      {tests.map((test: any, index: any) => {
        const failed = test.errors.length > 0
        const isCompleted = completed > index
        const content = isCompleted ? (
          failed ? (
            <Icon name="X" size={12} color={operational.colors.error} />
          ) : (
            <Icon name="Check" size={12} color={operational.colors.success} />
          )
        ) : (
          <Icon name="MoreHorizontal" size={12} />
        )
        return (
          <Item key={index}>
            <Title>
              {content}
              {test.description}
            </Title>
            {failed && <FailureMessage>{test.errors.concat(" ")}</FailureMessage>}
          </Item>
        )
      })}
    </Container>
    <Content innerRef={ref} />
  </Div>
)

export default MarathonRenderer
