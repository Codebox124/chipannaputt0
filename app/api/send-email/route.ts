import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, data } = body

        // Validate required fields
        if (!type || !data) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Build email content based on type
        let emailSubject = ''
        let emailHtml = ''
        let emailText = ''

        if (type === 'contact') {
            const { name, email, phone, subject, message } = data

            emailSubject = `New Contact Form Submission: ${subject}`
            emailText = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}
            `
            emailHtml = `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
<p><strong>Subject:</strong> ${subject}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
            `
        } else if (type === 'review') {
            const { name, email, rating, review, videoUrl } = data

            emailSubject = `New Student Review from ${name}`
            emailText = `
Name: ${name}
Email: ${email}
Rating: ${rating} stars
Video: ${videoUrl || 'No video'}

Review:
${review}
            `
            emailHtml = `
<h2>New Student Review</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
${videoUrl ? `<p><strong>Video:</strong> <a href="${videoUrl}">Watch Review</a></p>` : '<p><strong>Video:</strong> No video provided</p>'}
<h3>Review:</h3>
<p>${review.replace(/\n/g, '<br>')}</p>
            `
        } else {
            return NextResponse.json(
                { error: 'Invalid submission type' },
                { status: 400 }
            )
        }

        // For now, we'll just log the submission and return success
        // In production, you would integrate with an email service like SendGrid, AWS SES, etc.
        console.log('[v0] Email submission received:', {
            type,
            subject: emailSubject,
            timestamp: new Date().toISOString(),
            data
        })

        // Return success response
        return NextResponse.json(
            { 
                success: true,
                message: 'Submission received successfully'
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('[v0] Email API error:', error)
        return NextResponse.json(
            { error: 'Failed to process submission' },
            { status: 500 }
        )
    }
}
