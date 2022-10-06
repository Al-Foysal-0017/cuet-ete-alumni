import React from 'react'

import { Route } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        component={(props) => {
            return (
                <>
                    {/* Admin Navigation here */}
                    <div className="mx-auto" style={{ maxWidth: '1750px' }}>
                        <Component {...props} />
                    </div>
                </>
            )
        }}
    />
)

export default AdminRoute
