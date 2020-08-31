const graphqlUrl = 'https://xhlpk.sse.codesandbox.io/'

export async function get(query, params = '', auth) {
  const url = graphqlUrl
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: params
    })
  }
  if (auth) {
    fetchOptions.headers.Authorization = auth
  }

  const res = await fetch(url, fetchOptions)
  const data = await res.json()
  console.log(data.data, JSON.stringify(fetchOptions))
  return data.data
}
