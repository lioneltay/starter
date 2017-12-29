import React, { Component } from "react"
import PropTypes from "prop-types"
import { Tabs, Tab, TabPanel } from "./Tabs"
import UpdateBlocker from "./UpdateBlocker"

export default class TabDemo extends Component {
  render() {
    return (
      <div style={{ margin: "auto", maxWidth: 600 }}>
        <Tabs initialTabKey={7}>
          <UpdateBlocker>
            <Tab tabKey={2}>Hotels</Tab>
            <TabPanel tabKey={2}>
              Hotels are cool, you can live in them
            </TabPanel>

            <div>
              <h1>hello</h1>
            </div>

            <div style={{ display: "flex" }}>
              <h2>hello</h2>
              <Tab tabKey={7}>Cars</Tab>
              <TabPanel tabKey={7}>
                Cars are cool they can take you places
              </TabPanel>
              <h2>hello</h2>
            </div>

            <Tab tabKey={3}>Movies</Tab>
            <TabPanel tabKey={3}>Movies are cool to watch</TabPanel>

            <Tab disabled tabKey={4}>
              Disabled Tab
            </Tab>
            <TabPanel tabKey={4}>My content is disabled T.T</TabPanel>
          </UpdateBlocker>
        </Tabs>
      </div>
    )
  }
}
