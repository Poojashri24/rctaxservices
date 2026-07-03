import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { success: false, error: 'Required fields missing: name, phone, service' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Store in PostgreSQL/Supabase database:
    //    await db.insertInto('leads').values({ name, phone, service, message, date: new Date() })
    // 2. Send email notification using Resend/Nodemailer:
    //    await resend.emails.send({ to: 'rcservices147@gmail.com', subject: 'New Lead', html: '...' })
    
    console.log('API contact form submission received:', { name, phone, service, message });

    return NextResponse.json({
      success: true,
      message: 'Lead received successfully',
      lead: { name, phone, service, message, date: new Date() }
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
