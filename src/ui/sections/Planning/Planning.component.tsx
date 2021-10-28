import React from "react"
import { ControlsPortal } from "../../utils/ControlsPortal"

export default () => {
  return <>
    <div>Hello</div>

    <ControlsPortal>
      <div>World</div>
    </ControlsPortal>
  </>
}