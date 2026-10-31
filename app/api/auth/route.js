export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simple mock authentication check
    if (email === 'admin@system.com' && password) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          token: 'mock-jwt-token-xyz', 
          role: 'ADMIN',
          message: 'Authenticated successfully' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid email or password' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}