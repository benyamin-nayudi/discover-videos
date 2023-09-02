export async function isNewUser(token: string, issuer: string) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      issuer
      publicAddress
    }
  }
`

  const res = await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    { issuer },
    token
  )

  return res?.data?.users.length === 0
}

interface MagicMetadata {
  issuer: string
  email: string
  publicAddress: string
}

export async function createNewUser(token: string, metadata: MagicMetadata) {
  const { issuer, email, publicAddress } = metadata

  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`

  const res = await queryHasuraGQL(
    operationsDoc,
    'createNewUser',
    { issuer, email, publicAddress },
    token
  )

  console.log({ res })
  return res
}

type QueryHasuraGQL = {
  data: any
}
export async function queryHasuraGQL(
  operationsDoc: string,
  operationName: string,
  variables: object,
  token: string
): Promise<QueryHasuraGQL> {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}
