import React from 'react'

const FormField = ({labelName, placeholder, inputType, isTextArea, value, handleChange}) => {
  return (
    <label className='flex-1 w-full flex flex-col'>
        {labelName && (
            <span className='font-epilogue font-medium tex-'>{labelName}</span>
        )}
    </label>
  )
}

export default FormField