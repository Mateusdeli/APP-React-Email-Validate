import React from 'react'
import styled from 'styled-components'

const AlertContainer = styled.div`
  position: relative;
  border: ${({ type }) => `1px solid ${type.borderColor}`};
  background: ${({ type }) => type.backgroundColor};
  color: ${({ type }) => type.color }; 
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: .25rem;
`

const types = {
  success: {
    color: '#155724',
    borderColor: '#c3e6cb',
    backgroundColor: '#d4edda'
  },
  error: {
    color: '#721c24',
    borderColor: '#f5c6cb',
    backgroundColor: '#f8d7da'
  }
}

interface AlertProps {
  type: string;
  message: string;
}

export const Alert = ({ type, message }: AlertProps) => {
  const alertType = types[type]
  return (
    <AlertContainer type={alertType || 'success'}>
      <span>{message}</span>
    </AlertContainer>
  )
}
