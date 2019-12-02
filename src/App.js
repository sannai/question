import React from 'react'
import { Value } from 'slate'

import Editor from './components/EditorX'

function App() {
    const handleChangeValue = () => {}
    return (
        <div className='App'>
            <Editor
                value={Value.fromJSON({
                    document: {
                        nodes: [
                            {
                                object: 'block',
                                type: 'paragraph',
                                nodes: [
                                    {
                                        object: 'text',
                                        text: '666666',
                                    },
                                ],
                            },
                        ],
                    },
                })}
                onChange={handleChangeValue}
            ></Editor>
            <header className='App-header'>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
        </div>
    )
}

export default App
