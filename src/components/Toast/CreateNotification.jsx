import React from 'react'
import ReactDOM from 'react-dom'

import Notification from './Notification'

function CreateNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const ref = React.createRef()
    ReactDOM.render(<Notification ref={ref} />, div)
    return {
        addNotice(notice) {
            return ref.current.addNotice(notice)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        },
    }
}

export default CreateNotification()
