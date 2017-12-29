import React, { Component } from "react"
import PropTypes from "prop-types"

const LECTURES = [
  {
    id: 1,
    title: "Learn useful things while on the toilet",
    author: "Jimmy Jim",
    duration: 174,
  },
  {
    id: 2,
    title: "Improve debuggability of Higher Order Components",
    author: "Jimmy Jim",
    duration: 532,
  },
  {
    id: 3,
    title: "Lecture",
    author: "Jimmy Jim",
    duration: 123,
  },
]

const Lecture = ({ title, author, duration }) => (
  <div className="lecture">
    <div>{title}</div>
    <div>
      <span>
        {author} - {duration}
      </span>
    </div>
  </div>
)

const LectureList = ({ lectures }) => (
  <div className="lecture-list">
    {lectures.map(lecture => <Lecture key={lecture.id} {...lecture} />)}
  </div>
)

export default class EggheadLayout extends Component {
  render() {
    return (
      <div className="top-level">
        <div className="left-panel">
          <div className="card">
            <h1>Video Box</h1>
          </div>

          <div className="card">
            <h1>Description</h1>
          </div>
        </div>

        <div className="card right-panel">
          <LectureList lectures={LECTURES} />
        </div>
      </div>
    )
  }
}
