import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    console.log('[v0] Email submission received:', {
      type,
      timestamp: new Date().toISOString(),
      data
    })

    // Prepare email parameters based on type
    let emailParams: Record<string, any> = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: '',
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      template_params: {}
    }

    if (type === 'contact') {
      const { name, email, phone, subject, message } = data
      emailParams.template_id = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE || 'template_contact'
      emailParams.template_params = {
        to_email: process.env.RECIPIENT_EMAIL,
        from_name: name,
        from_email: email,
        phone,
        subject,
        message
      }
    } else if (type === 'review') {
      const { name, email, rating, review, videoUrl } = data
      emailParams.template_id = process.env.NEXT_PUBLIC_EMAILJS_REVIEW_TEMPLATE || 'template_review'
      emailParams.template_params = {
        to_email: process.env.RECIPIENT_EMAIL,
        from_name: name,
        from_email: email,
        rating,
        review,
        video_url: videoUrl || 'No video provided'
      }
    } else if (type === 'lesson-inquiry') {
      const { name, email, phone, lessonType, message } = data
      emailParams.template_id = process.env.NEXT_PUBLIC_EMAILJS_LESSON_TEMPLATE || 'template_lesson'
      emailParams.template_params = {
        to_email: process.env.RECIPIENT_EMAIL,
        from_name: name,
        from_email: email,
        phone,
        lesson_type: lessonType,
        message
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid submission type' },
        { status: 400 }
      )
    }

    // Send via EmailJS API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailParams)
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[v0] EmailJS error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    console.log('[v0] Email sent successfully via EmailJS')
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
