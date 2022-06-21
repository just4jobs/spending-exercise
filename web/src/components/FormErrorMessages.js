import React from 'react';
import {
    ErrorMessage,
} from "../styles/ComponentStyles";


export default function FormErrorMessages(props) {
  return (
    <ErrorMessage style={{textAlign: 'left'}}>
        <ul>
            {Object.keys(props.errors).map(
                fieldName => <li>{fieldName}:<ul>{
                    props.errors[fieldName].map(errorMessage => <li>{errorMessage}</li>)
                }</ul></li>
            )}
        </ul>
    </ErrorMessage>
  );
}
