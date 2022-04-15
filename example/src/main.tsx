import type { FC } from 'react'
import React, { memo } from 'react'
import ReactDOM from 'react-dom'
import './main.css'

// import HelloWebpack from 'hello-webpack';
// import { AboutComponent } from 'hello-webpack/lib/components/hello'
import { HelloWebpack, AboutComponent } from 'hello-webpack'
import'hello-webpack/lib/index.css';
 
const _Root: FC = () => (
    <>
        <HelloWebpack />
        <AboutComponent />
        <h1 className="hello-component">Hello,react</h1>
    </>
)

const Root = memo(_Root)

ReactDOM.render(<Root />, document.getElementById('app'))