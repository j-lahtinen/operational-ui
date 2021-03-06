import * as React from "react"
import ActionMenu, { ActionMenuProps } from "../ActionMenu/ActionMenu"
import Icon, { IconName } from "../Icon/Icon"
import { DefaultProps } from "../types"
import Small from "../Typography/Small"
import styled from "../utils/styled"

export interface TableProps<T> extends DefaultProps {
  data: T[]
  /** Table columns headings */
  columns: Array<Column<T> | Extract<keyof T, string>>
  /** Called on row click */
  onRowClick?: (dataEntry: T, index: number) => void
  /** Label to show on row hover */
  rowActionName?: string
  /**
   * Add actions on the end of each row
   */
  rowActions?: (dataEntry: T) => ActionMenuProps["items"] | React.ReactNode
  /** Icon name for row */
  icon?: (dataEntry: T) => IconName
  /** Icon color for row */
  iconColor?: (dataEntry: T) => string
  /** Remove the header? */
  headless?: boolean
}

export interface Column<T> {
  heading: React.ReactNode
  cell: (dataEntry: T, index: number) => React.ReactNode
  sortOrder?: "asc" | "desc"
  onSortClick?: (order: "asc" | "desc") => void
}

const Container = styled("table")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.color.white,
  textAlign: "left",
  borderCollapse: "collapse",
  fontSize: theme.font.size.small,
  fontFamily: theme.font.family.main,
}))

const Tr = styled("tr")<{ hover?: boolean; clickable?: boolean }>(({ hover, theme, clickable }) => ({
  height: 50,
  ...(hover
    ? {
        ":hover": {
          backgroundColor: theme.color.background.lighter,
          cursor: clickable ? "pointer" : "default",
        },
      }
    : {}),
}))

const Thead = styled("thead")`
  tr {
    height: initial;
  }
`

const Th = styled("th")<{ sortable?: boolean }>(({ theme, sortable }) => ({
  position: "relative",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.lightest,
  paddingBottom: theme.space.base,
  "&:first-child": {
    paddingLeft: theme.space.small,
  },
  ...(sortable
    ? {
        ":hover": {
          cursor: "pointer",
          color: theme.color.text.light,
          svg: {
            cursor: "pointer",
            fill: theme.color.text.light,
          },
        },
      }
    : {}),
}))

const ThContent = styled("span")<{ sorted?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: ${props => props.theme.space.medium}px;
  ${props => props.sorted && `color: ${props.theme.color.text.light};`};
`

const Td = styled("td")(({ theme }) => ({
  verticalAlign: "middle",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.default,
  "&:first-child": {
    paddingLeft: theme.space.small,
  },
}))

const Actions = styled(Td)(({ theme }) => ({
  textAlign: "right",
  paddingRight: theme.space.small,

  /**
   * We use opacity here instead of display: none; or
   * visibility: hidden; because both mess with
   * the box model of the Td while opacity does not.
   */
  opacity: 0,
  "tr:hover &, :hover": {
    opacity: 1,
  },

  "& > div": {
    display: "inline-flex",
  },
}))

const SortIcon = styled(Icon)`
  margin-left: ${props => props.theme.space.small}px;
`

const SortableIcon = styled("div")`
  display: inline-grid;
  grid-template-rows: 6px;
`

const IconCell = styled(Td)`
  width: 40px;
  padding: ${props => props.theme.space.base}px;
  color: ${props => props.theme.color.text.lightest};
`

const ActionLabel = styled(Small)`
  color: ${props => props.theme.color.primary};
  margin: 0;
  display: block;
`

const EmptyView = styled(Td)(({ theme }) => ({
  color: theme.color.text.default,
  height: 50,
  lineHeight: "50px",
  textAlign: "center",
}))

function Table<T>({
  data = [],
  columns,
  onRowClick,
  rowActionName,
  rowActions,
  icon,
  iconColor,
  headless,
  ...props
}: TableProps<T>) {
  const standardizedColumns: Array<Column<T>> = columns.map(column => {
    if (typeof column === "string") {
      return {
        heading: column,
        cell: (dataEntry: T) => dataEntry[column],
      }
    } else {
      return column
    }
  })

  const hasIcons: boolean = Boolean(data[0]) && Boolean(icon) && Boolean(icon!(data[0]))

  return (
    <Container {...props}>
      {!headless && (
        <Thead>
          <Tr>
            {hasIcons && <Th key="-1" />}
            {standardizedColumns.map((column, columnIndex) => (
              <Th
                key={columnIndex}
                sortable={Boolean(column.onSortClick)}
                onClick={() => column.onSortClick && column.onSortClick(column.sortOrder === "desc" ? "asc" : "desc")}
              >
                <ThContent sorted={Boolean(column.sortOrder)}>
                  {column.heading}
                  {column.onSortClick &&
                    !column.sortOrder && (
                      <SortableIcon>
                        <SortIcon size={10} color="color.border.disabled" name="CaretUp" />
                        <SortIcon size={10} color="color.border.disabled" name="CaretDown" />
                      </SortableIcon>
                    )}
                  {column.sortOrder && (
                    <SortIcon size={10} color="primary" name={column.sortOrder === "desc" ? "CaretUp" : "CaretDown"} />
                  )}
                </ThContent>
              </Th>
            ))}
            {Boolean(rowActions || (onRowClick && rowActionName)) && <Th key="infinity" />}
          </Tr>
        </Thead>
      )}
      <tbody>
        {data.length ? (
          data.map((dataEntry, dataEntryIndex) => {
            const rowAction = (() => {
              if (!rowActions) {
                return null
              }
              const dataEntryRowActions = rowActions(dataEntry)
              return (
                <Actions
                  onClick={(ev: React.SyntheticEvent<Node>) => {
                    // Table row click should not trigger if this action menu is manipulated
                    ev.stopPropagation()
                  }}
                >
                  {Array.isArray(dataEntryRowActions) ? (
                    <ActionMenu items={dataEntryRowActions as ActionMenuProps["items"]} />
                  ) : (
                    dataEntryRowActions
                  )}
                </Actions>
              )
            })()
            return (
              <Tr
                hover={Boolean(data)}
                key={dataEntryIndex}
                clickable={Boolean(onRowClick)}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(dataEntry, dataEntryIndex)
                  }
                }}
              >
                {hasIcons && (
                  <IconCell>
                    {/** Because has `hasIcon`, it is guaranteed that the `icon` function exists */}
                    <Icon name={icon!(dataEntry)} color={iconColor && iconColor(dataEntry)} />
                  </IconCell>
                )}
                {standardizedColumns.map((column, columnIndex) => (
                  <Td key={columnIndex}>{column.cell(dataEntry, dataEntryIndex)}</Td>
                ))}
                {rowAction}
                {onRowClick &&
                  rowActionName && (
                    <Actions>
                      <ActionLabel>{rowActionName}</ActionLabel>
                    </Actions>
                  )}
              </Tr>
            )
          })
        ) : (
          <Tr>
            <EmptyView colSpan={columns.length}>There are no records available</EmptyView>
          </Tr>
        )}
      </tbody>
    </Container>
  )
}

export default Table
