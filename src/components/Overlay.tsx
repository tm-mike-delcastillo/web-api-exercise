import { FC, MouseEventHandler, useEffect, useMemo, useState } from 'react'

const ANIM_IN_DURATION = 300
const ANIM_OUT_DURATION = 300

type Props = {
  show: boolean
  onClick?: MouseEventHandler
}

export const Overlay: FC<Props> = ({ show, onClick }) => {
  const [timeoutId, setTimeoutId] = useState(-1)
  const [entering, setEntering] = useState(false)
  const [showing, setShowing] = useState(false)
  const [exiting, setExiting] = useState(false)

  const setState = (entering: boolean, showing: boolean, exiting: boolean) => {
    setEntering(entering)
    setShowing(showing)
    setExiting(exiting)
  }

  const className = useMemo(() => {
    const classNames: string[] = ['overlay']
    if (entering) classNames.push('entering')
    if (exiting) classNames.push('exiting')
    if (showing) classNames.push('showing')
    return classNames.join(' ')
  }, [entering, showing, exiting])

  useEffect(() => {
    if (show && !showing && !entering) {
      clearTimeout(timeoutId)
      setState(true, true, false)
      setTimeoutId(
        setTimeout(() => {
          setState(false, true, false)
        }, ANIM_IN_DURATION)
      )
    }

    if (!show && showing && !exiting) {
      clearTimeout(timeoutId)
      setState(false, true, true)
      setTimeoutId(
        setTimeout(() => {
          setState(false, false, false)
        }, ANIM_OUT_DURATION)
      )
    }
  }, [show, showing, timeoutId, entering, exiting])

  return <div {...{ className, onClick }}></div>
}
