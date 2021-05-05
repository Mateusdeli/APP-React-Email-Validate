import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { PrismaClient } from '@prisma/client'
import React from 'react'

export default function AccountConfirmation({ validate }) {
  return (
    <div>
      {validate && <p>Conta Validada com sucesso!</p>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const prisma = new PrismaClient()
  const { token } = context.query

  if (!token) {
    return {
      notFound: true
    }
  }
  
  try {
    const user = await prisma.account.findFirst({
      where: {
        token: token
      }
    });
    
    if (!user) {
      return {
        notFound: true
      }
    }

    await prisma.account.update({
      where: {
        id: user?.id
      },
      data: {
        validate: true,
        token: ''
      }
    })

    return {
      props: {
        validate: true
      }
    }

  } catch (err) {
    return {
      notFound: true
    }
  }
}

