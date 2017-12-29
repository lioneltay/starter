import React, { Component } from "react"
import PropTypes from "prop-types"
import { withHandlers, compose } from "recompose"
import * as R from "ramda"

import { reduxState, StateViewer } from "lib/redux-state"

const callIfFunc = (candidate, ...args) =>
  typeof candidate === "function" ? candidate(...args) : candidate

let id = 1
const ITEMS = [
  { id: id++, name: "Bob", email: "bob@gmail.com" },
  { id: id++, name: "Alice", email: "alice@gmail.com" },
  { id: id++, name: "James", email: "james@gmail.com" },
]

const InformedComponent = compose(
  reduxState({
    stateKey: "OrgDashboardFeature",
    selector: ({ items, selectedItemId, itemClicks, previewClicks }) => ({
      itemClicks,
      previewClicks,
      selectedItem: items.find(R.propEq("id", selectedItemId)),
    }),
  })
)(({ selectedItem, itemClicks, previewClicks }) => (
  <div>
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
  reduxState({
    stateKey: "OrgDashboardFeature",
  }),
  withHandlers({
    selectFirst: ({ setModel, model }) => () =>
      setModel({ selectedItemId: firstId(model.items) }),
    selectLast: ({ setModel, model }) => () =>
      setModel({ selectedItemId: lastId(model.items) }),
  })
)(({ selectFirst, selectLast }) => (
  <div>
    <button onClick={selectFirst}>Select First</button>
    <button onClick={selectLast}>Select Last</button>
  </div>
))

const Item = compose(
  withHandlers({
    onClick: ({ id, onClick }) => () => onClick(id),
  })
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
  reduxState({ stateKey: "OrgDashboardFeature" }),
  withHandlers({
    onItemClick: ({ setModel, model }) => id =>
      setModel({ selectedItemId: id, itemClicks: model.itemClicks + 1 }),
  })
)(ItemListView)

const LogClicks = ({ onClick }) => Comp => props => (
  <div onClick={callIfFunc(onClick, props)}>
    <Comp {...props} />
  </div>
)

const Preview = compose(
  reduxState({
    stateKey: "OrgDashboardFeature",
  }),
  LogClicks({
    onClick: ({ setModel, model }) => () =>
      console.log("onClick") ||
      setModel({ previewClicks: model.previewClicks + 1 }),
  })
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

const OrgDashboardFeature = compose(
  reduxState({
    stateKey: "OrgDashboardFeature",
    initialState: ({ items }) => ({
      showMessage: false,
      items: items,
      itemClicks: 0,
      previewClicks: 0,
      selectedItemId: items.length !== 0 ? items[0].id : null,
    }),
    selector: ({ selectedItemId, items }) => ({
      items,
      selectedItem: findById(selectedItemId, items),
    }),
  })
)(({ items, selectedItem }) => {
  console.log(selectedItem)
  return (
    <div>
      <StateViewer statePath="reduxState" />
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
          <Preview item={selectedItem} />
        </div>
      </div>
    </div>
  )
})

const ReduxStateDemo3 = () => <OrgDashboardFeature items={ITEMS} />

export default ReduxStateDemo3
