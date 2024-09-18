import { NextRequest, NextResponse } from 'next/server';

const users = [{ email: 'juzt@studio.com', password: 'juzt' }];

export async function POST(request: NextRequest) {
  try {
    const { email, password }: { email: string; password: string } =
      await request.json();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return NextResponse.json(
        { message: 'Login successful!', user },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
