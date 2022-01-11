import React from 'react'
import { CircularProgress} from '@material-ui/core'


export const WithLoader = (Component) => ({isLoading, ...props}) => {
  if (isLoading) return (
    <CircularProgress 
      variant='indeterminate' 
      disableShrink 
      size={40} 
      thickness={4} />  
  )
  return (
    <Component {...props} />
  )
}

export default WithLoader;