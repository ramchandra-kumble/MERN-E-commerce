import React from 'react'
import {Alert} from 'react-bootstrap'


 const Message = ({variant,children}) => {
<<<<<<< HEAD
    return   <Alert variant={variant}> {children}</Alert>
=======
    return  <Alert variant={variant}> {children}</Alert>
>>>>>>> dbee50a127c7b256c96a2c4f0ad0d7e6c8d8a3cb
    
}

Message.defaultProps={
    variant:'info',
}

export default Message;
