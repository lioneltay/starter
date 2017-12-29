import React, { Component } from "react"
import {
  withHandlers,
  compose,
  withProps,
  onlyUpdateForKeys,
  pure,
} from "recompose"
import * as R from "ramda"
import { connect } from "react-redux"
import { ui } from "lib/redux-ui-tekk"

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update")
  whyDidYouUpdate(React)
}

import { createSelector } from "reselect"
import createCachedSelector from "re-reselect"

const itemsSelector = state => state.items
const selectedItemIdSelector = state => state.selectedItemId

const genderSelector = state => state.filters.gender

const selectedItemSelector = createSelector(
  itemsSelector,
  selectedItemIdSelector,
  (items, id) => items.find(R.propEq("id", id))
)

const filteredItemsSelector = createSelector(
  itemsSelector,
  genderSelector,
  (items, gender) =>
    items.filter(item => gender === "all" || item.gender === gender)
)

const callIfFunc = (candidate, ...args) =>
  typeof candidate === "function" ? candidate(...args) : candidate

const logOnRender = label => Comp =>
  class LogOnRender extends Component {
    render() {
      console.log(`${label}: Rendered`, this.props)
      return <Comp {...this.props} />
    }
  }

const InformedComponent = compose(
  ui({
    selector: state => ({
      selectedItemId: state.selectedItemId,
      itemClicks: state.itemClicks,
      previewClicks: state.previewClicks,
      selectedItem: selectedItemSelector(state),
    }),
  }),
  withProps(({ itemClicks, previewClicks }) => {
    return {
      itemClicks: itemClicks,
      previewClicks: previewClicks,
    }
  }),
  logOnRender("InformedComponent")
)(({ selectedItem, itemClicks, previewClicks, uiKey, uiPath }) => (
  <div>
    <div>{uiKey}</div>
    <div>{uiPath}</div>
    <div>
      <strong>Selected Item</strong>
    </div>
    <div>{selectedItem ? <Item {...selectedItem} /> : "-"}</div>

    <div>
      <strong>Item Clicks</strong>
    </div>
    <div>{itemClicks}</div>

    <div>
      <strong>Preview Clicks</strong>
    </div>
    <div>{previewClicks}</div>
  </div>
))

const lastId = R.pipe(R.last, R.unless(R.isNil, R.prop("id")))

const firstId = R.pipe(R.head, R.unless(R.isNil, R.prop("id")))

const ActionButtons = compose(
  ui({
    selector: state => ({
      items: state.items,
      filters: state.filters,
    }),
  }),
  withHandlers({
    selectFirst: ({ updateState, items }) => () =>
      updateState({ selectedItemId: firstId(items) }),
    selectLast: ({ updateState, items }) => () =>
      updateState({ selectedItemId: lastId(items) }),
    onGenderChange: ({ updateState, filters }) => gender =>
      updateState({ filters: R.assoc("gender", gender, filters) }),
  }),
  logOnRender("ActionButtons"),
  connect()
)(
  ({
    updateState,
    dispatch,
    selectFirst,
    selectLast,
    onGenderChange = () => {},
  }) => (
    <div>
      <button onClick={selectFirst}>Select First</button>
      <button onClick={selectLast}>Select Last</button>
      <button onClick={() => updateState({ notAValidKey: "OPs" })}>
        Update Invalid Key
      </button>
      <button onClick={() => dispatch({ type: "OPEN_MODAL" })}>
        Open Modal
      </button>
      <button onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
        Close Modal
      </button>
      <label>
        Gender:
        <select
          defaultValue="all"
          onChange={e => onGenderChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
      </label>
    </div>
  )
)

const Item = compose(
  withHandlers({
    onClick: ({ id, onClick = () => {} }) => () => onClick(id),
  }),
  pure,
  logOnRender("item")
)(({ name, email, onClick }) => (
  <div className="item" onClick={onClick}>
    <strong>{name}:</strong> {email}
  </div>
))

const ItemListView = ({ items, onItemClick }) => (
  <div>
    <div className="items">People</div>
    {items.map(item => <Item key={item.id} {...item} onClick={onItemClick} />)}
  </div>
)

const ItemList = compose(
  ui(),
  withHandlers({
    onItemClick: ({ updateState }) => id =>
      updateState({ selectedItemId: id, itemClicks: prev => prev + 1 }),
  }),
  pure,
  logOnRender("ItemList")
)(ItemListView)

const LogClicks = ({ onClick }) => Comp => props => (
  <div onClick={callIfFunc(onClick, props)}>
    <Comp {...props} />
  </div>
)

const Preview = compose(
  ui({
    selector: state => ({
      item: selectedItemSelector(state),
    }),
  }),
  LogClicks({
    onClick: ({ updateState }) => () =>
      updateState({ previewClicks: prev => prev + 1 }),
  }),
  // onlyUpdateForKeys(["item"]),
  logOnRender("Preview")
)(({ item: { name, email } }) => (
  <div>
    <div>
      <strong>Name: </strong> {name}
    </div>
    <div>
      <strong>Email: </strong> {email}
    </div>
  </div>
))

const findById = (id, items) => items.find(R.propEq("id", id))

const Modal = compose(
  ui({
    initialState: {
      open: false,
    },
    selector: state => ({
      open: state.open,
    }),
  })
)(({ open }) => (
  <div>
    <div>Modal {open ? "open" : "closed"}</div>
  </div>
))

const OrgDashboardFeature = compose(
  connect(state => ({ items: state.items })),
  ui({
    initialState: ({ items }) => ({
      showMessage: false,
      items,
      itemClicks: 0,
      previewClicks: 0,
      selectedItemId: items.length !== 0 ? items[0].id : null,
      filters: {
        gender: "all",
        otherField: "value!!!",
      },
    }),
    selector: state => ({
      items: filteredItemsSelector(state),
      filters: state.filters,
    }),
  }),
  logOnRender("OrgDashboardFeature")
)(({ items, filters, updateState }) => {
  return (
    <div>
      <Modal />

      <div className="card">
        <InformedComponent />
      </div>

      <div className="card">
        <ActionButtons />
      </div>

      <div className="fj-c">
        <div className="card fg-1">
          <ItemList items={items} />
        </div>

        <div className="card fg-1">
          <Preview />
        </div>
      </div>
    </div>
  )
})

const ReduxStateDemo3 = () => (
  <div>
    <h1>LALALA</h1>
    <OrgDashboardFeature />
  </div>
)

export default ReduxStateDemo3
