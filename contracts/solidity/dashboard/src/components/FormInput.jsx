import React from 'react'
import { useField } from 'formik'

const FromInput = ({ label, getFieldProps, getFieldMetaProps, getFieldMeta, ...props }) => {
  const [field, meta] = useField(props.name, props.type)

  console.log('field', field, meta)

  return (
      <>
        <label>
          {label}
        </label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </>
  )
}

export default React.memo(FromInput)
