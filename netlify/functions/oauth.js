// GitHub OAuth token exchange
// Receives ?code=xxx from the browser, exchanges it for an access token server-side,
// then redirects back to /admin with the token in the hash so the page can pick it up.

export const handler = async (event) => {
  const { code, state } = event.queryStringParameters || {};

  const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '';
  const CLIENT_ID = process.env.GH_CLIENT_ID;
  const CLIENT_SECRET = process.env.GH_CLIENT_SECRET;

  if (!code) {
    return { statusCode: 400, body: 'Missing code' };
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return { statusCode: 500, body: 'OAuth not configured' };
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return {
        statusCode: 302,
        headers: { Location: `${ALLOWED_ORIGIN}/admin/#error=${encodeURIComponent(data.error_description || data.error)}` },
        body: '',
      };
    }

    // Redirect back to /admin with token in hash — never in query string (not logged by servers)
    return {
      statusCode: 302,
      headers: { Location: `${ALLOWED_ORIGIN}/admin/#token=${data.access_token}` },
      body: '',
    };
  } catch (e) {
    return {
      statusCode: 302,
      headers: { Location: `${ALLOWED_ORIGIN}/admin/#error=${encodeURIComponent(e.message)}` },
      body: '',
    };
  }
};
